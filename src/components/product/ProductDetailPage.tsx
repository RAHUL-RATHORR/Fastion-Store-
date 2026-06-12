"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { useCheckoutGate } from "@/hooks/useCheckoutGate";

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
            i < Math.floor(rating) ? "fill-[#f59e0b] text-[#f59e0b]" : "text-[#e5e5e5]"
          )}
        />
      ))}
    </div>
  );
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const { goToCheckout } = useCheckoutGate();
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
  const cartQty = getQuantity(product.id, selectedSize);

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (cartQty === 0) {
      addToCart(product.id, selectedSize, quantity);
    }
    goToCheckout();
  };

  const checkDelivery = () => {
    if (pincode.length === 6) setDeliveryChecked(true);
  };

  const optionBtn =
    "px-4 py-2 text-xs border transition-colors";
  const optionActive = "border-[#111111] text-white bg-[#111111]";
  const optionIdle = "border-[#e5e5e5] text-[#666666] hover:border-[#111111] hover:text-[#111111]";

  return (
    <div className="min-h-screen-safe bg-white pb-20">
      <Container className="pt-[calc(5rem+env(safe-area-inset-top))] pb-6">
        <nav className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-[#888888] mb-6">
          <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.categorySlug}`} className="hover:text-[#111111] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#666666] line-clamp-1">{product.name}</span>
        </nav>

        <Link
          href={`/category/${product.categorySlug}`}
          className="inline-flex items-center gap-2 text-[#666666] hover:text-[#111111] text-xs uppercase tracking-[0.15em] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {product.category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          <div>
            <div className="relative aspect-[4/5] sm:aspect-square bg-[#f4f4f4] overflow-hidden border border-[#e5e5e5] mb-3">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.15em] bg-[#111111] text-white px-3 py-1.5 font-medium">
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
                    "relative aspect-square overflow-hidden border transition-all bg-[#f4f4f4]",
                    activeImage === i
                      ? "border-[#111111] ring-1 ring-[#111111]"
                      : "border-[#e5e5e5] hover:border-[#999999]"
                  )}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#888888] mb-2">GILZOD</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-[#111111] leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] px-3 py-1.5 rounded-sm">
                <span className="text-[#111111] text-sm font-semibold">{product.rating.toFixed(1)}</span>
                <StarRating rating={product.rating} />
              </div>
              <span className="text-[#666666] text-sm">
                {product.reviewCount.toLocaleString()} ratings &amp; {Math.floor(product.reviewCount / 4)} reviews
              </span>
            </div>

            <div className="bg-[#fafafa] border border-[#e5e5e5] p-5 sm:p-6 mb-6">
              <div className="flex flex-wrap items-end gap-3 mb-2">
                <span className="text-3xl sm:text-4xl text-[#111111] font-semibold">{formatPrice(product.price)}</span>
                <span className="text-[#999999] text-lg line-through">{formatPrice(product.mrp)}</span>
                <span className="text-[#15803d] text-sm font-semibold">{product.discount}% off</span>
              </div>
              <p className="text-[#666666] text-xs sm:text-sm">
                You save {formatPrice(savings)} (incl. of all taxes)
              </p>
              {product.inStock && (
                <p className="text-[#15803d] text-xs mt-2 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> In stock
                </p>
              )}
            </div>

            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-3">
                Color — <span className="text-[#111111]">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(optionBtn, selectedColor === color ? optionActive : optionIdle)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888]">
                  Size — <span className="text-[#111111]">{selectedSize}</span>
                </p>
                <button
                  onClick={openSizeGuide}
                  className="text-[10px] uppercase tracking-[0.15em] text-[#666666] hover:text-[#111111] transition-colors"
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
                      selectedSize === size ? optionActive : optionIdle
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-3">Quantity</p>
              <div className="inline-flex items-center border border-[#e5e5e5]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#111111] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-[#111111] text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#111111] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-[#fafafa] border border-[#e5e5e5] p-4 sm:p-5 mb-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-3 flex items-center gap-2">
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
                  className="flex-1 bg-white border border-[#e5e5e5] px-4 py-2.5 text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111]"
                />
                <button
                  onClick={checkDelivery}
                  className="px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                >
                  Check
                </button>
              </div>
              {deliveryChecked && (
                <p className="text-[#15803d] text-xs mt-3 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  Delivery in {product.deliveryDays} to pincode {pincode}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
              {[
                { icon: Truck, label: "Free Delivery", sub: "Orders above ₹999" },
                { icon: Shield, label: "7-Day Returns", sub: "Easy exchange" },
                { icon: Zap, label: "Genuine Product", sub: "100% authentic" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="bg-white border border-[#e5e5e5] p-3 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                >
                  <Icon className="w-4 h-4 text-[#111111] mx-auto mb-1.5" />
                  <p className="text-[9px] sm:text-[10px] text-[#111111] uppercase tracking-wide font-medium">{label}</p>
                  <p className="text-[8px] sm:text-[9px] text-[#888888] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 sm:static bg-white sm:bg-transparent py-3 sm:py-0 -mx-4 px-4 sm:mx-0 sm:px-0 border-t sm:border-0 border-[#e5e5e5]">
              <Button
                variant="secondary"
                className="flex-1 border-[#e5e5e5] text-[#111111]"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart
                  className={cn(
                    "w-4 h-4 mr-2",
                    isWishlisted ? "fill-[#e53935] text-[#e53935]" : ""
                  )}
                />
                {isWishlisted ? "Saved" : "Wishlist"}
              </Button>
              {cartQty > 0 ? (
                <div className="flex-1 inline-flex items-center justify-center border border-[#e5e5e5] min-h-[44px] bg-[#fafafa]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, selectedSize, cartQty - 1)}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#111111]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm text-[#111111] font-semibold">{cartQty}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, selectedSize, cartQty + 1)}
                    disabled={cartQty >= 10}
                    aria-label="Increase quantity"
                    className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#111111] disabled:opacity-40"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Button
                  variant="secondary"
                  className="flex-1 border-[#e5e5e5] text-[#111111]"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              )}
              <Button variant="primary" className="flex-1 sm:flex-[1.2] bg-[#111111] text-white hover:bg-[#333333]" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 border-t border-[#e5e5e5] pt-8">
          <div className="flex gap-1 sm:gap-2 border-b border-[#e5e5e5] mb-8 overflow-x-auto">
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
                    ? "border-[#111111] text-[#111111] font-semibold"
                    : "border-transparent text-[#888888] hover:text-[#111111]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="max-w-3xl">
              <p className="text-[#666666] text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>
              <h3 className="text-[#111111] text-sm uppercase tracking-[0.15em] mb-4 font-semibold">Highlights</h3>
              <ul className="space-y-2">
                {product.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#666666] text-sm">
                    <Check className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl border border-[#e5e5e5] overflow-hidden">
              {product.specifications.map((spec, i) => (
                <div
                  key={spec.label}
                  className={cn(
                    "grid grid-cols-2 text-sm",
                    i % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
                  )}
                >
                  <div className="px-4 py-3 text-[#888888] border-r border-[#e5e5e5]">
                    {spec.label}
                  </div>
                  <div className="px-4 py-3 text-[#111111]">{spec.value}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-6 mb-8 p-5 bg-[#fafafa] border border-[#e5e5e5]">
                <div className="text-center">
                  <p className="text-4xl text-[#111111] font-semibold">{product.rating.toFixed(1)}</p>
                  <StarRating rating={product.rating} size="md" />
                  <p className="text-[#888888] text-xs mt-1">{product.reviewCount} ratings</p>
                </div>
                <div className="flex-1 min-w-[200px] space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === 5 ? 72 : star === 4 ? 20 : star === 3 ? 5 : 2;
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="text-[#666666] w-8">{star} ★</span>
                        <div className="flex-1 h-1.5 bg-[#e5e5e5] rounded-full overflow-hidden">
                          <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[#888888] w-8">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-5">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-[#e5e5e5] pb-5 last:border-0"
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <StarRating rating={review.rating} />
                      <span className="text-[#111111] text-sm font-medium">{review.name}</span>
                      {review.verified && (
                        <span className="text-[9px] uppercase tracking-wide text-[#15803d] border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-0.5">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="text-[#666666] text-sm leading-relaxed">{review.text}</p>
                    <p className="text-[#999999] text-xs mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-14 sm:mt-20">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl text-[#111111] mb-6 sm:mb-8">
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
