// app/data/products.ts
import data from "./products.json";

export type Product = {
  slug: string;
  sku: string;
  title: string;
  subtitle: string;
  price: number;
  stripePriceId: string;
  category: string;
  thumbnail: string;
  exclusive: boolean;
  available: boolean;
};

export const products = data as Product[];
export default products;
