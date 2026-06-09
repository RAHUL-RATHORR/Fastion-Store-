"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Heart,
  MapPin,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import type { ProductDetail } from "@/lib/product-details";
import { getRelatedProducts } from "@/lib/product-details";
import { sizes } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";

type ProductDetailPageProps = {
  product: ProductDetail;
};

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const iconClass = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            iconClass,
            i < Math.floor(rating) ? "fill-[#fbbf24] text-[#fbbf24]" : "text-[#3f3f46]"
          )}
        />
      ))}
    </div>
  );
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, openSizeGuide } = useUI();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  const related = getRelatedProducts(product.id);
  const isWishlisted = wishlist.includes(product.id);
  const savings = product.mrp - product.price;

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const checkDelivery = () => {
    if (pincode.length === 6) setDeliveryChecked(true);
  };

  return (
    <div className="min-h-screen-safe bg-[#050505] pb-20">
      <Container className="pt-[calc(5rem+env(safe-area-inset-top))] pb-6">
        <nav className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-[#71717a] mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.categorySlug}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#a1a1aa] line-clamp-1">{product.name}</span>
        </nav>

        <Link
          href={`/category/${product.categorySlug}`}
          className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-white text-xs uppercase tracking-[0.15em] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {product.category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/5] sm:aspect-square bg-[#111111] overflow-hidden silver-border mb-3">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.15em] bg-[#e5e5e5] text-[#050505] px-3 py-1.5 font-medium">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative aspect-square overflow-hidden border transition-all",
                    activeImage === i
                      ? "border-[#e5e5e5] ring-1 ring-[#e5e5e5]"
                      : "border-[rgba(192,192,192,0.15)] hover:border-[#c0c0c0]"
                  )}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#a1a1aa] mb-2">GILZOD</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex items-center gap-2 bg-[#1a3d2e] border border-[#2d6a4f] px-3 py-1.5 rounded-sm">
                <span className="text-white text-sm font-medium">{product.rating.toFixed(1)}</span>
                <StarRating rating={product.rating} />
              </div>
              <span className="text-[#a1a1aa] text-sm">
                {product.reviewCount.toLocaleString()} ratings &amp; {Math.floor(product.reviewCount / 4)} reviews
              </span>
            </div>

            <div className="bg-[#0d0d0d] border border-[rgba(192,192,192,0.1)] p-5 sm:p-6 mb-6">
              <div className="flex flex-wrap items-end gap-3 mb-2">
                <span className="text-3xl sm:text-4xl text-white font-light">{formatPrice(product.price)}</span>
                <span className="text-[#71717a] text-lg line-through">{formatPrice(product.mrp)}</span>
                <span className="text-[#6ee7b7] text-sm font-medium">{product.discount}% off</span>
              </div>
              <p className="text-[#a1a1aa] text-xs sm:text-sm">
                You save {formatPrice(savings)} (incl. of all taxes)
              </p>
              {product.inStock && (
                <p className="text-[#6ee7b7] text-xs mt-2 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> In stock
                </p>
              )}
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa] mb-3">
                Color — <span className="text-white">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 py-2 text-xs border transition-colors",
                      selectedColor === color
                        ? "border-[#e5e5e5] text-white bg-[#111111]"
                        : "border-[rgba(192,192,192,0.2)] text-[#a1a1aa] hover:border-[#c0c0c0]"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa]">
                  Size — <span className="text-white">{selectedSize}</span>
                </p>
                <button
                  onClick={openSizeGuide}
                  className="text-[10px] uppercase tracking-[0.15em] text-[#c0c0c0] hover:text-white transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-11 h-11 text-xs border transition-colors",
                      selectedSize === size
                        ? "border-[#e5e5e5] text-white bg-[#111111]"
                        : "border-[rgba(192,192,192,0.2)] text-[#a1a1aa] hover:border-[#c0c0c0]"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa] mb-3">Quantity</p>
              <div className="inline-flex items-center border border-[rgba(192,192,192,0.2)]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-white text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-[#0d0d0d] border border-[rgba(192,192,192,0.1)] p-4 sm:p-5 mb-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa] mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Delivery Options
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ""));
                    setDeliveryChecked(false);
                  }}
                  placeholder="Enter pincode"
                  className="flex-1 bg-[#111111] border border-[rgba(192,192,192,0.12)] px-4 py-2.5 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#c0c0c0]"
                />
                <button
                  onClick={checkDelivery}
                  className="px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] border border-[rgba(192,192,192,0.3)] text-white hover:border-[#c0c0c0] transition-colors"
                >
                  Check
                </button>
              </div>
              {deliveryChecked && (
                <p className="text-[#6ee7b7] text-xs mt-3 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  Delivery in {product.deliveryDays} to pincode {pincode}
                </p>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
              {[
                { icon: Truck, label: "Free Delivery", sub: "Orders above $300" },
                { icon: Shield, label: "7-Day Returns", sub: "Easy exchange" },
                { icon: Zap, label: "Genuine Product", sub: "100% authentic" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="bg-[#0d0d0d] border border-[rgba(192,192,192,0.08)] p-3 text-center"
                >
                  <Icon className="w-4 h-4 text-[#c0c0c0] mx-auto mb-1.5" />
                  <p className="text-[9px] sm:text-[10px] text-white uppercase tracking-wide">{label}</p>
                  <p className="text-[8px] sm:text-[9px] text-[#71717a] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 sm:static bg-[#050505] sm:bg-transparent py-3 sm:py-0 -mx-4 px-4 sm:mx-0 sm:px-0 border-t sm:border-0 border-[rgba(192,192,192,0.08)]">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart
                  className={cn(
                    "w-4 h-4 mr-2",
                    isWishlisted ? "fill-[#e5e5e5] text-[#e5e5e5]" : ""
                  )}
                />
                Wishlist
              </Button>
              <Button variant="secondary" className="flex-1" onClick={handleAddToCart}>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="primary" className="flex-1 sm:flex-[1.2]" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 sm:mt-16 border-t border-[rgba(192,192,192,0.08)] pt-8">
          <div className="flex gap-1 sm:gap-2 border-b border-[rgba(192,192,192,0.08)] mb-8 overflow-x-auto">
            {(
              [
                { id: "description", label: "Description" },
                { id: "specs", label: "Specifications" },
                { id: "reviews", label: "Ratings & Reviews" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 sm:px-6 py-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] whitespace-nowrap border-b-2 -mb-px transition-colors",
                  activeTab === tab.id
                    ? "border-[#e5e5e5] text-white"
                    : "border-transparent text-[#71717a] hover:text-[#a1a1aa]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="max-w-3xl">
              <p className="text-[#a1a1aa] text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>
              <h3 className="text-white text-sm uppercase tracking-[0.15em] mb-4">Highlights</h3>
              <ul className="space-y-2">
                {product.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#a1a1aa] text-sm">
                    <Check className="w-4 h-4 text-[#6ee7b7] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl border border-[rgba(192,192,192,0.1)]">
              {product.specifications.map((spec, i) => (
                <div
                  key={spec.label}
                  className={cn(
                    "grid grid-cols-2 text-sm",
                    i % 2 === 0 ? "bg-[#0d0d0d]" : "bg-[#111111]"
                  )}
                >
                  <div className="px-4 py-3 text-[#71717a] border-r border-[rgba(192,192,192,0.08)]">
                    {spec.label}
                  </div>
                  <div className="px-4 py-3 text-white">{spec.value}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-6 mb-8 p-5 bg-[#0d0d0d] border border-[rgba(192,192,192,0.1)]">
                <div className="text-center">
                  <p className="text-4xl text-white font-light">{product.rating.toFixed(1)}</p>
                  <StarRating rating={product.rating} size="md" />
                  <p className="text-[#71717a] text-xs mt-1">{product.reviewCount} ratings</p>
                </div>
                <div className="flex-1 min-w-[200px] space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === 5 ? 72 : star === 4 ? 20 : star === 3 ? 5 : 2;
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="text-[#a1a1aa] w-8">{star} ★</span>
                        <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                          <div className="h-full bg-[#fbbf24] rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[#71717a] w-8">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-5">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-[rgba(192,192,192,0.08)] pb-5 last:border-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={review.rating} />
                      <span className="text-white text-sm font-medium">{review.name}</span>
                      {review.verified && (
                        <span className="text-[9px] uppercase tracking-wide text-[#6ee7b7] border border-[#2d6a4f] px-2 py-0.5">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="text-[#a1a1aa] text-sm leading-relaxed">{review.text}</p>
                    <p className="text-[#71717a] text-xs mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Similar products */}
        {related.length > 0 && (
          <div className="mt-14 sm:mt-20">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl text-white mb-6 sm:mb-8">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {related.map((item, index) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  category={item.category}
                  image={item.image}
                  index={index}
                  badge={item.badge}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
