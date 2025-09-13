// Studio route wrapper - Cloudflare-friendly
export const runtime = 'edge';
export const dynamic = 'force-static';

import NextDynamic from 'next/dynamic';

const StudioClient = NextDynamic(() => import('./StudioClient'), { ssr: false });

export default function StudioPage() {
  return <StudioClient />;
}
