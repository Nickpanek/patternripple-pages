'use client'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import dynamic from 'next/dynamic'
import config from '../../../sanity.config'

// render Studio only on the client to avoid blank screen
const Studio = dynamic(() => import('next-sanity/studio').then(m => m.NextStudio), {
  ssr: false,
})

export default function StudioPage() {
  return <Studio config={config} />
}
