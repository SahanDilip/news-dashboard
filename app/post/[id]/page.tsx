'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'
import CopyButton from '@/components/CopyButton'

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState('')
  const router = useRouter()

  useEffect(() => {
    const loadPost = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        setPost(data)
        setImageUrl(`https://image.pollinations.ai/prompt/${encodeURIComponent(data.image_prompt)}`)
      }
      setLoading(false)
    }
    loadPost()
  }, [id])

  const markPublished = async () => {
    await supabase
      .from('posts')
      .update({ status: 'published' })
      .eq('id', id)
    setPost(prev => prev ? { ...prev, status: 'published' } : null)
  }

  const copyAll = () => {
    if (!post) return
    const text = `TEASER:\n${post.teaser}\n\nSUMMARY:\n${post.summary}\n\nTAGS:\n${post.tags}\n\nIMAGE PROMPT:\n${post.image_prompt}`
    navigator.clipboard.writeText(text)
    alert('All content copied!')
  }

  const timeAgo = (ts: string) => {
    if (!ts) return ''
    const s = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const formatTime = (ts: string) => {
    if (!ts) return 'Unknown time'
    return new Date(ts).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
      Loading...
    </div>
  )

  if (!post) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
      Post not found
    </div>
  )

  return (
    <div>
      <button
        onClick={() => router.back()}
        style={{
          fontSize: '13px',
          padding: '6px 14px',
          borderRadius: '8px',
          border: '0.5px solid #e0e0d8',
          background: 'transparent',
          cursor: 'pointer',
          marginBottom: '1.25rem',
          color: '#666'
        }}
      >
        ← Back
      </button>

      {/* Meta — source + actual publish time */}
      <div style={{
        marginBottom: '0.5rem',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <span style={{
          fontSize: '11px',
          padding: '2px 8px',
          borderRadius: '20px',
          background: post.status === 'new' ? '#e1f5ee' : '#e6f1fb',
          color: post.status === 'new' ? '#0f6e56' : '#185fa5'
        }}>
          {post.status}
        </span>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#555' }}>
          {post.source_site}
        </span>
        <span style={{ fontSize: '13px', color: '#ccc' }}>·</span>
        <span style={{ fontSize: '13px', color: '#999' }}>
          {formatTime(post.created_at)}
        </span>
        <span style={{ fontSize: '13px', color: '#ccc' }}>·</span>
        <span style={{ fontSize: '13px', color: '#bbb' }}>
          {timeAgo(post.created_at)}
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: 1.4,
        marginBottom: '1.5rem'
      }}>
        {post.article_title}
      </h1>

      {/* Generated Image */}
      {imageUrl && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            Generated image
          </div>
          <img
            src={imageUrl}
            alt={post.article_title}
            style={{
              width: '100%',
              borderRadius: '12px',
              border: '0.5px solid #e0e0d8',
              maxHeight: '400px',
              objectFit: 'cover'
            }}
            onError={() => setImageUrl('')}
          />
        </div>
      )}

      {/* Teaser */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '6px'
        }}>
          Facebook post teaser
        </div>
        <div className="card" style={{ position: 'relative', paddingRight: '70px' }}>
          {post.teaser}
          <CopyButton text={post.teaser} />
        </div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '6px'
        }}>
          Full news summary
        </div>
        <div className="card" style={{ position: 'relative', paddingRight: '70px', lineHeight: 1.7 }}>
          {post.summary}
          <CopyButton text={post.summary} />
        </div>
      </div>

      {/* Tags */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '6px'
        }}>
          Tags
        </div>
        <div className="card" style={{ position: 'relative', paddingRight: '70px', color: '#185fa5' }}>
          {post.tags}
          <CopyButton text={post.tags} />
        </div>
      </div>

      {/* Image Prompt */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '6px'
        }}>
          Image generation prompt
        </div>
        <div className="card" style={{ position: 'relative', paddingRight: '70px', color: '#666', fontStyle: 'italic' }}>
          {post.image_prompt}
          <CopyButton text={post.image_prompt} />
        </div>
      </div>

      {/* Source */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '6px'
        }}>
          Original source
        </div>
        <div className="card">
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#185fa5',
              fontSize: '13px',
              wordBreak: 'break-all'
            }}
          >
            {post.source_url}
          </a>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={markPublished}
          className="btn btn-primary"
          style={{ flex: 1, padding: '12px' }}
        >
          {post.status === 'published' ? 'Published' : 'Mark as published'}
        </button>
        <button
          onClick={copyAll}
          className="btn"
          style={{ flex: 1, padding: '12px' }}
        >
          Copy everything
        </button>
      </div>
    </div>
  )
}