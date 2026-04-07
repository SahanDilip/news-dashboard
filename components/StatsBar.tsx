import { Post } from '@/lib/types'

export default function StatsBar({ posts }: { posts: Post[] }) {
  const total = posts.length
  const newPosts = posts.filter(p => p.status === 'new').length
  const published = posts.filter(p => p.status === 'published').length

  const stats = [
    { label: 'Total posts', value: total, color: '#1a1a1a' },
    { label: 'New / ready', value: newPosts, color: '#0f6e56' },
    { label: 'Published', value: published, color: '#185fa5' },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
      marginBottom: '1.5rem'
    }}>
      {stats.map(stat => (
        <div key={stat.label} style={{
          background: '#ffffff',
          border: '0.5px solid #e0e0d8',
          borderRadius: '8px',
          padding: '14px 16px'
        }}>
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
            {stat.label}
          </div>
          <div style={{ fontSize: '24px', fontWeight: 500, color: stat.color }}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}