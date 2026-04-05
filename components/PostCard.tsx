import Link from 'next/link'
import { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  const timeAgo = (ts: string) => {
    const s = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  return (
    <Link href={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card" style={{
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#aaa')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = '#e0e0d8')}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '4px'
        }}>
          {post.status === 'new' && (
            <span style={{
              width: '8px',
              height: '8px',
              background: '#1d9e75',
              borderRadius: '50%',
              display: 'inline-block',
              flexShrink: 0
            }} />
          )}
          <span style={{ fontSize: '12px', color: '#999' }}>
            {post.source_site} · {timeAgo(post.created_at)}
          </span>
          <span style={{
            marginLeft: 'auto',
            fontSize: '11px',
            padding: '2px 8px',
            borderRadius: '20px',
            background: post.status === 'new' ? '#e1f5ee' : '#e6f1fb',
            color: post.status === 'new' ? '#0f6e56' : '#185fa5'
          }}>
            {post.status}
          </span>
        </div>

        <div style={{
          fontSize: '15px',
          fontWeight: 500,
          marginBottom: '6px',
          lineHeight: 1.4
        }}>
          {post.article_title}
        </div>

        <div style={{
          fontSize: '13px',
          color: '#555',
          lineHeight: 1.5,
          marginBottom: '8px'
        }}>
          {post.teaser?.slice(0, 130)}...
        </div>

        <div style={{ fontSize: '12px', color: '#185fa5' }}>
          {post.tags?.split(' ').slice(0, 3).join(' ')}
        </div>
      </div>
    </Link>
  )
}