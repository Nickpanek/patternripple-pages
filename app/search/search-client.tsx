// app/search/search-client.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MiniSearch from "minisearch";

type Doc = {
  id: string;
  type: "product" | "blog" | "collection" | "page";
  title: string;
  subtitle?: string;
  url: string;
  thumb?: string;
};

export default function SearchPageClient() {
  const params = useSearchParams();
  const initialQ = params.get("q") || "";
  const [q, setQ] = useState(initialQ);
  const [ready, setReady] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const miniRef = useRef<MiniSearch | null>(null);
  const docsRef = useRef<Record<string, Doc>>({});

  useEffect(() => {
    let alive = true;
    async function load() {
      const [idxRes, docsRes] = await Promise.all([
        fetch("/search/index.json"),
        fetch("/search/docs.json"),
      ]);
      const idxJson = await idxRes.json();
      const docsArr: Doc[] = await docsRes.json();

      miniRef.current = MiniSearch.loadJSON(idxJson, {
        fields: ["title", "subtitle", "description", "tags", "category", "sku"],
        storeFields: ["id", "type", "title", "subtitle", "url", "thumb"],
        searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 3, subtitle: 2, tags: 2 } },
      });

      docsRef.current = Object.fromEntries(docsArr.map((d) => [d.id, d]));
      if (alive) setReady(true);
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!ready || !miniRef.current) return setResults([]);
      const query = q.trim();
      if (!query) return setResults([]);
      const r = miniRef.current.search(query, {
        prefix: true,
        fuzzy: 0.2,
        boost: { title: 3 },
        combineWith: "AND",
      });
      setResults(r);
    }, 120);
    return () => clearTimeout(t);
  }, [q, ready]);

  const items = useMemo(
    () => results.map((r) => docsRef.current[String((r as any).id)]).filter(Boolean) as Doc[],
    [results]
  );

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="mb-6" role="search" aria-label="Search site">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search patterns, collections, posts..."
          className="w-full rounded-2xl border px-4 py-2 text-base outline-none"
        />
      </form>

      {q && items.length === 0 && <p className="text-sm text-gray-600">No results for "{q}".</p>}

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.id} className="rounded-xl border p-3 hover:shadow">
            <Link href={it.url} className="flex gap-3">
              {it.thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.thumb} alt="" className="h-16 w-16 rounded-lg object-cover" />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-gray-200" />
              )}
              <div className="min-w-0">
                <div className="truncate font-semibold">{it.title}</div>
                {it.subtitle ? <div className="truncate text-sm text-gray-600">{it.subtitle}</div> : null}
                <div className="text-[10px] uppercase text-gray-500">{it.type}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
