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

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setPosts(data)
    setLoading(false)
  }

  useEffect(() => {
    loadPosts()
    const interval = setInterval(loadPosts, 60000)
    return () => clearInterval(interval)
  }, [])

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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: 500 }}>
          All posts
        </h1>
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
            width: '220px',
            background: '#fff',
            outline: 'none'
          }}
        />
      </div>

      <StatsBar posts={posts} />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        sourceFilter={sourceFilter}
        setSourceFilter={setSourceFilter}
        sources={sources}
      />

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
          Loading posts...
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
          No posts found. Activate your n8n workflow to start generating posts.
        </div>
      )}

      {filtered.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}