"use client";

import NextDynamic from "next/dynamic";
import { useState } from "react";

// client-only BuyButton - no SSR
const BuyButton = NextDynamic(() => import("@/components/BuyButton"), { ssr: false });

// keep this - Next uses it - do not rename
export const dynamic = "force-static";

export default function ProductPage() {
  const product = {
    title: "Winter Village Faux Embroidery on Navy",
    subtitle: "Christmas Collection",
    sku: "PR-sea-20250919-001",
    stripePriceId: "price_1S91pvBB8R6OUfKVfz51JXSY",
    images: [
      "https://files.patternripple.com/PR-sea-20250919-001-preview.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup1.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup2.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup3.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup4.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup5.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup6.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup7.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup8.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup9.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup10.jpg",
      "https://files.patternripple.com/PR-sea-20250919-001-mockup11.jpg",
    ],
    description:
      "A charming seamless pattern featuring a detailed faux embroidery winter village. Quaint houses, festive trees, and folk art borders are rendered in a classic cross-stitch style against a deep navy blue, creating a cozy, handcrafted aesthetic for seasonal textiles and decor.",
    details: [
      "6000px x 6000px source file",
      "Seamless repeat pattern",
      "Certificate of exclusivity",
      "Commercial usage rights",
      "Lifetime ownership",
    ],
    price: 125,
  };

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-2 shadow-[0_0_0_3px_rgba(251,191,36,0.5)]">
            <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Thumbnails - preview + 11 mockups */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? "border-purple-600" : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 text-center font-light">
            Watermarked preview - Full resolution upon purchase
          </p>
        </div>

        {/* Right: Product Details */}
        <div className="space-y-8">
          <div>
            <span className="inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">
              EXCLUSIVE PATTERN
            </span>
            <h1 className="text-4xl font-light text-gray-900 mb-2">{product.title}</h1>
            <p className="text-xl text-gray-600 font-light">{product.subtitle}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-6">
            <p className="text-gray-700 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Included in Purchase
            </h3>
            <ul className="space-y-3">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-purple-600 mr-3">✓</span>
                  <span className="text-gray-700 font-light">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-light text-gray-900">${product.price}</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>
            <BuyButton priceId={product.stripePriceId} sku={product.sku} />
            <p className="text-sm text-gray-500 font-light">
              Secure checkout via Stripe - Instant download after purchase
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
