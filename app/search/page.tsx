// app/search/page.tsx
import { Suspense } from "react";
import SearchPageClient from "./search-client";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Search</h1>
      <Suspense fallback={<p className="text-sm text-gray-600">Loading search...</p>}>
        <SearchPageClient />
      </Suspense>
    </main>
  );
}
