"use client";

import { useEffect, useState, useRef } from "react";
import MiniSearch from "minisearch";
import Link from "next/link";

export default function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const mini = useRef<MiniSearch | null>(null);
  const docs = useRef<Record<string, any>>({});

  useEffect(() => {
    async function load() {
      const [idxRes, docsRes] = await Promise.all([
        fetch("/search/index.json"),
        fetch("/search/docs.json"),
      ]);
      const idxJson = await idxRes.json();
      const docsArr = await docsRes.json();
      mini.current = MiniSearch.loadJSON(idxJson);
      docs.current = Object.fromEntries(docsArr.map((d: any) => [d.id, d]));
    }
    load();
  }, []);

  useEffect(() => {
    if (!mini.current || !q.trim()) {
      setResults([]);
      return;
    }
    const r = mini.current.search(q.trim(), { prefix: true, fuzzy: 0.2 });
    setResults(r);
  }, [q]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="search"
        placeholder="Search site..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
      {q && results.length > 0 && (
        <div className="absolute mt-1 w-full rounded border bg-white shadow">
          {results.slice(0, 10).map((r) => {
            const d = docs.current[r.id];
            return (
              <Link
                key={r.id}
                href={d.url}
                className="block px-3 py-2 hover:bg-gray-100"
              >
                {d.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
