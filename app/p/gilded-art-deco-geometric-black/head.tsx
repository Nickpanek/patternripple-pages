export default function Head() {
  const title = "Gilded Art Deco Geometric Seamless Pattern | PatternRipple";
  const desc =
    "A luxurious seamless Art Deco pattern in gold, black, and ruby red. Inspired by 1920s glamour, perfect for opulent wallpaper or textiles. Shop this exclusive pattern.";
  const url = "https://patternripple.com/p/gilded-art-deco-geometric-black";
  const ogImage = "https://files.patternripple.com/gilded-art-deco-geometric-black_preview_2048w.jpg";

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "Gilded Art Deco Geometric in Black",
    description: desc,
    sku: "PR-geo-20250921-002",
    category: "geometric",
    brand: { "@type": "Brand", name: "PatternRipple" },
    image: [
      "https://files.patternripple.com/gilded-art-deco-geometric-black-preview.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup1.jpg",
      "https://files.patternripple.com/gilded-art-deco-geometric-black-mockup2.jpg"
    ],
    offers: {
      "@type": "Offer",
      price: "125",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url
    },
    keywords: [
      "art deco pattern",
      "geometric seamless",
      "gold and black pattern",
      "art deco wallpaper",
      "opulent deco print",
      "sunburst motif"
    ].join(", ")
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
