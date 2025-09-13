// Server wrapper so Studio can render fresh on each request
export const dynamic = 'force-dynamic';
import StudioClient from './StudioClient';

export default function StudioPage() {
  return <StudioClient />;
}
