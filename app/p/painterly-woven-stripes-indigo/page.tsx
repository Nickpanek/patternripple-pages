"use client";

import Head from "next/head";
import NextDynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

export const dynamic = "force-static";

const BuyButton = NextDynamic(() => import("@/components/BuyButton"), { ssr: false });

export default function ProductPage() {
  const product = {
    title: "Painterly Woven Stripes in Indigo",
    subtitle: "geometric Collection",
    sku: "PR-geo-20250921-010",
    price: 125,
    url: "https://patternripple.com/p/painterly-woven-stripes-indigo",
    brand: "PatternRipple",
    description:
      "A sophisticated seamless pattern featuring hand-painted indigo and sky blue stripes arranged in a modern woven structure. The visible texture adds depth, making it ideal for contemporary textiles, bold wallpaper, and refined stationery.",
    category: "geometric",
    subcategory: "stripes",
    tags: [
      "painterly stripes",
      "woven stripes pattern",
      "geometric stripes",
      "brushstroke pattern",
      "hand painted stripes",
      "indigo blue pattern",
      "navy and blue",
      "cobalt blue",
      "modern geometric",
      "textured pattern",
      "abstract stripes",
      "wallpaper pattern",
      "menswear fabric",
      "home decor print",
      "stationery design"
    ],
    images: [
      "https://files.patternripple.com/painterly-woven-stripes-indigo-preview.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup1.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup2.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup3.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup4.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup5.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup6.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup7.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup8.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup9.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup10.jpg",
      "https://files.patternripple.com/painterly-woven-stripes-indigo-mockup11.jpg"
    ],
    altText:
      "Seamless geometric pattern with painterly indigo and blue woven stripes on a dark background.",
    isExclusive: true,
    exclusivityStatus: "available",
    stripePriceId: "price_1S9ppGBB8R6OUfKVTfctJrtG"
  };

  const seo = {
    title: "Indigo Woven Stripes Geometric Pattern",
    description:
      "Discover a modern geometric seamless pattern with painterly indigo woven stripes. Perfect for contemporary textiles, wallpaper, and stationery. Shop this exclusive pattern."
  };

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Head>
        <title>{`${seo.title} | PatternRipple`}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={product.url} />
        <meta property="og:title" content={`${seo.title} | PatternRipple`} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={product.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-purple-600">Home</a></li>
            <li className="text-gray-400">/</li>
            <li>
              <a href={`/collections/${product.category}`} className="hover:text-purple-600">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Collection
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">{product.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <section>
            <div className="bg-white rounded-2xl p-2 shadow">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.images[activeIndex]}
                  alt={product.altText || "Pattern preview"}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                    activeIndex === i ? "border-purple-600" : "border-gray-200"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={src} alt={`Pattern image ${i + 1}`} fill sizes="25vw" />
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 text-center mt-3">
              Watermarked preview - full resolution after purchase
            </p>
          </section>

          {/* Details */}
          <section className="space-y-8">
            <div>
              {product.isExclusive && (
                <span className="inline-block bg-amber-500 text-white text-xs font-semibold px-4 py-1 rounded-full mb-4">
                  EXCLUSIVE PATTERN
                </span>
              )}
              <h1 className="text-4xl font-light text-gray-900 mb-2">{product.title}</h1>
              <p className="text-lg text-gray-600">{product.subtitle || "Pattern Collection"}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {product.category || "misc"}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {product.subcategory || "misc"}
                </span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-light text-gray-900">${product.price ?? 125}</span>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
              <BuyButton priceId={product.stripePriceId} sku={product.sku} />
              <p className="text-sm text-gray-500">Secure checkout via Stripe - instant download after purchase</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Pattern Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
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
              category: product.category || "misc",
              brand: { "@type": "Brand", name: "PatternRipple" },
              image: product.images.slice(0, 3),
              offers: {
                "@type": "Offer",
                price: String(product.price ?? 125),
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
