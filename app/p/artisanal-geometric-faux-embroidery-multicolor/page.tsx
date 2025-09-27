"use client";

import NextHead from "next/head";
import NextDynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import { useMemo, useState } from "react";

export const dynamic = "force-static";

const BuyButton = NextDynamic(() => import("@/components/BuyButton"), { ssr: false });

export default function ProductPage() {
  const stripePriceId = "price_1SBu2EBB8R6OUfKVO1zziq0E";

  const product = useMemo(() => {
    const category = "faux-embroidery";
    const subcategory = "geometric";
    const images = [
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-preview.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-thumb.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup1.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup2.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup3.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup4.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup5.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup6.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup7.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup8.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup9.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup10.jpg",
      "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-mockup11.jpg",
    ];

    const COLLECTION_LABELS: Record<string, string> = {
      "abstract": "Abstract",
      "camo": "Camo",
      "faux-embroidery": "Faux Embroidery",
      "geometric": "Geometric",
      "horror": "Horror",
      "seasonal": "Seasonal",
      "impasto": "Impasto",
      "ufo-cryptids": "UFO & Cryptids",
      "patchwork-quilt": "Patchwork Quilt",
      "preppy-posh": "Preppy & Posh",
      "old-west": "Old West",
      "groovy-psychedelic": "Groovy & Psychedelic",
      "architecture": "Architecture",
      "cute-animals": "Cute Animals",
      "usa-patriotic": "USA Patriotic",
    };

    return {
      title: "Artisanal Geometric Faux Embroidery",
      subtitle: `${COLLECTION_LABELS[category] || "Misc"} Collection`,
      sku: "PR-emb-20250927-015",
      price: 125,
      url: "https://patternripple.com/p/artisanal-geometric-faux-embroidery-multicolor",
      brand: "PatternRipple",
      description:
        "A richly detailed faux embroidery pattern featuring a grid of concentric squares in a vibrant, multicolor palette. This seamless design captures the texture and artistry of traditional needlepoint, perfect for sophisticated textiles and statement decor.",
      category,
      subcategory,
      // auto add a second applicable category tag for discovery
      tags: [
        "geometric pattern",
        "faux embroidery",
        "needlepoint texture",
        "artisanal design",
        "multicolor",
        "vibrant colors",
        "jewel tones",
        "woven pattern",
        "concentric squares",
        "pixelated embroidery",
        "patchwork style",
        "wallpaper pattern",
        "fabric print",
        "upholstery fabric",
        "gift wrap",
        "geometric", // additional discoverability tag
      ],
      images,
      altText:
        "Seamless geometric faux embroidery pattern with multicolor squares.",
      exclusive: true,
      available: true,
    };
  }, []);

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <NextHead>
        <title>Artisanal Geometric Faux Embroidery Pattern | PatternRipple</title>
        <meta
          name="description"
          content="Vibrant seamless geometric faux embroidery pattern with multicolor squares. Artisan-inspired design for luxury textiles and decor. Shop this exclusive pattern."
        />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content="Artisanal Geometric Faux Embroidery Pattern | PatternRipple" />
        <meta
          property="og:description"
          content="Vibrant seamless geometric faux embroidery pattern with multicolor squares. Artisan-inspired design for luxury textiles and decor. Shop this exclusive pattern."
        />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </NextHead>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> <span className="mx-1">/</span>
          <a href={`/c/${product.category}`} className="hover:underline capitalize">{product.category.replace("-", " ")}</a> <span className="mx-1">/</span>
          <a href={`/c/${product.category}/${product.subcategory}`} className="hover:underline capitalize">{product.subcategory}</a> <span className="mx-1">/</span>
          <span className="text-gray-700">{product.title}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: image viewer */}
          <section>
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
              <Image
                key={product.images[selectedImage]}
                src={product.images[selectedImage]}
                alt={product.altText || "Pattern preview"}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            <ul className="mt-4 grid grid-cols-6 sm:grid-cols-8 gap-2">
              {product.images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    aria-label={`Select image ${i + 1}`}
                    className={`relative w-full aspect-square rounded border ${i === selectedImage ? "ring-2 ring-black" : "hover:opacity-80"}`}
                  >
                    <Image
                      src={src}
                      alt={`${product.altText || "Pattern image"} - ${i + 1}`}
                      fill
                      className="object-cover rounded"
                      sizes="15vw"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Right: details */}
          <section className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
            <p className="mt-1 text-gray-600">{product.subtitle}</p>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-xl font-medium">${product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            <p className="mt-6 text-gray-800 leading-relaxed">{product.description}</p>

            <div className="mt-6">
              <BuyButton priceId={stripePriceId} sku={product.sku} />
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="text-xs bg-gray-100 border px-2 py-1 rounded">{t}</span>
              ))}
            </div>

            {/* Exclusive ribbon */}
            {product.exclusive && (
              <div className="mt-6 text-sm font-semibold text-green-700">
                Exclusive license - only 1 available
              </div>
            )}
          </section>
        </div>

        {/* Details */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-lg font-semibold mb-3">Details</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Exclusive single-buyer license</li>
            <li>Optimized source at 6000x6000</li>
            <li>Instant file delivery after checkout</li>
            <li>Includes certificate of authenticity</li>
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
              url: product.url,
            },
            keywords: product.tags.join(", "),
          }),
        }}
      />
    </>
  );
}
