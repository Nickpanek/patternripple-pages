"use client";

import NextHead from "next/head";
import NextDynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

export const dynamic = "force-static";

const BuyButton = NextDynamic(() => import("@/components/BuyButton"), { ssr: false });

export default function ProductPage() {
  const product = {
    title: "8-Bit Invader Faux Embroidery on Black",
    subtitle: "Faux Embroidery Collection",
    sku: "PR-geo-20250921-011",
    price: 125,
    url: "https://patternripple.com/p/8-bit-invader-faux-embroidery-black",
    brand: "PatternRipple",
    description:
      "A vibrant, 8-bit inspired seamless pattern featuring classic arcade invader motifs. Rendered in a detailed faux embroidery style on a deep black background, this design merges nostalgic gaming culture with refined textile artistry. Perfect for unique apparel, statement wallpaper, and tech accessories.",
    category: "geometric",
    subcategory: "pixel art",
    tags: [
      "8 bit pattern",
      "pixel art seamless",
      "faux embroidery design",
      "arcade invaders pattern",
      "retro gaming print",
      "nostalgic pixel art",
      "video game pattern",
      "colorful pixel art",
      "multicolor on black",
      "jewel tone pattern",
      "gaming wallpaper",
      "retro fabric print",
      "tech accessories pattern",
      "unique gift wrap",
      "modern apparel pattern"
    ],
    images: [
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-preview.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup1.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup2.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup3.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup4.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup5.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup6.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup7.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup8.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup9.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup10.jpg",
      "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-mockup11.jpg"
    ],
    altText:
      "Seamless 8-bit invader faux embroidery pattern with multicolor pixel aliens on a black background."
  };

  const stripePriceId = "price_1S9saKBB8R6OUfKVBnQu3S95";

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>8-Bit Invader Faux Embroidery Pattern on Black | PatternRipple</title>
        <meta
          name="description"
          content="Discover a nostalgic 8-bit invader seamless pattern in a vibrant faux embroidery style. This pixel art design is perfect for unique fabric and wallpaper. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="8-Bit Invader Faux Embroidery Pattern on Black | PatternRipple" />
        <meta
          property="og:description"
          content="Discover a nostalgic 8-bit invader seamless pattern in a vibrant faux embroidery style. This pixel art design is perfect for unique fabric and wallpaper. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-purple-600 transition-colors">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><a href={`/collections/${product.category}`} className="hover:text-purple-600 transition-colors">{product.subtitle}</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">{product.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-2 shadow-[0_0_0_3px_rgba(251,191,36,0.5)]">
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.altText || "8-bit invader faux embroidery pattern on black"}
                  width={2048}
                  height={2048}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 8).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-purple-600" : "border-gray-200"
                  }`}
                  aria-label={`View ${index === 0 ? "main pattern" : `mockup ${index}`}`}
                >
                  <Image
                    src={image}
                    alt={index === 0 ? "Pattern preview" : `Pattern mockup ${index}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

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
                  <Image
                    src={image}
                    alt={`Pattern mockup ${index + 9}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 text-center font-light">
              Watermarked preview - Full resolution upon purchase
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <span className="inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">
                EXCLUSIVE PATTERN
              </span>
              <h1 className="text-4xl font-light text-gray-900 mb-2">{product.title}</h1>
              <p className="text-xl text-gray-600 font-light">{product.subtitle}</p>

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

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Pattern Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-light text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
              <BuyButton priceId={stripePriceId} sku={product.sku} />
              <p className="text-sm text-gray-500 font-light">
                Secure checkout via Stripe - Instant download after purchase
              </p>
            </div>
          </div>
        </div>

        <Script
          id="product-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.title,
              description: product.description,
              sku: product.sku,
              category: product.category,
              brand: {
                "@type": "Brand",
                name: "PatternRipple"
              },
              image: product.images.slice(0, 3),
              offers: {
                "@type": "Offer",
                price: String(product.price),
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: product.url
              },
              keywords: product.tags.join(", ")
            })
          }}
        />
      </main>
    </>
  );
}
