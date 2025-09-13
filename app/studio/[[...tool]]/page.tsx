// Studio route wrapper - Cloudflare-friendly
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import StudioClient from './StudioClient';

export default function StudioPage() {
  return <StudioClient />;
}
