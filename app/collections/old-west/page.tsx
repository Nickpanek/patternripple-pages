// app/collections/old-west/page.tsx
"use client";

import Link from "next/link";
import Script from "next/script";
import { useMemo, useState } from "react";
import { products } from "../../data/products";
import { filterByCollection, countAvailable } from "../../lib/collections";

export default function OldWestCollectionPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Category key: "old-west"
  const oldWestProducts = useMemo(() => filterByCollection(products, "old-west"), []);
  const availableCount = useMemo(() => countAvailable(products, "old-west"), []);

  // JSON-LD for SEO: collection page + item list
  const itemListJson = useMemo(() => {
    const elements = oldWestProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://patternripple.com/p/${p.slug}`,
      name: p.title,
      image: typeof p.thumbnail === "string" ? p.thumbnail : undefined,
    }));
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Old West Patterns - Cowboys, Cowgirls, Desert Landscapes",
      description:
        "Exclusive Old West patterns: cowboys, cowgirls, desert scenes, cacti, stars, boots, horses, and frontier motifs for apparel, wallpaper, and fabric.",
      url: "https://patternripple.com/collections/old-west",
      isPartOf: {
        "@type": "WebSite",
        name: "PatternRipple",
        url: "https://patternripple.com",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Collections", item: "https://patternripple.com/collections" },
          { "@type": "ListItem", position: 2, name: "Old West", item: "https://patternripple.com/collections/old-west" },
        ],
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: elements,
      },
    };
  }, [oldWestProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100">
      <Script
        id="ld-old-west-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }}
      />
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-stone-900 mb-4">
            Old West Collection
          </h1>
          <p className="text-lg text-stone-700">
            Cowboys, cowgirls, boots, stars, cacti, longhorns, and sun-baked desert horizons
          </p>
        </div>
      </header>

      <div className="bg-gradient-to-r from-amber-700 to-stone-800 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          {oldWestProducts.length === 0
            ? "No Old West Patterns Available"
            : `${availableCount} Exclusive Old West Patterns Available`}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/collections" className="inline-flex items-center text-amber-700 hover:text-amber-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Collections
          </Link>
        </div>

        {oldWestProducts.length === 0 ? (
          <div className="text-center text-stone-700 py-24">
            <p>No Old West patterns available right now.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oldWestProducts.map((product) => (
              <article
                key={product.sku}
                className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                  hoveredCard === product.sku
                    ? "shadow-2xl -translate-y-1 ring-4 ring-amber-500"
                    : "shadow-lg ring-4 ring-stone-300"
                }`}
                onMouseEnter={() => setHoveredCard(product.sku)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {product.exclusive && (
                  <div className="bg-gradient-to-r from-amber-700 to-stone-800 text-white text-xs font-bold py-2 text-center tracking-wider">
                    EXCLUSIVE PATTERN
                  </div>
                )}

                <div className="h-64 bg-gradient-to-br from-stone-100 to-amber-100 overflow-hidden">
                  <img
                    src={product.thumbnail as string}
                    alt={product.title as string}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-light text-stone-900 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-stone-700 text-sm mb-4">{product.subtitle}</p>

                  <div className="flex justify-between items-center pb-4 mb-4 border-b border-stone-100">
                    <span className="text-2xl font-light">${product.price}</span>
                    <span className={`text-sm ${product.available ? "text-green-600" : "text-stone-400"}`}>
                      {product.available ? "Available" : "Sold"}
                    </span>
                  </div>

                  <Link
                    href={`/p/${product.slug}`}
                    className="block w-full bg-stone-900 text-white text-center py-3 rounded-lg hover:bg-amber-700 transition-colors duration-300"
                  >
                    View Pattern
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
