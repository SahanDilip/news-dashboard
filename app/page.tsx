'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'
import PostCard from '@/components/PostCard'
import StatsBar from '@/components/StatsBar'
import FilterBar from '@/components/FilterBar'

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [triggering, setTriggering] = useState(false)
  const [status, setStatus] = useState('')

  const loadPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setPosts(data)
    setLoading(false)
  }

  useEffect(() => {
    loadPosts()
    const interval = setInterval(loadPosts, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleGetNews = async () => {
    setTriggering(true)
    setStatus('Connecting to workflow...')

    try {
      const res = await fetch('/api/trigger', { method: 'POST' })

      if (res.ok) {
        setStatus('Fetching news from BBC, CNN, Al Jazeera, The Guardian...')
        let attempts = 0
        const poll = setInterval(async () => {
          attempts++
          await loadPosts()
          if (attempts >= 6) {
            clearInterval(poll)
            setStatus('Done! New posts loaded.')
            setTriggering(false)
            setTimeout(() => setStatus(''), 4000)
          }
        }, 5000)
      } else {
        setStatus('Failed. Make sure n8n workflow is active.')
        setTriggering(false)
        setTimeout(() => setStatus(''), 4000)
      }
    } catch {
      setStatus('Error. Check your connection.')
      setTriggering(false)
      setTimeout(() => setStatus(''), 4000)
    }
  }

  const sources = [...new Set(posts.map(p => p.source_site))].filter(Boolean)

  const filtered = posts.filter(p => {
    const matchStatus = filter === 'all' || p.status === filter
    const matchSource = sourceFilter === 'all' || p.source_site === sourceFilter
    const matchSearch = search === '' ||
      p.article_title?.toLowerCase().includes(search.toLowerCase()) ||
      p.teaser?.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSource && matchSearch
  })

  return (
    <div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: 500 }}>
          News dashboard
        </h1>
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '0.5px solid #e0e0d8',
              fontSize: '14px',
              width: '200px',
              background: '#fff',
              outline: 'none'
            }}
          />
          <button
            onClick={handleGetNews}
            disabled={triggering}
            style={{
              padding: '9px 20px',
              borderRadius: '8px',
              border: 'none',
              background: triggering ? '#9fe1cb' : '#0f6e56',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              cursor: triggering ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s'
            }}
          >
            {triggering && (
              <span style={{
                width: '14px',
                height: '14px',
                border: '2px solid rgba(255,255,255,0.4)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.8s linear infinite'
              }} />
            )}
            {triggering ? 'Fetching news...' : 'Get new news'}
          </button>
        </div>
      </div>

      {/* Status message */}
      {status && (
        <div style={{
          background: '#e1f5ee',
          border: '0.5px solid #9fe1cb',
          borderRadius: '8px',
          padding: '10px 16px',
          marginBottom: '1rem',
          fontSize: '13px',
          color: '#0f6e56',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {triggering && (
            <span style={{
              width: '12px',
              height: '12px',
              border: '2px solid #9fe1cb',
              borderTopColor: '#0f6e56',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin 0.8s linear infinite',
              flexShrink: 0
            }} />
          )}
          {status}
        </div>
      )}

      <StatsBar posts={posts} />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        sourceFilter={sourceFilter}
        setSourceFilter={setSourceFilter}
        sources={sources}
      />

      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#999'
        }}>
          Loading posts...
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#999',
          background: '#fff',
          borderRadius: '12px',
          border: '0.5px solid #e0e0d8'
        }}>
          No posts yet. Click "Get new news" to fetch articles.
        </div>
      )}

      {filtered.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}