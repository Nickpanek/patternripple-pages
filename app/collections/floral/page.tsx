// app/collections/floral/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/app/data/products";

function thumbSrc(p: { thumbnail?: string; slug: string }) {
  if (p.thumbnail && p.thumbnail.trim().length > 0) return p.thumbnail.trim();
  return `https://files.patternripple.com/${p.slug}-thumb.jpg`;
}

export default function FloralCollectionPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const items = products.filter(
    (p) =>
      p.category === "floral" ||
      p.subtitle.toLowerCase().includes("floral")
  );

  return (
    <main className="mx-auto max-w-6xl p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const src = thumbSrc(p as any);
        return (
          <Link
            key={p.slug}
            href={`/p/${p.slug}`}
            className="group rounded-2xl overflow-hidden border"
            onMouseEnter={() => setHoveredCard(p.slug)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-square relative">
              <Image
                src={src}
                alt={`${p.title} - seamless pattern`}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  const slugFallback = `https://files.patternripple.com/${p.slug}-thumb.jpg`;
                  if (t.src !== slugFallback) t.src = slugFallback;
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium">{p.title}</h3>
              <p className="text-xs opacity-70">{p.subtitle}</p>
            </div>
          </Link>
        );
      })}
    </main>
  );
}
