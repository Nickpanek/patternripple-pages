// components/Search.tsx
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import MiniSearch from "minisearch";
import Link from "next/link";

type Doc = {
  id: string;
  type: "product" | "blog" | "collection" | "page";
  title: string;
  subtitle?: string;
  url: string;
  thumb?: string;
};

export default function Search() {
  const router = useRouter();
  const [q, setQ] = useState("");
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

      // load with options that match the indexer
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
      setResults(r.slice(0, 12));
    }, 120);
    return () => clearTimeout(t);
  }, [q, ready]);

  const items = useMemo(
    () => results.map((r) => docsRef.current[String((r as any).id)]).filter(Boolean) as Doc[],
    [results]
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    // if dropdown has items, go to the first result so it feels snappy
    if (items.length > 0) {
      router.push(items[0].url);
      return;
    }
    // otherwise go to the full results page
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setResults([]);
    }
  }

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={onSubmit}>
        <input
          id="site-search-input"
          type="search"
          placeholder="Search patterns, collections, posts..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full rounded-2xl border px-4 py-2 text-base outline-none"
          aria-label="Search site"
        />
      </form>

      {q && items.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border bg-white p-2 shadow-xl">
          <ul className="space-y-1">
            {items.map((it) => (
              <li key={it.id}>
                <Link
                  href={it.url}
                  className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-100"
                  onClick={() => setQ("")}
                >
                  {it.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.thumb} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-gray-200" />
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{it.title}</div>
                    {it.subtitle ? (
                      <div className="truncate text-xs text-gray-600">{it.subtitle}</div>
                    ) : null}
                    <div className="text-[10px] uppercase text-gray-500">{it.type}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-2 pt-2 text-xs text-gray-500">Press slash to focus - Enter to search</div>
        </div>
      )}
    </div>
  );
}
