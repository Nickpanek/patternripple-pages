"use client";

import Head from "next/head";
import NextDynamic from "next/dynamic"; // alias to avoid name collision
import Image from "next/image";
import { useState } from "react";
import Script from "next/script";

// client-only BuyButton - no SSR
const BuyButton = NextDynamic(() => import("@/components/BuyButton"), { ssr: false });

// Next.js runtime hint - keep this export name exactly
export const dynamic = "force-static";

export default function ProductPage() {
  const product = {
    title: "Tactical Pixel Camo in Desert Taupe",
    subtitle: "abstract Collection",
    sku: "PR-abs-20250921-001",
    stripePriceId: "price_1S9oroBB8R6OUfKVFDwtadEl",
    images: [
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-preview.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup1.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup2.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup3.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup4.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup5.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup6.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup7.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup8.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup9.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup10.jpg",
      "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-mockup11.jpg",
    ],
    description:
      "A modern, tactical seamless pattern featuring a high-resolution digital pixel camouflage. The intricate design combines desert taupe, muted grey, and earth tones for a sophisticated, versatile military aesthetic. Ideal for performance apparel, outdoor gear, tech accessories, and bold print applications.",
    details: [
      "6000px x 6000px high-resolution source file",
      "Seamless repeat pattern for continuous designs and mockups",
      "Certificate of authenticity and exclusivity",
      "Commercial usage rights included",
      "Lifetime ownership - yours forever",
      "Multiple file formats (PNG, JPEG)",
    ],
    category: "abstract",
    subcategory: "military",
    tags: [
      "digital camo pattern",
      "pixel camouflage",
      "seamless military pattern",
      "tactical abstract print",
      "desert taupe camo",
      "earth tone pattern",
      "muted grey design",
      "modern tactical seamless",
      "pixelated abstract",
      "military fabric print",
      "camo wallpaper design",
      "tactical gear wrap",
      "outdoor apparel pattern",
      "masculine print design",
      "urban camouflage",
    ],
    applications: [
      "Performance apparel and sportswear",
      "Outdoor gear and equipment",
      "Tech accessories and device cases",
      "Automotive wraps and interiors",
      "Bold wallpaper and home decor",
      "Gaming and digital assets",
    ],
    price: 125,
    url: "https://patternripple.com/p/tactical-pixel-camo-desert-taupe",
    brand: "PatternRipple",
  } as const;

  const [selectedImage, setSelectedImage] = useState(0);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.sku,
    category: product.category,
    brand: { "@type": "Brand", name: product.brand },
    image: [product.images[0], product.images[1], product.images[2]].filter(Boolean),
    offers: {
      "@type": "Offer",
      price: String(product.price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: product.url,
    },
    keywords: product.tags.join(", "),
  };

  return (
    <>
      {/* SEO Meta */}
      <Head>
        <title>Tactical Pixel Camo Pattern in Desert Taupe | PatternRipple</title>
        <meta
          name="description"
          content="A modern, tactical seamless pattern featuring a digital pixel camouflage in desert taupe and earth tones. Ideal for apparel, gear, and tech accessories. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Tactical Pixel Camo Pattern in Desert Taupe | PatternRipple" />
        <meta
          property="og:description"
          content="A modern, tactical seamless pattern featuring a digital pixel camouflage in desert taupe and earth tones. Ideal for apparel, gear, and tech accessories."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preload" as="image" href={product.images[0]} imagesrcset={`${product.images[0]} 1200w`} />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-purple-600 transition-colors">Home</a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="/collections/abstract" className="hover:text-purple-600 transition-colors">
                Abstract Collection
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-2 shadow-[0_0_0_3px_rgba(251,191,36,0.5)]">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden relative">
                <Image
                  src={product.images[selectedImage]}
                  alt="Seamless digital pixel camouflage pattern in desert taupe and grey earth tones."
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Thumbnails 1-8 */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 8).map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${
                    selectedImage === index ? "border-purple-600" : "border-gray-200"
                  }`}
                  aria-label={`View ${index === 0 ? "main pattern" : `mockup ${index}`}`}
                >
                  <div className="relative w-full h-full">
                    <Image src={image} alt={index === 0 ? "Pattern preview" : `Application mockup ${index}`} fill sizes="25vw" className="object-cover" />
                  </div>
                </button>
              ))}
            </div>

            {/* Thumbnails 9-12 */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(8, 12).map((image, i) => {
                const idx = i + 8;
                return (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${
                      selectedImage === idx ? "border-purple-600" : "border-gray-200"
                    }`}
                    aria-label={`View mockup ${idx + 1}`}
                  >
                    <div className="relative w-full h-full">
                      <Image src={image} alt={`Application mockup ${idx + 1}`} fill sizes="25vw" className="object-cover" />
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-gray-500 text-center font-light">Watermarked preview - Full resolution upon purchase</p>
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
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{product.category}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{product.subcategory}</span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-gray-700 leading-relaxed font-light mb-4">{product.description}</p>

              {/* Applications */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Perfect Applications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.applications.map((app) => (
                    <div key={app} className="flex items-start">
                      <span className="text-purple-600 mr-2" aria-hidden>
                        •
                      </span>
                      <span className="text-gray-600 text-sm">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Included in Purchase</h3>
              <ul className="space-y-3">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start">
                    <span className="text-purple-600 mr-3" aria-hidden>
                      ✓
                    </span>
                    <span className="text-gray-700 font-light">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords/Tags for SEO */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Pattern Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.slice(0, 8).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-light text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
              <BuyButton priceId={product.stripePriceId} sku={product.sku} />
              <p className="text-sm text-gray-500 font-light">Secure checkout via Stripe - Instant download after purchase</p>
            </div>
          </div>
        </div>

        {/* Structured Data for SEO */}
        <Script id="product-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </main>
    </>
  );
}
