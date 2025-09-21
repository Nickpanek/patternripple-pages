"use client";

import NextDynamic from "next/dynamic";
import { useState } from "react";

// client-only BuyButton - no SSR
const BuyButton = NextDynamic(() => import("@/components/BuyButton"), { ssr: false });

// keep this - Next uses it - do not rename
export const dynamic = "force-static";

export default function ProductPage() {
  const product = {
    title: "Pastel Doodle Easter Eggs on Pink",
    subtitle: "Easter Collection",
    sku: "PR-sea-20250921-001",
    stripePriceId: "price_1S9mKjBB8R6OUfKVRjVFkwn1", // REPLACE WITH YOUR STRIPE PRICE ID
    images: [
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-preview.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup1.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup2.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup3.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup4.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup5.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup6.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup7.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup8.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup9.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup10.jpg",
      "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-mockup11.jpg",
    ],
    description:
      "A charming seamless pattern featuring hand-drawn pastel Easter eggs in a cute, whimsical doodle style. The soft pink, blue, yellow, and mint green colors on a gentle pink background create a delightful and modern look perfect for children's fabric, festive gift wrap, and cheerful spring decor.",
    details: [
      "6000px x 6000px high-resolution source file",
      "Seamless repeat pattern for continuous designs and mockups",
      "Certificate of authenticity and exclusivity",
      "Commercial usage rights included",
      "Lifetime ownership - yours forever",
      "Multiple file formats (PNG, JPEG)",
    ],
    category: "seasonal",
    subcategory: "easter",
    tags: [
      "easter egg pattern",
      "doodle eggs",
      "hand drawn easter",
      "scandinavian easter",
      "kids easter pattern",
      "cute spring pattern",
      "pastel easter pattern",
      "pink seamless pattern",
      "blue easter eggs",
      "yellow easter eggs",
      "easter gift wrap",
      "kids fabric print",
      "spring wallpaper",
      "nursery decor pattern",
      "easter stationery"
    ],
    applications: [
      "Children's apparel and textiles",
      "Festive Easter gift wrap and packaging",
      "Spring-themed wallpaper and home decor",
      "Nursery and playroom wall art",
      "Greeting cards and stationery",
      "Party supplies and decorations"
    ]
  };

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Pastel Doodle Easter Eggs Seamless Pattern | PatternRipple</title>
        <meta
          name="description"
          content="A charming seamless pattern of hand-drawn pastel Easter eggs in a cute doodle style. Perfect for children's fabric, gift wrap, and spring decor. Shop this exclusive pattern."
        />
        <link rel="canonical" href="https://patternripple.com/p/pastel-doodle-easter-eggs-pink" />
        <meta property="og:title" content="Pastel Doodle Easter Eggs Seamless Pattern | PatternRipple" />
        <meta property="og:description" content="A charming seamless pattern of hand-drawn pastel Easter eggs in a cute doodle style. Perfect for children's fabric, gift wrap, and spring decor." />
        <meta property="og:image" content="https://files.patternripple.com/pastel-doodle-easter-eggs-pink-preview.jpg" />
        <meta property="og:url" content="https://patternripple.com/p/pastel-doodle-easter-eggs-pink" />
      </head>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-purple-600 transition-colors">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/collections/seasonal" className="hover:text-purple-600 transition-colors">Seasonal Collection</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">Pastel Doodle Easter Eggs on Pink</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-2 shadow-[0_0_0_3px_rgba(251,191,36,0.5)]">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt="Seamless pattern of pastel doodle easter eggs on a pink background."
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Thumbnail Gallery - First 8 images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 8).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-purple-600" : "border-gray-200"
                  }`}
                  aria-label={`View ${index === 0 ? 'main pattern' : `mockup ${index}`}`}
                >
                  <img
                    src={image}
                    alt={index === 0 ? "Pastel easter egg pattern preview" : `Easter egg pattern application mockup ${index}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
            
            {/* Remaining images (9-12) */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(8, 12).map((image, index) => (
                <button
                  key={index + 8}
                  onClick={() => setSelectedImage(index + 8)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index + 8 ? "border-purple-600" : "border-gray-200"
                  }`}
                  aria-label={`View mockup ${index + 9}`}
                >
                  <img
                    src={image}
                    alt={`Easter egg pattern application mockup ${index + 9}`}
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
              
              {/* Category Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {product.subcategory}
                </span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-gray-700 leading-relaxed font-light mb-4">
                {product.description}
              </p>
              
              {/* Applications */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Perfect Applications
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.applications.map((app, i) => (
                    <div key={i} className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span className="text-gray-600 text-sm">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
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

            {/* Keywords/Tags for SEO */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Pattern Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.slice(0, 8).map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-light text-gray-900">$125</span>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
              <BuyButton priceId={product.stripePriceId} sku={product.sku} />
              <p className="text-sm text-gray-500 font-light">
                Secure checkout via Stripe - Instant download after purchase
              </p>
            </div>
          </div>
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": product.title,
              "description": product.description,
              "sku": product.sku,
              "category": product.category,
              "brand": {
                "@type": "Brand",
                "name": "PatternRipple"
              },
              "image": [
                product.images[0],
                product.images[1],
                product.images[2]
              ],
              "offers": {
                "@type": "Offer",
                "price": "125",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://patternripple.com/p/pastel-doodle-easter-eggs-pink"
              },
              "keywords": product.tags.join(", ")
            })
          }}
        />
      </main>
    </>
  );
}
