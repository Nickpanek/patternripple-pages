// app/collections/geometric/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

// Import your products array from a shared file or copy it
const products = [
  // ... your full products array
];

export default function GeometricCollectionPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Filter only geometric patterns
  const geometricProducts = products.filter(p => p.category === "geometric");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
            Geometric Collection
          </h1>
          <p className="text-lg text-gray-600">
            Modern geometric patterns including Art Deco, Op Art, and contemporary designs
          </p>
        </div>
      </header>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          {geometricProducts.length} Exclusive Geometric Patterns
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {geometricProducts.map((product) => (
            // ... same card layout as homepage
          ))}
        </div>
      </main>
    </div>
  );
}
