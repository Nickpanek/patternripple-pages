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
    title: "Vintage Floral Patchwork Quilt",
    subtitle: "Patchwork Quilt Collection",
    sku: "PR-tex-20250927-008",
    price: 125,
    url: "https://patternripple.com/p/vintage-floral-patchwork-quilt-multicolor",
    brand: "PatternRipple",
    description:
      "A timeless seamless pattern inspired by a traditional hand-sewn patchwork quilt, featuring a charming collection of vintage floral squares. The detailed stitching effect brings an authentic, cozy feel to this rustic textile design.",
    category: "patchwork-quilt",
    subcategory: "patchwork",
    tags: [
      "floral patchwork",
      "vintage quilt pattern",
      "multicolor floral",
      "stitched textile",
      "cottage core aesthetic",
      "farmhouse decor",
      "shabby chic print",
      "rustic fabric",
      "country style",
      "quilted texture",
      "wallpaper pattern",
      "fabric print",
      "home decor fabric",
      "upholstery design",
      "digital scrapbooking",
      "textile"
    ],
    images: [
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-preview.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup1.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup2.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup3.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup4.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup5.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup6.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup7.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup8.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup9.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup10.jpg",
      "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-mockup11.jpg"
    ],
    altText: "Seamless vintage floral patchwork quilt pattern with multicolor stitched squares."
  };

  const stripePriceId = "price_1SC4o6BB8R6OUfKVsQSbjj9o";

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Vintage Floral Patchwork Quilt Pattern - Multicolor | PatternRipple</title>
        <meta
          name="description"
          content="Discover a timeless seamless pattern of a vintage floral patchwork quilt in rustic multicolor hues. Perfect for cozy home decor and textiles. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Vintage Floral Patchwork Quilt Pattern - Multicolor | PatternRipple" />
        <meta
          property="og:description"
          content="Discover a timeless seamless pattern of a vintage floral patchwork quilt in rustic multicolor hues. Perfect for cozy home decor and textiles. Shop this exclusive pattern."
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
          <a href="/c/patchwork-quilt" className="hover:underline capitalize">patchwork-quilt</a>
          <span className="mx-1">/</span>
          <a href={`/c/${product.category}/${product.subcategory}`} className="hover:underline capitalize">
            {product.subcategory}
          </a>
          <span className="mx-1">/</span>
          <span className="text-gray-700">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <section>
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
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
              {product.images.slice(0, 8).map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    aria-label={`Select image ${i + 1}`}
                    className={`relative w-full aspect-square rounded border ${
                      i === selectedImage ? "ring-2 ring-black" : "hover:opacity-80"
                    }`}
                  >
                    <Image src={src} alt={`${product.altText} - ${i + 1}`} fill className="object-cover rounded" sizes="15vw" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Product Details */}
          <section className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-semibold">{product.title}</h1>
            <p className="mt-1 text-gray-600">{product.subtitle}</p>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-medium">${product.price}</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            <div className="mt-6">
              <BuyButton sku={product.sku} priceId={stripePriceId} />
            </div>

            <p className="mt-6 text-gray-800 leading-relaxed">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="text-xs bg-gray-100 border px-2 py-1 rounded">{t}</span>
              ))}
            </div>

            <div className="mt-8 text-sm text-gray-600">
              <p>Exclusive pattern with authenticity certificate.</p>
              <p className="mt-1">Thumbnail 600x600 is pending upload.</p>
            </div>
          </section>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-lg font-semibold mb-3">Details</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Exclusive single buyer license</li>
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
    </>
  );
}
