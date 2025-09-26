// app/search/search-client.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Result = {
  type: "product" | "post";
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  category?: string | string[];
  slug: string;
  href: string;
  score: number;
};

export default function SearchPageClient() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const initQ = new URLSearchParams(window.location.search).get("q") || "";
    if (initQ) {
      setQ(initQ);
      setTouched(true);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!touched) return;
      if (q.trim().length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        // If this throws, it means the route returned HTML or a non JSON response
        const data = await res.json();
        setResults(Array.isArray(data.results) ? data.results : []);
      } catch (e) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    const t = setTimeout(run, 200);
    return () => clearTimeout(t);
  }, [q, touched]);

  const hint = useMemo(() => {
    if (!touched) return "Type at least 2 characters";
    if (loading) return "Searching...";
    if (q.trim().length < 2) return "Type at least 2 characters";
    if (!results.length) return `No matches for "${q}"`;
    return `${results.length} match${results.length === 1 ? "" : "es"}`;
  }, [q, results, loading, touched]);

  return (
    <div>
      <form
        className="mb-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          const params = new URLSearchParams(window.location.search);
          params.set("q", q.trim());
          const url = `${window.location.pathname}?${params.toString()}`;
          window.history.replaceState({}, "", url);
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setTouched(true)}
          placeholder="Search products, tags, categories..."
          className="w-full rounded-lg border px-3 py-2"
          aria-label="Search"
        />
        <button className="rounded-lg border px-3 py-2" type="submit">Search</button>
      </form>

      <p className="mb-3 text-sm text-gray-600">{hint}</p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.map((r) => (
          <li key={`${r.type}-${r.slug}`} className="rounded-xl border p-4">
            <div className="text-xs uppercase tracking-wide opacity-70">{r.type}</div>
            <Link href={r.href} className="block text-lg font-semibold hover:underline">
              {r.title}
            </Link>
            {r.subtitle && <div className="text-sm opacity-80">{r.subtitle}</div>}
            {Array.isArray(r.category) ? (
              <div className="text-xs opacity-60">Categories: {r.category.join(", ")}</div>
            ) : r.category ? (
              <div className="text-xs opacity-60">Category: {r.category}</div>
            ) : null}
            {r.tags && r.tags.length > 0 && (
              <div className="mt-1 text-xs opacity-60">Tags: {r.tags.slice(0, 8).join(", ")}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
