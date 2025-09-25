// scripts/build-search-index.js
import fs from "fs";
import path from "path";
import MiniSearch from "minisearch";

const PRODUCTS_JSON = path.resolve("app/data/products.json");

const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON, "utf8")).map((p, i) => ({
  id: `product-${p.slug || i}`,
  type: "product",
  title: p.title,
  subtitle: p.subtitle,
  url: `/p/${p.slug}`,
  description: p.description || p.seoDescription || "",
  tags: p.tags || p.seo?.keywords?.split(",").map((s) => s.trim()) || [],
  category: p.category,
  sku: p.sku,
  thumb: p.thumbnail,
}));

const docs = [
  ...products,
  { id: "page-home", type: "page", title: "Home", url: "/" },
  { id: "page-collections", type: "page", title: "Collections", url: "/collections" },
];

const miniSearch = new MiniSearch({
  fields: ["title", "subtitle", "description", "tags", "category", "sku"],
  storeFields: ["id", "type", "title", "subtitle", "url", "thumb"],
});

miniSearch.addAll(docs);

fs.mkdirSync("public/search", { recursive: true });
fs.writeFileSync("public/search/index.json", JSON.stringify(miniSearch.toJSON()));
fs.writeFileSync("public/search/docs.json", JSON.stringify(docs));
