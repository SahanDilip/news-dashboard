import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'News Dashboard',
  description: 'AI powered news post generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          background: '#ffffff',
          borderBottom: '0.5px solid #e0e0d8',
          padding: '0 1.5rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <span style={{ fontWeight: 500, fontSize: '16px' }}>
            News Dashboard
          </span>
          <span style={{ fontSize: '13px', color: '#999' }}>
            Powered by Claude AI
          </span>
        </nav>
        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
          {children}
        </main>
      </body>
    </html>
  )
}