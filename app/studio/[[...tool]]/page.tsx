// Studio route wrapper - Cloudflare-friendly
export const runtime = 'edge';
export const dynamic = 'force-static';

import dynamic from 'next/dynamic';

const StudioClient = dynamic(() => import('./StudioClient'), { ssr: false });

export default function StudioPage() {
  return <StudioClient />;
}
