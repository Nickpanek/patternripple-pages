// app/collections/groovy-psychedelic/page.tsx
"use client";

import Link from "next/link";
import Script from "next/script";
import { useMemo, useState } from "react";
import { products } from "../../data/products";
import { filterByCollection, countAvailable } from "../../lib/collections";

export default function GroovyPsychedelicCollectionPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Category key: "groovy-psychedelic"
  const groovyProducts = useMemo(() => filterByCollection(products, "groovy-psychedelic"), []);
  const availableCount = useMemo(() => countAvailable(products, "groovy-psychedelic"), []);

  // JSON-LD for SEO
  const itemListJson = useMemo(() => {
    const elements = groovyProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://patternripple.com/p/${p.slug}`,
      name: p.title,
      image: typeof p.thumbnail === "string" ? p.thumbnail : undefined,
    }));
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Groovy & Psychedelic Patterns",
      description:
        "Exclusive groovy and psychedelic seamless patterns with swirls, trippy waves, 60s and 70s color palettes, retro flowers, and bold op-art energy.",
      url: "https://patternripple.com/collections/groovy-psychedelic",
      isPartOf: {
        "@type": "WebSite",
        name: "PatternRipple",
        url: "https://patternripple.com",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Collections", item: "https://patternripple.com/collections" },
          { "@type": "ListItem", position: 2, name: "Groovy & Psychedelic", item: "https://patternripple.com/collections/groovy-psychedelic" },
        ],
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: elements,
      },
    };
  }, [groovyProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-orange-100">
      <Script
        id="ld-groovy-psychedelic-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }}
      />

      <header className="bg-white/80 backdrop-blur-sm border-b border-fuchsia-200 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-fuchsia-900 mb-4">
            Groovy & Psychedelic Collection
          </h1>
          <p className="text-lg text-fuchsia-700">
            Swirls, waves, retro florals, neon gradients, and 60s-70s color hits
          </p>
        </div>
      </header>

      <div className="bg-gradient-to-r from-fuchsia-700 to-orange-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          {groovyProducts.length === 0
            ? "No Groovy & Psychedelic Patterns Available"
            : `${availableCount} Exclusive Groovy & Psychedelic Patterns Available`}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/collections" className="inline-flex items-center text-fuchsia-700 hover:text-fuchsia-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Collections
          </Link>
        </div>

        {groovyProducts.length === 0 ? (
          <div className="text-center text-fuchsia-700 py-24">
            <p>No groovy or psychedelic patterns available right now.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groovyProducts.map((product) => (
              <article
                key={product.sku}
                className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                  hoveredCard === product.sku
                    ? "shadow-2xl -translate-y-1 ring-4 ring-orange-500"
                    : "shadow-lg ring-4 ring-fuchsia-300"
                }`}
                onMouseEnter={() => setHoveredCard(product.sku)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {product.exclusive && (
                  <div className="bg-gradient-to-r from-fuchsia-700 to-orange-600 text-white text-xs font-bold py-2 text-center tracking-wider">
                    EXCLUSIVE PATTERN
                  </div>
                )}

                <div className="h-64 bg-gradient-to-br from-fuchsia-100 to-orange-100 overflow-hidden">
                  <img
                    src={product.thumbnail as string}
                    alt={product.title as string}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-light text-fuchsia-900 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-fuchsia-700 text-sm mb-4">{product.subtitle}</p>

                  <div className="flex justify-between items-center pb-4 mb-4 border-b border-fuchsia-100">
                    <span className="text-2xl font-light">${product.price}</span>
                    <span className={`text-sm ${product.available ? "text-green-600" : "text-fuchsia-400"}`}>
                      {product.available ? "Available" : "Sold"}
                    </span>
                  </div>

                  <Link
                    href={`/p/${product.slug}`}
                    className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-fuchsia-700 transition-colors duration-300"
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
