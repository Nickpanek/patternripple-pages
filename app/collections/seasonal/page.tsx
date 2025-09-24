"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/app/data/products";

export default function SeasonalCollectionPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const seasonalProducts = products.filter(p => p.category === "seasonal");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
            Seasonal Collection
          </h1>
          <p className="text-lg text-gray-600">
            Holiday and seasonal patterns including Christmas, Easter, Halloween, and autumn themes
          </p>
        </div>
      </header>

      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          {seasonalProducts.filter(p => p.available).length} Exclusive Seasonal Patterns Available
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/collections" className="inline-flex items-center text-green-600 hover:text-green-700">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Collections
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seasonalProducts.map((product) => (
            <article
              key={product.sku}
              className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                hoveredCard === product.sku
                  ? "shadow-2xl -translate-y-1 ring-4 ring-teal-400"
                  : "shadow-lg ring-4 ring-green-300"
              }`}
              onMouseEnter={() => setHoveredCard(product.sku)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {product.exclusive && (
                <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white text-xs font-bold py-2 text-center tracking-wider">
                  EXCLUSIVE PATTERN
                </div>
              )}

              <div className="h-64 bg-gradient-to-br from-green-100 to-teal-100 overflow-hidden">
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
                  className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
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
