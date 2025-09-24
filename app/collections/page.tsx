// app/collections/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/app/data/products";

const DEFAULT_THUMB = "https://files.patternripple.com/thumb-default.jpg";

type Col = {
  key: string;
  title: string;
  blurb: string;
  href: string;
  match: (p: any) => boolean;
};

const COLLECTIONS: Col[] = [
  {
    key: "floral",
    title: "Floral Collection",
    blurb: "Elegant botanical and floral patterns featuring roses, wildflowers, and nature-inspired designs",
    href: "/collections/floral",
    match: (p) => p.category === "floral" || p.subtitle?.toLowerCase().includes("floral"),
  },
  {
    key: "geometric",
    title: "Geometric Collection",
    blurb: "Modern geometric patterns including Art Deco, Op Art, and contemporary abstract designs",
    href: "/collections/geometric",
    match: (p) => p.category === "geometric" || p.subtitle?.toLowerCase().includes("geometric"),
  },
  {
    key: "faux-embroidery",
    title: "Faux Embroidery Collection",
    blurb: "Patterns that mimic the texture and charm of hand-stitched embroidery work - label these as faux embroidery",
    href: "/collections/faux-embroidery",
    match: (p) =>
      p.category === "faux-embroidery" ||
      p.subtitle?.toLowerCase().includes("faux embroidery") ||
      p.title?.toLowerCase().includes("faux embroidery"),
  },
  {
    key: "abstract",
    title: "Abstract Collection",
    blurb: "Expressive abstract designs with bold shapes, motion, and texture",
    href: "/collections/abstract",
    match: (p) => p.category === "abstract" || p.subtitle?.toLowerCase().includes("abstract"),
  },
  {
    key: "horror",
    title: "Horror Collection",
    blurb: "Dark motifs, skulls, and eerie textures for bold statements",
    href: "/collections/horror",
    match: (p) => p.category === "horror" || p.subtitle?.toLowerCase().includes("horror"),
  },
  {
    key: "seasonal",
    title: "Seasonal Collection",
    blurb: "Holiday and seasonal themes across the year",
    href: "/collections/seasonal",
    match: (p) => p.category === "seasonal" || p.subtitle?.toLowerCase().includes("seasonal"),
  },
];

function pickCoverSrc(items: any[]): string {
  // 1 - first explicit thumbnail
  const withThumb = items.find((p) => p.thumbnail && p.thumbnail.trim().length > 0);
  if (withThumb) return withThumb.thumbnail.trim();
  // 2 - construct from slug if we must
  const withSlug = items.find((p) => p.slug && p.slug.trim().length > 0);
  if (withSlug) return `https://files.patternripple.com/${withSlug.slug}-thumb.jpg`;
  // 3 - hard default
  return DEFAULT_THUMB;
}

export default function CollectionsPage() {
  const data = useMemo(() => {
    return COLLECTIONS.map((c) => {
      const items = products.filter(c.match);
      const count = items.length;
      const src = pickCoverSrc(items);
      return { ...c, count, src };
    });
  }, []);

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      {/* top stats - adjust or remove as you wish */}
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
            className="group rounded-2xl overflow-hidden border bg-white"
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
