"use client";

import Link from "next/link";
import Head from "next/head";
import { useMemo, useState } from "react";

type Product = {
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  sku: string;
  stripePriceId: string;
  thumbnail: string;
  exclusive: boolean;
  available: boolean;
  category?: string;
};

const products: Product[] = [
  {
    slug: "butterfly-floral-faux-embroidery-navy",
    title: "Butterfly & Wildflower Faux Embroidery on Navy",
    subtitle: "Faux Embroidery Collection",
    price: 20,
    sku: "PR-fem-20251003-001",
    stripePriceId: "price_1SEJ7zBB8R6OUfKVekZpNmCe",
    thumbnail: "https://files.patternripple.com/butterfly-floral-faux-embroidery-navy-thumb.jpg",
    exclusive: true,
    available: true,
    category: "faux-embroidery"
  },
  {
    slug: "architectural-wireframe-monochrome-geometric",
    title: "Architectural Wireframe in Monochrome",
    subtitle: "Architecture Collection",
    price: 20,
    sku: "PR-arc-20250929-007",
    stripePriceId: "price_1SCs4NBB8R6OUfKVkaceldyP",
    thumbnail: "https://files.patternripple.com/architectural-wireframe-monochrome-geometric-thumb.jpg",
    exclusive: true,
    available: true,
    category: "architecture"
  },
  {
    slug: "bigfoot-forest-faux-embroidery-blue-green",
    title: "Bigfoot Forest Faux Embroidery",
    subtitle: "UFO & Cryptids Collection",
    price: 20,
    sku: "PR-ufo-20250929-117",
    stripePriceId: "price_1SCcekBB8R6OUfKVPwSAhoC2",
    thumbnail: "https://files.patternripple.com/bigfoot-forest-faux-embroidery-blue-green-thumb.jpg",
    exclusive: true,
    available: true,
    category: "ufo-cryptids"
  },
  {
    slug: "atomic-age-ufo-primary-colors",
    title: "Atomic Age UFOs in Primary Colors",
    subtitle: "UFO & Cryptids Collection",
    price: 20,
    sku: "PR-ufo-20250929-001",
    stripePriceId: "price_1SCcIOBB8R6OUfKV7H0O7s3V",
    thumbnail: "https://files.patternripple.com/atomic-age-ufo-primary-colors-thumb.jpg",
    exclusive: true,
    available: true,
    category: "ufo-cryptids"
  },
  {
    slug: "bigfoot-toile-sunglasses-mustard-pink",
    title: "Bigfoot Toile with Sunglasses in Mustard & Pink",
    subtitle: "Cryptid Collection",
    price: 125,
    sku: "PR-nov-20250928-042",
    stripePriceId: "price_1SCXabBB8R6OUfKVtiEXHbN0",
    thumbnail: "https://files.patternripple.com/bigfoot-toile-sunglasses-mustard-pink-thumb.jpg",
    exclusive: true,
    available: true,
    category: "ufo-cryptids"
  },
  {
    slug: "psychedelic-visionary-art-jewel-tones",
    title: "Psychedelic Visionary Art in Jewel Tones",
    subtitle: "Psychedelic Collection",
    price: 125,
    sku: "PR-abs-20250928-034",
    stripePriceId: "price_1SCXJDBB8R6OUfKVk6DSvRKP",
    thumbnail: "https://files.patternripple.com/psychedelic-visionary-art-jewel-tones-thumb.jpg",
    exclusive: true,
    available: true,
    category: "groovy-psychedelic"
  },
  {
    slug: "architectural-blueprint-deep-blue",
    title: "Architectural Blueprint on Deep Blue",
    subtitle: "Architecture Collection",
    price: 125,
    sku: "PR-tec-20250928-001",
    stripePriceId: "price_1SCWv6BB8R6OUfKVHL7kux8Y",
    thumbnail: "https://files.patternripple.com/architectural-blueprint-deep-blue-thumb.jpg",
    exclusive: true,
    available: true,
    category: "architecture"
  },
  {
    slug: "artisan-patchwork-faux-embroidery-jewel-tones",
    title: "Artisan Patchwork Faux Embroidery",
    subtitle: "Patchwork Quilt Collection",
    price: 125,
    sku: "PR-fem-20250928-007",
    stripePriceId: "price_1SCT0LBB8R6OUfKVBqkfElYc",
    thumbnail: "https://files.patternripple.com/artisan-patchwork-faux-embroidery-jewel-tones-thumb.jpg",
    exclusive: true,
    available: true,
    category: "patchwork-quilt"
  },
  {
    slug: "preppy-argyle-plaid-pink-green",
    title: "Preppy Argyle Plaid in Pink and Green",
    subtitle: "Preppy Collection",
    price: 125,
    sku: "PR-geo-20250928-007",
    stripePriceId: "price_1SCSCEBB8R6OUfKVhlzUH2Xh",
    thumbnail: "https://files.patternripple.com/preppy-argyle-plaid-pink-green-thumb.jpg",
    exclusive: true,
    available: true,
    category: "preppy-posh"
  },
  {
    slug: "retro-ufo-pattern-atomic-teal",
    title: "Retro UFOs on Teal",
    subtitle: "UFO Collection",
    price: 125,
    sku: "PR-ret-20250928-007",
    stripePriceId: "price_1SCRaJBB8R6OUfKVWO3bfd6l",
    thumbnail: "https://files.patternripple.com/retro-ufo-pattern-atomic-teal-thumb.jpg",
    exclusive: true,
    available: true,
    category: "ufo-cryptids"
  },
  {
    slug: "sunset-gunslinger-faux-embroidery-purple",
    title: "Sunset Gunslinger Faux Embroidery",
    subtitle: "Old West Collection",
    price: 125,
    sku: "PR-emb-20250927-077",
    stripePriceId: "price_1SC9vcBB8R6OUfKVZtY4nkQIN",
    thumbnail: "https://files.patternripple.com/sunset-gunslinger-faux-embroidery-purple-thumb.jpg",
    exclusive: true,
    available: true,
    category: "old-west"
  },
  {
    slug: "psychedelic-neon-contours-abstract",
    title: "Psychedelic Neon Contours",
    subtitle: "Groovy & Psychedelic Collection",
    price: 125,
    sku: "PR-abs-20250927-007",
    stripePriceId: "price_1SC8eNBB8R6OUfKV6BVng8cN",
    thumbnail: "https://files.patternripple.com/psychedelic-neon-contours-abstract-thumb.jpg",
    exclusive: true,
    available: true,
    category: "groovy-psychedelic"
  },
  {
    slug: "abstract-brushstrokes-navy-blush",
    title: "Abstract Brushstrokes in Navy and Blush",
    subtitle: "Abstract Collection",
    price: 125,
    sku: "PR-abs-20250927-420",
    stripePriceId: "price_1SC84cBB8R6OUfKVn1E7kDKs",
    thumbnail: "https://files.patternripple.com/abstract-brushstrokes-navy-blush-thumb.jpg",
    exclusive: true,
    available: true,
    category: "abstract"
  },
  {
    slug: "realistic-desert-camouflage-brown-tan",
    title: "Realistic Desert Camouflage",
    subtitle: "Camo Collection",
    price: 125,
    sku: "PR-abs-20250927-007",
    stripePriceId: "price_1SC7j2BB8R6OUfKVAL1pJA0O",
    thumbnail: "https://files.patternripple.com/realistic-desert-camouflage-brown-tan-thumb.jpg",
    exclusive: true,
    available: true,
    category: "camo"
  },
  {
    slug: "farmhouse-puppies-wildflowers-sage-green",
    title: "Farmhouse Puppies and Wildflowers on Sage",
    subtitle: "Cutew Animals Collection",
    price: 125,
    sku: "PR-ani-20250927-001",
    stripePriceId: "price_1SC5IQBB8R6OUfKVz5rjOxJr",
    thumbnail: "https://files.patternripple.com/farmhouse-puppies-wildflowers-sage-green-thumb.jpg",
    exclusive: true,
    available: true,
    category: "cute-animals"
  },
  {
    slug: "vintage-floral-patchwork-quilt-multicolor",
    title: "Vintage Floral Patchwork Quilt",
    subtitle: "Patchwork Quilt Collection",
    price: 125,
    sku: "PR-tex-20250927-008",
    stripePriceId: "price_1SC4o6BB8R6OUfKVsQSbjj9o",
    thumbnail: "https://files.patternripple.com/vintage-floral-patchwork-quilt-multicolor-thumb.jpg",
    exclusive: true,
    available: true,
    category: "patchwork-quilt"
  },
  {
    slug: "monochrome-architectural-arches-pattern",
    title: "Monochrome Architectural Arches",
    subtitle: "Architecture Collection",
    price: 125,
    sku: "PR-geo-20250925-017",
    stripePriceId: "price_1SAkaGBB8R6OUfKVl8eTovxL",
    thumbnail: "https://files.patternripple.com/monochrome-architectural-arches-pattern-thumb.jpg",
    exclusive: true,
    available: true,
    category: "architecture"
  },
  {
    slug: "artisanal-geometric-faux-embroidery-multicolor",
    title: "Artisanal Geometric Faux Embroidery",
    subtitle: "Faux Embroidery Collection",
    price: 125,
    sku: "PR-emb-20250927-015",
    stripePriceId: "price_1SBu2EBB8R6OUfKVO1zziq0E",
    thumbnail: "https://files.patternripple.com/artisanal-geometric-faux-embroidery-multicolor-thumb.jpg",
    exclusive: true,
    available: true,
    category: "faux-embroidery"
  },
  {
    slug: "rustic-stars-and-stripes-patriotic",
    title: "Rustic Stars and Stripes",
    subtitle: "USA Patriotic Collection",
    price: 125,
    sku: "PR-sea-20250927-007",
    stripePriceId: "price_1SBtJiBB8R6OUfKVxSwa3VGS",
    thumbnail: "https://files.patternripple.com/rustic-stars-and-stripes-patriotic-thumb.jpg",
    exclusive: true,
    available: true,
    category: "usa-patriotic"
  },
  {
    slug: "textured-gothic-skulls-charcoal",
    title: "Textured Gothic Skulls on Charcoal",
    subtitle: "Horror Collection",
    price: 125,
    sku: "PR-hor-20250923-007",
    stripePriceId: "price_1SAkaGBB8R6OUfKVl8eTovxL",
    thumbnail: "https://files.patternripple.com/textured-gothic-skulls-charcoal-thumb.jpg",
    exclusive: true,
    available: true,
    category: "horror"
  },
  {
    slug: "preppy-garden-trellis-pink-green",
    title: "Preppy Garden Trellis in Pink and Green",
    subtitle: "Preppy Collection",
    price: 125,
    sku: "PR-geo-20250925-001",
    stripePriceId: "price_1SBJ6gBB8R6OUfKVfoUiAoHG",
    thumbnail: "https://files.patternripple.com/preppy-garden-trellis-pink-green-thumb.jpg",
    exclusive: true,
    available: true,
    category: "preppy-posh"
  },
  {
    slug: "mid-century-abstract-pebbles-black-orange",
    title: "Mid-Century Abstract Pebbles in Black and Orange",
    subtitle: "Abstract Collection",
    price: 125,
    sku: "PR-abs-20250922-011",
    stripePriceId: "price_1SA9SUBB8R6OUfKV2Q1ewLS4",
    thumbnail: "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-thumb.jpg",
    exclusive: true,
    available: true,
    category: "abstract"
  },
  {
    slug: "cherry-blossom-faux-embroidery-light-blue",
    title: "Cherry Blossom Faux Embroidery on Light Blue",
    subtitle: "Floral Collection",
    price: 125,
    sku: "PR-emb-20250923-001",
    stripePriceId: "price_1SAjW6BB8R6OUfKVOTLQoom0",
    thumbnail: "https://files.patternripple.com/cherry-blossom-faux-embroidery-light-blue-thumb.jpg",
    exclusive: true,
    available: true,
    category: "faux-embroidery"
  },
  {
    slug: "pr-geo-20250919-001",
    title: "Atomic Matchstick Geometric",
    subtitle: "Mid-Century Collection",
    price: 125,
    sku: "PR-geo-20250919-001",
    stripePriceId: "price_1S91pvBB8R6OUfKVfz51JXSY",
    thumbnail: "https://files.patternripple.com/PR-geo-20250919-001-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "japandi-brushstrokes-plum-mauve",
    title: "Japandi Brushstrokes in Plum and Mauve",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-abs-20250921-019",
    stripePriceId: "price_1S9wwJBB8R6OUfKVmseB0xm4",
    thumbnail: "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "8-bit-invader-faux-embroidery-black",
    title: "8-Bit Invader Faux Embroidery on Black",
    subtitle: "Faux Embroidery Collection",
    price: 125,
    sku: "PR-geo-20250921-011",
    stripePriceId: "price_1S9saKBB8R6OUfKVBnQu3S95",
    thumbnail: "https://files.patternripple.com/8-bit-invader-faux-embroidery-black-thumb.jpg",
    exclusive: true,
    available: true,
    category: "faux-embroidery"
  },
  {
    slug: "vibrant-floral-faux-embroidery-navy",
    title: "Vibrant Floral Faux Embroidery on Navy",
    subtitle: "Floral Collection",
    price: 125,
    sku: "PR-flo-20250921-006",
    stripePriceId: "price_1S9oRyBB8R6OUfKVkOVUZcAx",
    thumbnail: "https://files.patternripple.com/vibrant-floral-faux-embroidery-navy-thumb.jpg",
    exclusive: true,
    available: true,
    category: "floral"
  },
  {
    slug: "gilded-stripe-circles-olive-geometric",
    title: "Gilded Stripe Circles on Olive",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-geo-20250921-001",
    stripePriceId: "price_1S9mssBB8R6OUfKVZYZoIF7e",
    thumbnail: "https://files.patternripple.com/gilded-stripe-circles-olive-geometric-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "pastel-doodle-easter-eggs-pink",
    title: "Pastel Doodle Easter Eggs on Pink",
    subtitle: "Easter Collection",
    price: 125,
    sku: "PR-sea-20250921-001",
    stripePriceId: "price_1S9mKjBB8R6OUfKVRjVFkwn1",
    thumbnail: "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-thumb.jpg",
    exclusive: true,
    available: true,
    category: "seasonal"
  },
  {
    slug: "op-art-tunnel-illusion-black-white",
    title: "Op Art Tunnel Illusion in Monochrome",
    subtitle: "Op Art Collection",
    price: 125,
    sku: "PR-geo-20250921-008",
    stripePriceId: "price_1S9wTvBB8R6OUfKV2jsZV0sK",
    thumbnail: "https://files.patternripple.com/op-art-tunnel-illusion-black-white-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "infernal-damnation-painterly-ochre-red",
    title: "Infernal Damnation in Ochre and Red",
    subtitle: "Horror Collection",
    price: 125,
    sku: "PR-hor-20250926-001",
    stripePriceId: "price_1SBmRTBB8R6OUfKVJ86i6HOI",
    thumbnail: "https://files.patternripple.com/infernal-damnation-painterly-ochre-red-thumb.jpg",
    exclusive: true,
    available: true,
    category: "horror"
  },
  {
    slug: "impasto-poinsettia-christmas-floral-red",
    title: "Impasto Poinsettia Christmas Floral",
    subtitle: "Christmas Collection",
    price: 125,
    sku: "PR-sea-20250923-018",
    stripePriceId: "price_1SAk2xBB8R6OUfKV7DMeAJrC",
    thumbnail: "https://files.patternripple.com/impasto-poinsettia-christmas-floral-red-thumb.jpg",
    exclusive: true,
    available: true,
    category: "seasonal"
  },
  {
    slug: "gilded-art-deco-geometric-black",
    title: "Gilded Art Deco Geometric in Black",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-geo-20250921-002",
    stripePriceId: "price_1S9nUoBB8R6OUfKV75USAunw",
    thumbnail: "https://files.patternripple.com/gilded-art-deco-geometric-black-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "tactical-pixel-camo-desert-taupe",
    title: "Tactical Pixel Camo in Desert Taupe",
    subtitle: "Camo Collection",
    price: 125,
    sku: "PR-abs-20250921-001",
    stripePriceId: "price_1S9oroBB8R6OUfKVFDwtadEl",
    thumbnail: "https://files.patternripple.com/tactical-pixel-camo-desert-taupe-thumb.jpg",
    exclusive: true,
    available: true,
    category: "abstract"
  },
  {
    slug: "painterly-woven-stripes-indigo",
    title: "Painterly Woven Stripes in Indigo",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-geo-20250921-010",
    stripePriceId: "price_1S9ppGBB8R6OUfKVTfctJrtG",
    thumbnail: "https://files.patternripple.com/painterly-woven-stripes-indigo-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "monochrome-labyrinth-geometric-pattern",
    title: "Monochrome Labyrinth Geometric Pattern",
    subtitle: "OP Art Collection",
    price: 125,
    sku: "PR-geo-20250921-001",
    stripePriceId: "price_1S9lZWBB8R6OUfKVC6pTDVfr",
    thumbnail: "https://files.patternripple.com/monochrome-labyrinth-geometric-pattern-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "pr-sea-20250919-002",
    title: "Autumn UFO Landing Faux Embroidery",
    subtitle: "Autumn Collection",
    price: 125,
    sku: "PR-sea-20250919-002",
    stripePriceId: "price_1S9F4UBB8R6OUfKV1SqJ3VWd",
    thumbnail: "https://files.patternripple.com/PR-sea-20250919-002-thumb.jpg",
    exclusive: true,
    available: true,
    category: "seasonal"
  },
  {
    slug: "mid-century-modern-stripes",
    title: "Mid-Century Modernist Stripes",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-geo-20250921-004",
    stripePriceId: "price_1S9o6MBB8R6OUfKVwq0mmUyi",
    thumbnail: "https://files.patternripple.com/mid-century-modern-stripes-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "pr-hor-20250919-001",
    title: "Impasto Skulls in Crimson",
    subtitle: "Horror Collection",
    price: 125,
    sku: "PR-hor-20250919-001",
    stripePriceId: "price_1S9FdNBB8R6OUfKVd4lb36fk",
    thumbnail: "https://files.patternripple.com/PR-hor-20250919-001-thumb.jpg",
    exclusive: true,
    available: true,
    category: "horror"
  },
  {
    slug: "pr-flo-20250919-007",
    title: "Vibrant Impasto Floral",
    subtitle: "Floral Collection",
    price: 125,
    sku: "PR-flo-20250919-007",
    stripePriceId: "price_1S9FzSBB8R6OUfKVq5fzIpQw",
    thumbnail: "https://files.patternripple.com/PR-flo-20250919-007-thumb.jpg",
    exclusive: true,
    available: true,
    category: "floral"
  },
  {
    slug: "pr-sea-20250919-001",
    title: "Winter Village Faux Embroidery on Navy",
    subtitle: "Christmas Collection",
    price: 125,
    sku: "PR-sea-20250919-001",
    stripePriceId: "price_1S9ELeBB8R6OUfKV0i5vtwZO",
    thumbnail: "https://files.patternripple.com/PR-sea-20250919-001-thumb.jpg",
    exclusive: true,
    available: true,
    category: "seasonal"
  },
  {
    slug: "vibrant-wildflower-faux-embroidery-rose",
    title: "Vibrant Wildflower Faux Embroidery",
    subtitle: "Dusty Rose Collection",
    price: 125,
    sku: "PR-flo-20250916-001",
    stripePriceId: "price_1S7wFfBB8R6OUfKVYDvR9B5T",
    thumbnail: "https://files.patternripple.com/PR-flo-20250916-001-thumb.jpg",
    exclusive: true,
    available: true,
    category: "faux-embroidery"
  },
  {
    slug: "pr-flo-20250918-001",
    title: "Gilded Floral Faux Embroidery on Emerald",
    subtitle: "Botanical Collection",
    price: 125,
    sku: "PR-flo-20250918-001",
    stripePriceId: "price_1S8q3ZBB8R6OUfKVMNkqQFb7",
    thumbnail: "https://files.patternripple.com/PR-flo-20250918-001-thumb.jpg",
    exclusive: true,
    available: true,
    category: "faux-embroidery"
  },
  {
    slug: "carved-stone-architectural-grid-neutral",
    title: "Carved Stone Architectural Grid",
    subtitle: "Architecture Collection",
    price: 125,
    sku: "PR-arc-20250921-001",
    stripePriceId: "price_1S9maXBB8R6OUfKV4YShXYMt",
    thumbnail: "https://files.patternripple.com/carved-stone-architectural-grid-neutral-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  }
];

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const availableCount = useMemo(
    () => products.filter((p) => p.available).length,
    []
  );

  const siteTitle = "PatternRipple - Indie Games, Creative Tools, and Exclusive Patterns";
  const siteDescription =
    "PatternRipple is shifting focus to indie games and creative tools. Explore the Lab for free utilities and prototypes, play our games, and shop remaining exclusive patterns until they sell out.";

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.patternripple.com/",
    "name": "PatternRipple",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.patternripple.com/search?q={query}",
      "query-input": "required name=query"
    }
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PatternRipple",
    "url": "https://www.patternripple.com/",
    "logo": "https://www.patternripple.com/icon-512.png",
    "sameAs": [
      "https://heylink.me/nickpanek/"
    ]
  };

  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://www.patternripple.com/p/${p.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <link rel="canonical" href="https://www.patternripple.com/" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.patternripple.com/" />
        <meta property="og:image" content="https://www.patternripple.com/og-cover.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
        />
      </Head>

      {/* Hero */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link href="/" className="inline-block" aria-label="PatternRipple home">
            <h1 className="text-5xl font-thin tracking-wide text-gray-900 mb-4">PatternRipple</h1>
          </Link>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We are moving into indie games and creative tools. The remaining exclusive patterns stay listed until sold.
            <span className="block mt-2 text-purple-700 font-medium">
              Tools and Assets. Free and Paid.
            </span>
          </p>
        </div>
      </header>

      {/* Top Nav */}
      <nav
        className="bg-white/50 backdrop-blur-sm border-b border-gray-100 sticky top-14 z-40"
        aria-label="Primary"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <Link href="/lab" className="text-gray-700 hover:text-purple-600 font-medium px-3">
              Lab
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/games" className="text-gray-700 hover:text-purple-600 font-medium px-3">
              Games
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium px-3">
              About
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/blog" className="text-gray-700 hover:text-purple-600 font-medium px-3">
              Blog
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/collections" className="text-gray-700 hover:text-purple-600 font-medium px-3">
              Collections
            </Link>
          </div>
        </div>
      </nav>

      {/* Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center gap-8 text-sm">
          <span>✨ {availableCount} Exclusive Patterns Available</span>
          <span>🧪 Visit the Lab for free tools and prototypes</span>
          <span>🎮 New games in development</span>
        </div>
      </div>

      {/* Intro before products */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900">
            From Patterns to Play and Tools
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            PatternRipple is pivoting to ship indie games and practical creation tools. The Lab hosts our free utilities,
            experiments, and previews, including the tile checker and more. If you came for patterns, the catalog below
            shows what is left. Once a pattern sells, it is gone.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/lab"
              className="inline-block bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Explore the Lab
            </Link>
            <Link
              href="/games"
              className="inline-block bg-white border border-gray-300 text-gray-900 px-5 py-3 rounded-lg hover:border-purple-500 hover:text-purple-700 transition-colors"
            >
              See Games
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="sr-only">Exclusive Pattern Catalog</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <article
              key={product.sku}
              className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                hoveredCard === product.sku
                  ? "shadow-2xl -translate-y-1 ring-4 ring-purple-400"
                  : "shadow-lg ring-4 ring-amber-400"
              }`}
              onMouseEnter={() => setHoveredCard(product.sku)}
              onMouseLeave={() => setHoveredCard(null)}
              itemScope
              itemType="https://schema.org/Product"
            >
              {product.exclusive && (
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold py-2 text-center tracking-wider">
                  EXCLUSIVE PATTERN
                </div>
              )}

              <div className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={`${product.title} - ${product.subtitle}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-light text-gray-900 mb-2" itemProp="name">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4" itemProp="category">
                  {product.subtitle}
                </p>

                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
                  <span className="text-2xl font-light" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="USD" />
                    <span itemProp="price">${product.price}</span>
                  </span>
                  <span
                    className={`text-sm ${product.available ? "text-green-700" : "text-gray-500"}`}
                    aria-label={product.available ? "Available" : "Sold"}
                  >
                    {product.available ? "Available" : "Sold"}
                  </span>
                </div>

                <Link
                  href={`/p/${product.slug}`}
                  className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300"
                  title={`${product.title} details`}
                >
                  View Pattern
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">PatternRipple</h3>
              <p className="text-sm">
                Indie games and creative tools, plus a sell-down of exclusive patterns.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/lab" className="hover:text-white">Lab</Link></li>
                <li><Link href="/games" className="hover:text-white">Games</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/collections" className="hover:text-white">Collections</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><a href="mailto:nick@patternripple.com" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/licenses" className="hover:text-white">License Agreement</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 PatternRipple. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
