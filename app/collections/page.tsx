"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "../data/products";
import {
  collections as COLLECTIONS,
  pickCollectionCover,
  filterByCollection,
  collectionHref,
} from "../lib/collections";

// safety net only - each collection now has its own R2 cover
const DEFAULT_THUMB = "https://files.patternripple.com/thumb-default.jpg";

export default function CollectionsPage() {
  const data = useMemo(() => {
    return COLLECTIONS.map((c) => {
      const items = filterByCollection(products, c.key);
      const count = items.length;
      // prefers a real product thumbnail if any; else c.cover from R2
      const src = pickCollectionCover(products, c.key);
      const href = collectionHref(c.key);
      // simple fallback blurb
      const blurb = `${c.name} patterns and prints`;
      return { key: c.key, title: c.name, blurb, href, src, count };
    });
  }, []);

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <div className="flex flex-wrap gap-3 justify-center text-sm">
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white">
          {data.length} Collections
        </span>
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-900">
          {products.length} Exclusive Patterns
        </span>
        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900">
          Once sold, gone forever
        </span>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className={`group rounded-2xl overflow-hidden border bg-white ${
              hovered === c.key ? "shadow-xl" : "shadow"
            }`}
            onMouseEnter={() => setHovered(c.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={c.src}
                alt={`${c.title} cover`}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  if (t.src !== DEFAULT_THUMB) t.src = DEFAULT_THUMB;
                }}
              />
              <div className="absolute top-3 right-3 text-xs bg-black/70 text-white px-2 py-1 rounded-full">
                {c.count} {c.count === 1 ? "pattern" : "patterns"}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="text-sm opacity-75 mt-1">{c.blurb}</p>
              <span className="inline-flex items-center gap-2 text-sm text-violet-700 mt-3">
                View Collection <span aria-hidden>›</span>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
