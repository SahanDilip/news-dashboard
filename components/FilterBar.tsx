'use client'

type FilterBarProps = {
  filter: string
  setFilter: (f: string) => void
  sourceFilter: string
  setSourceFilter: (s: string) => void
  sources: string[]
}

export default function FilterBar({
  filter,
  setFilter,
  sourceFilter,
  setSourceFilter,
  sources
}: FilterBarProps) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
        {['all', 'new', 'published'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`badge ${filter === f ? 'active' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSourceFilter('all')}
          className={`badge ${sourceFilter === 'all' ? 'active' : ''}`}
        >
          All sources
        </button>
        {sources.map(source => (
          <button
            key={source}
            onClick={() => setSourceFilter(source)}
            className={`badge ${sourceFilter === source ? 'active' : ''}`}
          >
            {source}
          </button>
        ))}
      </div>
    </div>
  )
}