'use client'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import dynamicImport from 'next/dynamic'
import config from '../../../sanity.config'

// client-only render to avoid blank screen
const Studio = dynamicImport(
  () => import('next-sanity/studio').then(m => m.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  return <Studio config={config} />
}
