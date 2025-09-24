app/collections/abstract/page.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/app/data/products";

export default function AbstractCollectionPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Updated to support category as string or string[]
  const abstractProducts = products.filter((p) =>
    Array.isArray(p.category) ? p.category.includes("abstract") : p.category === "abstract"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
            Abstract Collection
          </h1>
          <p className="text-lg text-gray-600">
            Contemporary abstract patterns featuring brushstrokes, organic shapes, and artistic expressions
          </p>
        </div>
      </header>

      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          {abstractProducts.filter((p) => p.available).length} Exclusive Abstract Patterns Available
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/collections" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Collections
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {abstractProducts.map((product) => (
            <article
              key={product.sku}
              className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                hoveredCard === product.sku
                  ? "shadow-2xl -translate-y-1 ring-4 ring-pink-400"
                  : "shadow-lg ring-4 ring-purple-300"
              }`}
              onMouseEnter={() => setHoveredCard(product.sku)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {product.exclusive && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-bold py-2 text-center tracking-wider">
                  EXCLUSIVE PATTERN
                </div>
              )}

              <div className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-light text-gray-900 mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{product.subtitle}</p>

                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
                  <span className="text-2xl font-light">${product.price}</span>
                  <span className="text-green-600 text-sm">
                    {product.available ? "Available" : "Sold"}
                  </span>
                </div>

                <Link
                  href={`/p/${product.slug}`}
                  className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300"
                >
                  View Pattern
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}