import { allProducts, categories, type CatalogProduct } from "@/lib/data";

const galleryImages = [
  "/images/editorial/left.jpg",
  "/images/editorial/right.jpg",
  "/images/editorial/top.jpg",
  "/images/editorial/bottom.jpg",
];

const colorSets: Record<string, string[]> = {
  "T-Shirts": ["Black", "White", "Charcoal", "Olive"],
  Shirts: ["White", "Sky Blue", "Navy", "Pink"],
  Pants: ["Black", "Khaki", "Navy", "Grey"],
  Lower: ["Black", "Brown", "Tan", "Silver"],
};

export type ProductReview = {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
};

export type ProductDetail = CatalogProduct & {
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: string[];
  description: string;
  highlights: string[];
  specifications: { label: string; value: string }[];
  reviews: ProductReview[];
  inStock: boolean;
  deliveryDays: string;
  categorySlug: string;
};

function seed(id: number, max: number) {
  return ((id * 9301 + 49297) % 233280) % max;
}

const reviewPool: Omit<ProductReview, "id">[] = [
  {
    name: "Arjun M.",
    rating: 5,
    date: "12 Jan 2026",
    text: "Fabric quality is excellent. True to size and looks premium in person.",
    verified: true,
  },
  {
    name: "Rahul K.",
    rating: 4,
    date: "28 Dec 2025",
    text: "Great fit and finish. Delivery was fast. Would buy again from GILZOD.",
    verified: true,
  },
  {
    name: "Dev S.",
    rating: 5,
    date: "05 Nov 2025",
    text: "Minimal design with luxury feel. Packaging was also very premium.",
    verified: true,
  },
  {
    name: "Karan P.",
    rating: 4,
    date: "18 Oct 2025",
    text: "Comfortable for all-day wear. Color and stitching are on point.",
    verified: false,
  },
];

export function getProductById(id: number): CatalogProduct | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductDetail(id: number): ProductDetail | null {
  const product = getProductById(id);
  if (!product) return null;

  const mrp = Math.round(product.price * (1.25 + (seed(id, 3) * 0.05)));
  const discount = Math.max(5, Math.round(((mrp - product.price) / mrp) * 100));
  const offset = seed(id, galleryImages.length);
  const images = Array.from(
    new Set([
      product.image,
      galleryImages[offset],
      galleryImages[(offset + 1) % galleryImages.length],
      galleryImages[(offset + 2) % galleryImages.length],
    ])
  );

  const categorySlug =
    categories.find((c) => c.title === product.category)?.id ?? "collection";

  const material =
    product.category === "Lower"
      ? "Premium Leather / Metal"
      : product.category === "Pants"
        ? "Stretch Cotton Blend"
        : product.category === "Shirts"
          ? "Breathable Cotton Poplin"
          : "100% Premium Cotton";

  return {
    ...product,
    mrp,
    discount,
    rating: 4.1 + (seed(id, 8) * 0.1),
    reviewCount: 120 + seed(id, 880),
    images,
    colors: colorSets[product.category] ?? ["Black", "White", "Grey"],
    description: `${product.name} is crafted for the modern man who values understated luxury. Designed by GILZOD with premium materials, refined tailoring, and everyday comfort. Perfect for both casual and elevated looks — a wardrobe essential built to last.`,
    highlights: [
      "Premium GILZOD quality with durable stitching",
      "Comfort-first fabric for all-day wear",
      "True-to-size fit with modern silhouette",
      "Easy 7-day return & exchange policy",
      "Secure packaging with authenticity tag",
    ],
    specifications: [
      { label: "Brand", value: "GILZOD" },
      { label: "Category", value: product.category },
      { label: "Material", value: material },
      { label: "Fit", value: product.category === "T-Shirts" ? "Oversized / Relaxed" : "Regular / Slim" },
      { label: "Care", value: "Machine wash cold, do not bleach" },
      { label: "Country of Origin", value: "India" },
      { label: "Ideal For", value: "Men" },
      { label: "Pattern", value: "Solid" },
    ],
    reviews: reviewPool.map((r, i) => ({ ...r, id: id * 10 + i })),
    inStock: true,
    deliveryDays: `${3 + seed(id, 4)}-${5 + seed(id, 3)} business days`,
    categorySlug,
  };
}

export function getRelatedProducts(id: number, limit = 4): CatalogProduct[] {
  const product = getProductById(id);
  if (!product) return [];
  return allProducts.filter((p) => p.category === product.category && p.id !== id).slice(0, limit);
}

export function getAllProductIds(): number[] {
  return allProducts.map((p) => p.id);
}
