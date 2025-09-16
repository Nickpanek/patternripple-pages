"use client";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const p = useSearchParams();
  const sessionId = p.get("session_id");
  const sku = p.get("sku") || "PR-flo-20250916-001";

  if (!sessionId) return <main className="p-8 text-center">Missing checkout information.</main>;

  const worker = "https://patternripple-delivery.nickpanek-ks.workers.dev";
  const href = `${worker}/download/${sku}?session_id=${encodeURIComponent(sessionId)}`;

  return (
    <main className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-2xl mb-3">Thank you</h1>
      <p className="mb-6">Your purchase is confirmed. Download below.</p>
      <a className="inline-block px-4 py-2 rounded bg-black text-white" href={href}>
        Download package
      </a>
    </main>
  );
}
