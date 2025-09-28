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
    title: "Preppy Argyle Plaid in Pink and Green",
    subtitle: "Geometric Collection",
    sku: "PR-geo-20250928-007",
    price: 125,
    url: "https://patternripple.com/p/preppy-argyle-plaid-pink-green",
    brand: "PatternRipple",
    description:
      "A timeless seamless pattern featuring a classic argyle plaid design in preppy pink and green. The clean, diagonal lines and vibrant color palette evoke a sense of sophisticated, collegiate charm perfect for fashion and home decor.",
    category: "geometric",
    subcategory: "plaid",
    // Include extra related collection tag since it fits Preppy & Posh
    tags: [
      "preppy pattern",
      "argyle plaid",
      "pink and green",
      "plaid pattern",
      "tartan design",
      "diagonal plaid",
      "diamond pattern",
      "classic check",
      "southern style",
      "collegiate aesthetic",
      "classic preppy",
      "wallpaper pattern",
      "fabric print",
      "gift wrap",
      "stationery design",
      "preppy-posh"
    ],
    images: [
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-preview.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup1.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup2.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup3.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup4.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup5.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup6.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup7.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup8.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup9.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup10.jpg",
      "https://files.patternripple.com/preppy-argyle-plaid-pink-green-mockup11.jpg"
    ],
    altText: "Seamless preppy argyle plaid pattern in pink and green."
  };

  const stripePriceId = "price_1SCSCEBB8R6OUfKVhlzUH2Xh";

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Preppy Argyle Plaid Pattern - Pink and Green | PatternRipple</title>
        <meta
          name="description"
          content="A classic seamless preppy argyle plaid pattern in vibrant pink and green. Sophisticated design for textiles, wallpaper, and classic branding. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Preppy Argyle Plaid Pattern - Pink and Green | PatternRipple" />
        <meta
          property="og:description"
          content="A classic seamless preppy argyle plaid pattern in vibrant pink and green. Sophisticated design for textiles, wallpaper, and classic branding. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a>
          <span className="mx-1">/</span>
          <a href={`/c/${product.category}`} className="hover:underline capitalize">{product.category}</a>
          <span className="mx-1">/</span>
          <a href={`/c/${product.category}/${product.subcategory}`} className="hover:underline capitalize">{product.subcategory}</a>
          <span className="mx-1">/</span>
          <span className="text-gray-700">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <section>
            <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden border">
              <Image
                key={product.images[selectedImage]}
                src={product.images[selectedImage]}
                alt={product.altText}
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

          {/* Product Details */}
          <section className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
            <p className="text-lg text-gray-500 mt-1">{product.subtitle}</p>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-600">SKU: {product.sku}</span>
            </div>

            <div className="mt-5">
              <BuyButton sku={product.sku} priceId={stripePriceId} />
            </div>

            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900">Description</h3>
              <p className="text-base text-gray-700 mt-2">{product.description}</p>
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Category:</span>{" "}
                <a href={`/c/${product.category}`} className="capitalize hover:underline">{product.category}</a>
                {" "}·{" "}
                <a href={`/c/${product.category}/${product.subcategory}`} className="capitalize hover:underline">{product.subcategory}</a>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Tags:</span> {product.tags.join(", ")}
              </p>
            </div>
          </section>
        </div>

        {/* Below the fold */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-lg font-semibold mb-3">Details</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Exclusive single buyer license</li>
            <li>Optimized source at 6000x6000</li>
            <li>Instant file delivery after checkout</li>
          </ul>
        </section>
      </main>

      {/* JSON-LD */}
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
