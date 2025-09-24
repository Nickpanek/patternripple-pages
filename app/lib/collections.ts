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
  const preferred = items.find((p) => p.available && typeof p.thumbnail === "string" && p.thumbnail.length > 0);
  if (preferred?.thumbnail) return preferred.thumbnail;

  const anyThumb = items.find((p) => typeof p.thumbnail === "string" && p.thumbnail.length > 0);
  if (anyThumb?.thumbnail) return anyThumb.thumbnail;

  return defaultThumb;
}
