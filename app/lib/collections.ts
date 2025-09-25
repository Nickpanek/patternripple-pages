// app/lib/collections.ts

// ---------- Product helpers (unchanged core behavior) ----------
export type Product = {
  slug: string;
  sku: string;
  title: string;
  subtitle?: string;
  price: number;
  thumbnail?: string;
  exclusive?: boolean;
  available?: boolean;
  category: string | string[];
  [key: string]: unknown;
};

function hasCategory(cat: Product["category"], key: string): boolean {
  if (!cat) return false;
  if (Array.isArray(cat)) return cat.includes(key);
  return cat === key;
}

export function inCollection(p: Product, key: string): boolean {
  return hasCategory(p.category, key);
}

export function filterByCollection<T extends Product>(list: T[] = [], key: string): T[] {
  return list.filter((p) => inCollection(p, key));
}

export function countAvailable<T extends Product>(list: T[] = [], key: string): number {
  return filterByCollection(list, key).filter((p) => Boolean(p.available)).length;
}

export function pickCoverSrc<T extends Product>(items: T[] = [], defaultThumb: string): string {
  const preferred = items.find(
    (p) => p.available && typeof p.thumbnail === "string" && p.thumbnail.length > 0
  );
  if (preferred?.thumbnail) return preferred.thumbnail;

  const anyThumb = items.find((p) => typeof p.thumbnail === "string" && p.thumbnail.length > 0);
  if (anyThumb?.thumbnail) return anyThumb.thumbnail;

  return defaultThumb;
}

// ---------- Collection metadata (covers you just created) ----------
export type CollectionKey =
  | "abstract"
  | "camo"
  | "faux-embroidery"
  | "geometric"
  | "horror"
  | "seasonal"
  | "impasto"
  | "ufo-cryptids"
  | "patchwork-quilt"
  | "preppy-posh"
  | "old-west"
  | "groovy-psychedelic"
  | "architecture"
  | "cute-animals"
  | "usa-patriotic";

export type CollectionMeta = {
  key: CollectionKey;
  name: string;
  // path to placeholder in /public or a full URL
  cover: string;
  // optional pretty path if you diverge from /collections/[key]
  href?: string;
};

export const collections: CollectionMeta[] = [
  { key: "abstract",          name: "Abstract",             cover: "/abstractcollectionthumb.png" },
  { key: "camo",              name: "Camo",                 cover: "/camocollectionthumb.png" },
  { key: "faux-embroidery",   name: "Faux Embroidery",      cover: "/fauxcollectionthumb.png" },
  { key: "geometric",         name: "Geometric",            cover: "/geometriccollectionthumb.png" },
  { key: "horror",            name: "Horror",               cover: "/horrorcollectionthumb.png" },
  { key: "seasonal",          name: "Seasonal",             cover: "/seasonalcollectionthumb.png" },
  { key: "impasto",           name: "Impasto",              cover: "/impastocollectionthumb.png" },
  { key: "ufo-cryptids",      name: "UFO & Cryptids",       cover: "/ufocollectionthumb.png" },
  { key: "patchwork-quilt",   name: "Patchwork Quilt",      cover: "/patchcollectionthumb.png" },
  { key: "preppy-posh",       name: "Preppy & Posh",        cover: "/preppycollectionthumb.png" },
  { key: "old-west",          name: "Old West",             cover: "/westerncollectionthumb.png" },
  { key: "groovy-psychedelic",name: "Groovy & Psychedelic", cover: "/groovycollectionthumb.png" },
  { key: "architecture",      name: "Architecture",         cover: "/architecturecollectionthumb.png" },
  { key: "cute-animals",      name: "Cute Animals",         cover: "/animalscollectionthumb.png" },
  { key: "usa-patriotic",     name: "USA Patriotic",        cover: "/usacollectionthumb.png" },
];

// quick lookup by key
const collectionByKey = new Map(collections.map((c) => [c.key, c]));

/**
 * Get metadata for a collection key.
 */
export function getCollectionMeta(key: CollectionKey): CollectionMeta | undefined {
  return collectionByKey.get(key);
}

/**
 * Choose a cover for a collection:
 * - prefer a real product thumbnail in that collection
 * - fallback to the placeholder cover image from metadata
 */
export function pickCollectionCover<T extends Product>(
  list: T[],
  key: CollectionKey
): string {
  const meta = getCollectionMeta(key);
  const fallback = meta?.cover ?? "/placeholder.png";
  const items = filterByCollection(list, key);
  return pickCoverSrc(items, fallback);
}

/**
 * Utility to build the href to a collection page.
 */
export function collectionHref(key: CollectionKey): string {
  const meta = getCollectionMeta(key);
  return meta?.href ?? `/collections/${key}`;
}
