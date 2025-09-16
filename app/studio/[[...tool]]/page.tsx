'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// Cloudflare Pages requires Edge here
export const runtime = 'edge'

export default function StudioPage() {
  return <NextStudio config={config} />
}
