// Server wrapper so Studio renders fresh each request
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import StudioClient from './StudioClient';

export default function StudioPage() {
  return <StudioClient />;
}
