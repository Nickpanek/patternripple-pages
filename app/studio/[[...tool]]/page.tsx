'use client'
export const runtime = 'edge'

export default function StudioPage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Pattern Studio</h1>
      <p>Access your Sanity Studio:</p>
      <a 
        href="https://www.sanity.io/manage/personal/project/zomio78q" 
        target="_blank"
        style={{ 
          background: '#6366f1', 
          color: 'white', 
          padding: '12px 24px', 
          textDecoration: 'none', 
          borderRadius: '6px',
          display: 'inline-block',
          marginTop: '20px'
        }}
      >
        Open Sanity Studio
      </a>
    </div>
  )
}
