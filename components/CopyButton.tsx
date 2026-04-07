'use client'

import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '12px',
        padding: '4px 10px',
        borderRadius: '6px',
        border: copied ? '0.5px solid #9fe1cb' : '0.5px solid #e0e0d8',
        background: copied ? '#e1f5ee' : '#f5f5f0',
        color: copied ? '#0f6e56' : '#666',
        cursor: 'pointer',
        transition: 'all 0.15s'
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}