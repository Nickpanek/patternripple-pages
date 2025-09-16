'use client'
import {NextStudio} from 'next-sanity/studio'
import config from '../../../sanity.config'

export const runtime = 'nodejs' // Studio must run on Node, not Edge

export default function StudioPage() {
  return <NextStudio config={config} />
}
