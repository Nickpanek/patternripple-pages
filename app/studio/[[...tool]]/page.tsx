'use client'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import dynamicImport from 'next/dynamic'

const Studio = dynamicImport(
  () => import('next-sanity/studio').then(m => m.NextStudio),
  { ssr: false }
)

import config from '../../../sanity.config'

export default function StudioPage() {
  return <Studio config={config} />
}
