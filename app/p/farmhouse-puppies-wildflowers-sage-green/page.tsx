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
    title: "Farmhouse Puppies and Wildflowers on Sage",
    subtitle: "Cute Animals Collection",
    sku: "PR-ani-20250927-001",
    price: 125,
    url: "https://patternripple.com/p/farmhouse-puppies-wildflowers-sage-green",
    brand: "PatternRipple",
    description:
      "A charming seamless pattern capturing the warmth of farmhouse style, featuring illustrated puppies amidst delicate wildflowers. The soft sage green background enhances its rustic appeal, perfect for nursery textiles, apparel, and quaint home decor.",
    category: "cute-animals",
    subcategory: "dogs",
    tags: [
      "puppy pattern",
      "farmhouse dogs",
      "sage green",
      "floral animal",
      "rustic pattern",
      "charming illustration",
      "nursery decor",
      "kids pattern",
      "wildflower design",
      "cute animals",
      "pet fabric",
      "cottagecore aesthetic",
      "wallpaper pattern",
      "fabric print",
      "gift wrap"
    ],
    images: [
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-preview.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup1.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup2.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup3.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup4.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup5.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup6.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup7.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup8.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup9.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup10.jpg",
      "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-mockup11.jpg"
    ],
    altText: "Seamless pattern of cute farmhouse puppies and flowers on a sage green background."
  };

  const stripePriceId = "price_1SC5IQBB8R6OUfKVz5rjOxJr";

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Farmhouse Puppies Pattern - Sage Green Floral | PatternRipple</title>
        <meta
          name="description"
          content="Charming seamless pattern featuring rustic farmhouse puppies and wildflowers on a sage green background. Perfect for nursery decor and textiles. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Farmhouse Puppies Pattern - Sage Green Floral | PatternRipple" />
        <meta
          property="og:description"
          content="Charming seamless pattern featuring rustic farmhouse puppies and wildflowers on a sage green background. Perfect for nursery decor and textiles. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> <span className="mx-1">/</span>
          <a href="/c/cute-animals" className="hover:underline capitalize">{product.category.replace("-", " ")}</a> <span className="mx-1">/</span>
          <a href={`/c/${product.category}/${product.subcategory}`} className="hover:underline capitalize">{product.subcategory}</a> <span className="mx-1">/</span>
          <span className="text-gray-700">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
              <Image
                key={product.images[selectedImage]}
                src={product.images[selectedImage]}
                alt={product.altText || "Farmhouse puppies and wildflowers on sage"}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <ul className="mt-4 grid grid-cols-6 sm:grid-cols-8 gap-2">
              {product.images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    aria-label={`Select image ${i + 1}`}
                    className={`relative w-full aspect-square rounded border ${i === selectedImage ? "ring-2 ring-black" : "hover:opacity-80"}`}
                  >
                    <Image src={src} alt={`${product.altText} - ${i + 1}`} fill className="object-cover rounded" sizes="15vw" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
            <p className="mt-1 text-gray-600">{product.subtitle}</p>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-xl font-medium">${product.price}</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            <div className="mt-6">
              <BuyButton priceId={stripePriceId} sku={product.sku} />
            </div>

            <p className="mt-6 text-gray-800 leading-relaxed">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.concat(["cute-animals"]).map((t) => (
                <span key={t} className="text-xs bg-gray-100 border px-2 py-1 rounded">{t}</span>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-lg font-semibold mb-3">Details</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Exclusive single-buyer license</li>
            <li>Optimized source at 6000x6000</li>
            <li>Instant file delivery after checkout</li>
          </ul>
        </section>
      </main>

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
            brand: { "@type": "Brand", name: "PatternRipple" },
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
    </>
  );
}
