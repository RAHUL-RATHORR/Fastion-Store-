export const heroVideo = {
  /** Local first — replace public/videos/hero.mp4 with your own luxury clip */
  sources: [
    "/videos/hero.mp4",
    "https://cdn.coverr.co/videos/coverr-man-adjusting-his-suit-jacket-5694/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-fashion-model-walking-on-the-street-4296/1080p.mp4",
  ],
  poster: "/images/editorial/top.jpg",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Collection", href: "#collection" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
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
  "Accessories",
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
    id: "accessories",
    title: "Accessories",
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
    category: "Accessories",
    image: "/images/editorial/top.jpg",
    badge: "New" as const,
    pairWith: 4,
  },
  {
    id: 8,
    name: "Premium Leather Belt",
    price: 99,
    category: "Accessories",
    image: "/images/editorial/top.jpg",
    pairWith: 5,
  },
] as const;

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
    title: "Luxury Comfort",
    description:
      "Engineered for all-day wear without compromising on sophistication.",
    icon: "sparkles" as const,
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
    { label: "T-Shirts", href: "#collection" },
    { label: "Shirts", href: "#collection" },
    { label: "Pants", href: "#collection" },
    { label: "Accessories", href: "#collection" },
  ],
  support: [
    { label: "Contact Us", href: "#contact" },
    { label: "Track Order", href: "/track-order" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Size Guide", href: "#" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
} as const;
