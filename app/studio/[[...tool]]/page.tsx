'use client'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
