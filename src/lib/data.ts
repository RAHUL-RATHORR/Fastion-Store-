export const heroSlides = [
  {
    id: 1,
    image: "/images/hero/hero-shirts.jpg",
    tag: "Limited Time Offer",
    title: "Summer Shirts",
    subtitle: "Linen & cotton essentials for the season",
    discount: "50",
    discountLabel: "Up to",
    href: "/category/shirts",
    gradient: "linear-gradient(135deg, #9B1B1B 0%, #6E1212 45%, #3D0A0A 100%)",
    accent: "#F5C518",
    badgeBg: "#C41E1E",
  },
  {
    id: 2,
    image: "/images/hero/hero-tshirts.jpg",
    tag: "New Drop",
    title: "Premium Tees",
    subtitle: "Oversized fits & everyday classics",
    discount: "40",
    discountLabel: "Flat",
    href: "/category/t-shirts",
    gradient: "linear-gradient(135deg, #0F2B5B 0%, #0A1F42 50%, #061428 100%)",
    accent: "#4FC3F7",
    badgeBg: "#1565C0",
  },
  {
    id: 3,
    image: "/images/hero/hero-jeans.jpg",
    tag: "Trending Now",
    title: "Denim Edit",
    subtitle: "Relaxed jeans & street-ready fits",
    discount: "50",
    discountLabel: "Up to",
    href: "/category/pants",
    gradient: "linear-gradient(135deg, #1A4D6E 0%, #123550 50%, #0A2235 100%)",
    accent: "#81D4FA",
    badgeBg: "#0277BD",
  },
  {
    id: 4,
    image: "/images/hero/hero-pants.jpg",
    tag: "Hot Pick",
    title: "Casual Pants",
    subtitle: "Chinos & summer fits for every day",
    discount: "30",
    discountLabel: "Get",
    href: "/category/pants",
    gradient: "linear-gradient(135deg, #2D5A27 0%, #1E3D1A 50%, #122610 100%)",
    accent: "#A5D6A7",
    badgeBg: "#2E7D32",
  },
  {
    id: 5,
    image: "/images/hero/hero-lower.jpg",
    tag: "Weekend Special",
    title: "Street Collection",
    subtitle: "Tees, cargos & weekend essentials",
    discount: "50",
    discountLabel: "Up to",
    href: "/category/lower",
    gradient: "linear-gradient(135deg, #8B4513 0%, #6B3410 50%, #4A2409 100%)",
    accent: "#FFCC80",
    badgeBg: "#E65100",
  },
] as const;

export const heroBrand = {
  headline: "RULE BEYOND LIMITS",
  subline: "Premium Menswear Designed For Everyday Confidence",
  ctaLabel: "SHOP NOW",
  ctaHref: "#collection",
} as const;

export const brandStory = {
  eyebrow: "Brand Story",
  title: "Gilzod is more than clothing.",
  intro: "Built for individuals who refuse limits and choose confidence every day.",
  paragraphs: [
    "We started with a simple belief — the way you dress should match the way you live. Bold, intentional, and never ordinary.",
    "Every GILZOD piece is designed with premium fabrics, clean fits, and details that hold up season after season. From everyday essentials to statement pieces, our collection is made for men who lead, create, and move forward.",
    "This isn't fast fashion. It's menswear built for real life — workdays, weekends, and everything in between.",
  ],
  tagline: "RULE BEYOND LIMITS.",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/#collection" },
] as const;

export const editorialShowcase = {
  topBanner: {
    image: "/images/editorial/top.jpg",
    title: "GILZOD",
    subtitle: "Premium Menswear Collection",
    href: "#collection",
  },
  middleRow: {
    left: {
      image: "/images/editorial/left.jpg",
      alt: "Premium T-Shirts",
      href: "#collection",
    },
    center: {
      title: "Essential Luxury",
      subtitle: "Discover modern style built for ambition.",
      href: "#new-arrivals",
    },
    right: {
      image: "/images/editorial/right.jpg",
      alt: "Luxury Shirts",
      href: "#collection",
    },
  },
  bottomBanner: {
    image: "/images/editorial/bottom.jpg",
    title: "NEW SEASON",
    subtitle: "A new standard has just stepped in.",
    href: "#new-arrivals",
  },
} as const;

export const curatedLooks = [
  {
    id: 1,
    title: "Urban Edge",
    image: "/images/editorial/top.jpg",
    href: "#new-arrivals",
  },
  {
    id: 2,
    title: "Classic Essentials",
    image: "/images/editorial/left.jpg",
    href: "#collection",
  },
  {
    id: 3,
    title: "Statement Layer",
    image: "/images/editorial/right.jpg",
    href: "#new-arrivals",
  },
  {
    id: 4,
    title: "Tailored Motion",
    image: "/images/editorial/bottom.jpg",
    href: "#collection",
  },
  {
    id: 5,
    title: "Night Edit",
    image: "/images/editorial/top.jpg",
    href: "#new-arrivals",
  },
  {
    id: 6,
    title: "Weekend Luxe",
    image: "/images/editorial/right.jpg",
    href: "#collection",
  },
] as const;

export const marqueeItems = [
  "FREE SHIPPING WORLDWIDE",
  "NEW DROP LIVE",
  "RULE BEYOND LIMITS",
  "LIMITED EDITION",
  "PREMIUM MENSWEAR",
  "EXCLUSIVE ACCESS",
] as const;

export const socialProofStats = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 50, suffix: "+", label: "Premium Pieces" },
  { value: 4.9, suffix: "★", label: "Average Rating", decimal: true },
  { value: 15, suffix: "+", label: "Countries" },
] as const;

export const searchTrending = [
  "Oversized Tee",
  "New Drop",
  "Tailored Pants",
  "Lower",
  "Silk Shirt",
] as const;

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const sizeGuide = [
  { size: "S", chest: "36-38", waist: "30-32", length: "28" },
  { size: "M", chest: "38-40", waist: "32-34", length: "29" },
  { size: "L", chest: "40-42", waist: "34-36", length: "30" },
  { size: "XL", chest: "42-44", waist: "36-38", length: "31" },
] as const;

export const lookbookItems = [
  {
    id: 1,
    title: "Street Luxe",
    image: "/images/editorial/top.jpg",
    productId: 1,
  },
  {
    id: 2,
    title: "Office Ready",
    image: "/images/editorial/right.jpg",
    productId: 3,
  },
  {
    id: 3,
    title: "Weekend Edit",
    image: "/images/editorial/bottom.jpg",
    productId: 5,
  },
] as const;

export const reviews = [
  {
    id: 1,
    name: "Arjun M.",
    rating: 5,
    text: "The quality is insane. Feels like a brand worth 10x the price.",
  },
  {
    id: 2,
    name: "Rahul K.",
    rating: 5,
    text: "Perfect fit, premium fabric. Gilzod is my go-to for essentials.",
  },
  {
    id: 3,
    name: "Dev S.",
    rating: 5,
    text: "Minimal, bold, luxury. Exactly what modern menswear should be.",
  },
] as const;

export const pressLogos = ["VOGUE", "GQ", "ESQUIRE", "HYPEBEAST", "COMPLEX"] as const;

export const storeLocations = [
  { city: "Mumbai", address: "Bandra West, Linking Road", status: "Open" },
  { city: "Delhi", address: "Khan Market, Central Delhi", status: "Open" },
  { city: "Bangalore", address: "Indiranagar, 100 Feet Road", status: "Coming Soon" },
] as const;

export const dropEndDate = new Date("2026-06-15T23:59:59");

export const shopYourSizeBanner = {
  heading: "Shop Your Size",
  tagline: "Last chance!",
  offer: "Up to 30% Off*",
  image: "/images/promo-size-banner.jpg",
  href: "/#new-arrivals",
  bgColor: "#7EC8E3",
} as const;

export const featuredCategoryGrid = [
  { id: "shirts", label: "Shirts", image: "/images/categories/cat-shirts.png", href: "/category/shirts" },
  { id: "pants", label: "Trousers", image: "/images/categories/cat-trousers.png", href: "/category/pants" },
  { id: "polos", label: "Polos", image: "/images/categories/cat-polos.png", href: "/category/shirts" },
  { id: "denim", label: "Jeans", image: "/images/categories/cat-jeans.png", href: "/category/pants" },
  { id: "cargos", label: "Cargos", image: "/images/categories/cat-cargos.png", href: "/category/lower" },
  { id: "t-shirts", label: "T-Shirts", image: "/images/categories/cat-tshirts.png", href: "/category/t-shirts" },
] as const;

export const categories = [
  {
    id: "t-shirts",
    title: "T-Shirts",
    image: "/images/editorial/left.jpg",
  },
  {
    id: "shirts",
    title: "Shirts",
    image: "/images/editorial/right.jpg",
  },
  {
    id: "pants",
    title: "Pants",
    image: "/images/editorial/bottom.jpg",
  },
  {
    id: "lower",
    title: "Lower",
    image: "/images/editorial/top.jpg",
  },
] as const;

export const products = [
  {
    id: 1,
    name: "Signature Oversized Tee",
    price: 89,
    category: "T-Shirts",
    image: "/images/editorial/left.jpg",
    badge: "Bestseller" as const,
    pairWith: 5,
  },
  {
    id: 2,
    name: "Essential Cotton Tee",
    price: 69,
    category: "T-Shirts",
    image: "/images/editorial/left.jpg",
    badge: "New" as const,
    pairWith: 6,
  },
  {
    id: 3,
    name: "Oxford Dress Shirt",
    price: 149,
    category: "Shirts",
    image: "/images/editorial/right.jpg",
    badge: "New" as const,
    pairWith: 5,
  },
  {
    id: 4,
    name: "Silk Blend Shirt",
    price: 189,
    category: "Shirts",
    image: "/images/editorial/right.jpg",
    pairWith: 6,
  },
  {
    id: 5,
    name: "Tailored Wool Trousers",
    price: 219,
    category: "Pants",
    image: "/images/editorial/bottom.jpg",
    badge: "Bestseller" as const,
    pairWith: 3,
  },
  {
    id: 6,
    name: "Slim Fit Chinos",
    price: 159,
    category: "Pants",
    image: "/images/editorial/bottom.jpg",
    pairWith: 1,
  },
  {
    id: 7,
    name: "Leather Crossbody Bag",
    price: 249,
    category: "Lower",
    image: "/images/editorial/top.jpg",
    badge: "New" as const,
    pairWith: 4,
  },
  {
    id: 8,
    name: "Premium Leather Belt",
    price: 99,
    category: "Lower",
    image: "/images/editorial/top.jpg",
    pairWith: 5,
  },
] as const;

export type CatalogProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  badge?: "Bestseller" | "New";
};

export const categoryCatalog: Record<string, CatalogProduct[]> = {
  "t-shirts": [
    { id: 1, name: "Signature Oversized Tee", price: 89, category: "T-Shirts", image: "/images/editorial/left.jpg", badge: "Bestseller" },
    { id: 2, name: "Essential Cotton Tee", price: 69, category: "T-Shirts", image: "/images/editorial/left.jpg", badge: "New" },
    { id: 11, name: "Classic Crew Neck Tee", price: 59, category: "T-Shirts", image: "/images/editorial/left.jpg" },
    { id: 12, name: "Heavyweight Boxy Tee", price: 79, category: "T-Shirts", image: "/images/editorial/top.jpg" },
    { id: 13, name: "Vintage Wash Tee", price: 74, category: "T-Shirts", image: "/images/editorial/bottom.jpg", badge: "New" },
    { id: 14, name: "Minimal Logo Tee", price: 65, category: "T-Shirts", image: "/images/editorial/right.jpg" },
    { id: 15, name: "Ribbed Knit Tee", price: 85, category: "T-Shirts", image: "/images/editorial/left.jpg" },
    { id: 16, name: "Longline Drop Tee", price: 72, category: "T-Shirts", image: "/images/editorial/top.jpg" },
  ],
  shirts: [
    { id: 3, name: "Oxford Dress Shirt", price: 149, category: "Shirts", image: "/images/editorial/right.jpg", badge: "New" },
    { id: 4, name: "Silk Blend Shirt", price: 189, category: "Shirts", image: "/images/editorial/right.jpg" },
    { id: 21, name: "Linen Summer Shirt", price: 129, category: "Shirts", image: "/images/editorial/top.jpg", badge: "Bestseller" },
    { id: 22, name: "Slim Fit Formal Shirt", price: 139, category: "Shirts", image: "/images/editorial/right.jpg" },
    { id: 23, name: "Striped Club Shirt", price: 119, category: "Shirts", image: "/images/editorial/bottom.jpg" },
    { id: 24, name: "Denim Overshirt", price: 159, category: "Shirts", image: "/images/editorial/left.jpg", badge: "New" },
    { id: 25, name: "Textured Cuban Shirt", price: 134, category: "Shirts", image: "/images/editorial/top.jpg" },
    { id: 26, name: "Premium Poplin Shirt", price: 169, category: "Shirts", image: "/images/editorial/right.jpg" },
  ],
  pants: [
    { id: 5, name: "Tailored Wool Trousers", price: 219, category: "Pants", image: "/images/editorial/bottom.jpg", badge: "Bestseller" },
    { id: 6, name: "Slim Fit Chinos", price: 159, category: "Pants", image: "/images/editorial/bottom.jpg" },
    { id: 31, name: "Relaxed Cargo Pants", price: 149, category: "Pants", image: "/images/editorial/left.jpg", badge: "New" },
    { id: 32, name: "Pleated Dress Pants", price: 199, category: "Pants", image: "/images/editorial/right.jpg" },
    { id: 33, name: "Tapered Linen Pants", price: 139, category: "Pants", image: "/images/editorial/bottom.jpg" },
    { id: 34, name: "Straight Fit Denim", price: 129, category: "Pants", image: "/images/editorial/top.jpg" },
    { id: 35, name: "Utility Jogger Pants", price: 119, category: "Pants", image: "/images/editorial/left.jpg" },
    { id: 36, name: "Classic Wool Trousers", price: 209, category: "Pants", image: "/images/editorial/bottom.jpg", badge: "New" },
  ],
  lower: [
    { id: 7, name: "Leather Crossbody Bag", price: 249, category: "Lower", image: "/images/editorial/top.jpg", badge: "New" },
    { id: 8, name: "Premium Leather Belt", price: 99, category: "Lower", image: "/images/editorial/top.jpg" },
    { id: 41, name: "Minimalist Watch", price: 299, category: "Lower", image: "/images/editorial/right.jpg", badge: "Bestseller" },
    { id: 42, name: "Silver Chain Necklace", price: 149, category: "Lower", image: "/images/editorial/left.jpg" },
    { id: 43, name: "Aviator Sunglasses", price: 179, category: "Lower", image: "/images/editorial/top.jpg", badge: "New" },
    { id: 44, name: "Leather Card Holder", price: 79, category: "Lower", image: "/images/editorial/bottom.jpg" },
    { id: 45, name: "Wool Beanie", price: 59, category: "Lower", image: "/images/editorial/left.jpg" },
    { id: 46, name: "Signature Cap", price: 49, category: "Lower", image: "/images/editorial/right.jpg" },
  ],
};

const catalogById = new Map<number, CatalogProduct>();
for (const item of products) {
  catalogById.set(item.id, {
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category,
    image: item.image,
    ...("badge" in item && item.badge ? { badge: item.badge } : {}),
  });
}
for (const list of Object.values(categoryCatalog)) {
  for (const item of list) {
    catalogById.set(item.id, item);
  }
}

export const allProducts = [...catalogById.values()];

const productAlternateImages = [
  "/images/editorial/top.jpg",
  "/images/editorial/left.jpg",
  "/images/editorial/right.jpg",
  "/images/editorial/bottom.jpg",
  "/images/hero/hero-shirts.jpg",
  "/images/hero/hero-tshirts.jpg",
] as const;

export type ProductMeta = {
  hoverImage: string;
  rating: number;
  reviewCount: number;
  onSale: boolean;
  originalPrice?: number;
  saleLabel?: string;
};

export function getProductMeta(product: CatalogProduct): ProductMeta {
  const pool = productAlternateImages.filter((img) => img !== product.image);
  const hoverImage = pool[product.id % pool.length] ?? productAlternateImages[0];
  const rating = Math.round((4.1 + (product.id % 8) * 0.1) * 10) / 10;
  const reviewCount = 40 + (product.id * 17) % 960;
  const onSale = product.id % 3 === 0 || product.badge === "Bestseller";
  const originalPrice = onSale ? Math.round(product.price * 1.28) : undefined;

  return {
    hoverImage,
    rating,
    reviewCount,
    onSale,
    originalPrice,
    saleLabel: onSale ? "SALE" : undefined,
  };
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.id === slug);
}

export function getProductsByCategory(slug: string): CatalogProduct[] {
  return categoryCatalog[slug] ?? [];
}

export const whyGilzod = [
  {
    title: "Premium Quality",
    description:
      "Finest fabrics sourced globally, crafted with meticulous attention to detail.",
    icon: "gem" as const,
  },
  {
    title: "Timeless Design",
    description:
      "Clean silhouettes that transcend seasons and define modern luxury.",
    icon: "crown" as const,
  },
  {
    title: "Everyday Comfort",
    description:
      "Soft, breathable fabrics engineered for all-day wear without compromise.",
    icon: "comfort" as const,
  },
  {
    title: "Built To Last",
    description:
      "Durable construction designed to withstand the test of time.",
    icon: "shield" as const,
  },
] as const;

export const instagramPosts = [
  {
    id: 1,
    image: "/images/editorial/top.jpg",
    likes: "2.4k",
  },
  {
    id: 2,
    image: "/images/editorial/right.jpg",
    likes: "1.8k",
  },
  {
    id: 3,
    image: "/images/editorial/left.jpg",
    likes: "3.1k",
  },
  {
    id: 4,
    image: "/images/editorial/bottom.jpg",
    likes: "2.9k",
  },
  {
    id: 5,
    image: "/images/editorial/right.jpg",
    likes: "1.5k",
  },
  {
    id: 6,
    image: "/images/editorial/top.jpg",
    likes: "4.2k",
  },
] as const;

export const footerLinks = {
  brand: [
    { label: "About Gilzod", href: "#about" },
    { label: "Our Story", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  shop: [
    { label: "New Arrivals", href: "#new-arrivals" },
    { label: "T-Shirts", href: "/category/t-shirts" },
    { label: "Shirts", href: "/category/shirts" },
    { label: "Pants", href: "/category/pants" },
    { label: "Lower", href: "/category/lower" },
  ],
  support: [
    { label: "Contact Us", href: "#contact" },
    { label: "Track Order", href: "/track-order" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Size Guide", href: "#" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/gilzod_official/" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
} as const;

export const seoFooterLinkColumns = [
  {
    title: "Top Categories",
    links: [
      { label: "Shirts for Men", href: "/category/shirts" },
      { label: "T-Shirts for Men", href: "/category/t-shirts" },
      { label: "Formal Pants", href: "/category/pants" },
      { label: "Lower & Cargos", href: "/category/lower" },
      { label: "New Arrivals", href: "#new-arrivals" },
      { label: "Best Sellers", href: "#new-arrivals" },
    ],
  },
  {
    title: "Popular Searches",
    links: [
      { label: "White shirt for men", href: "/category/shirts" },
      { label: "Oversized t-shirt", href: "/category/t-shirts" },
      { label: "Slim fit trousers", href: "/category/pants" },
      { label: "Casual lower wear", href: "/category/lower" },
      { label: "Office wear shirts", href: "/category/shirts" },
      { label: "Weekend casual tees", href: "/category/t-shirts" },
    ],
  },
  {
    title: "Shop By Style",
    links: [
      { label: "Everyday Essentials", href: "#new-arrivals" },
      { label: "Smart Casual", href: "/category/shirts" },
      { label: "Street Style", href: "/category/t-shirts" },
      { label: "Workwear Pants", href: "/category/pants" },
      { label: "Relaxed Fit Lower", href: "/category/lower" },
      { label: "Curated Looks", href: "#collection" },
    ],
  },
] as const;

export const whyShopGilzodPoints = [
  "Premium fabrics built for all-day comfort",
  "Modern fits designed for the Indian man",
  "Trend-driven styles updated every season",
  "Easy returns and hassle-free exchanges",
  "Secure checkout with multiple payment options",
  "Pan-India delivery with pincode check",
] as const;

export const footerSocialIcons = [
  { label: "Facebook", href: "https://facebook.com", color: "#1877F2" },
  { label: "Instagram", href: "https://www.instagram.com/gilzod_official/", color: "#E4405F" },
  { label: "Snapchat", href: "https://snapchat.com", color: "#FFFC00" },
  { label: "X", href: "https://twitter.com", color: "#111111" },
] as const;

export const footerPaymentPartners = [
  "PhonePe",
  "GPay",
  "Amazon Pay",
  "Mastercard",
  "MobiKwik",
  "Paytm",
  "Cash on Delivery",
] as const;

export const footerShippingPartners = [
  "DTDC",
  "Delhivery",
  "Ecom Express",
  "XpressBees",
] as const;

export const whoWeAreContent = {
  intro:
    "GILZOD is a premium menswear brand built for ambitious men who refuse ordinary. From sharp shirts and effortless tees to tailored pants and versatile lower wear, every piece is designed to help you rule beyond limits — at work, on weekends, and everywhere in between.",
  links: [
    { label: "About Us", href: "#about" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Return & Exchange Policy", href: "#" },
    { label: "Contact Us", href: "#contact" },
    { label: "Track Order", href: "/track-order" },
  ],
} as const;
