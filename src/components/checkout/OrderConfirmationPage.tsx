"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Package, Truck } from "lucide-react";
import { getPlacedOrder, type PlacedOrder } from "@/lib/order";
import { formatPrice } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function OrderConfirmationPage() {
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(getPlacedOrder());
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="min-h-screen-safe bg-white" />;
  }

  if (!order) {
    return (
      <div className="min-h-screen-safe bg-white pt-[calc(5rem+env(safe-area-inset-top))] pb-16">
        <Container className="max-w-lg text-center py-16 sm:py-24">
          <Package className="w-12 h-12 text-[#a1a1aa] mx-auto mb-4" strokeWidth={1} />
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-[#111111] mb-3">
            No order found
          </h1>
          <p className="text-[#666666] text-sm mb-8">
            Place an order from checkout to see your confirmation here.
          </p>
          <Button variant="primary" href="/#collection">
            Shop Collection
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen-safe bg-white pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#fafafa] border-b border-[#e5e5e5] pt-[calc(1.5rem+env(safe-area-inset-top))]"
      >
        <Container className="py-10 sm:py-14 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 18 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1a3d2e] border border-[#2d6a4f] flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-[#6ee7b7]" strokeWidth={1.5} />
          </motion.div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-[#111111] mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-[#666666] text-sm sm:text-base max-w-md mx-auto">
            Thank you for shopping with GILZOD. Your order has been confirmed.
          </p>
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm">
            <span className="text-[#666666]">
              Order ID:{" "}
              <span className="text-[#111111] font-medium tracking-wide">{order.orderId}</span>
            </span>
            <span className="hidden sm:block text-[#cccccc]">|</span>
            <span className="text-[#666666]">
              Total: <span className="text-[#111111] font-medium">{formatPrice(order.total)}</span>
            </span>
          </div>
        </Container>
      </motion.div>

      <Container className="py-8 sm:py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
          <div className="space-y-5">
            <div className="glass p-5 sm:p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f4] border border-[#e5e5e5] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#666666]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-1">
                  Expected Delivery
                </p>
                <p className="text-[#111111] text-sm sm:text-base font-medium">{order.deliveryDate}</p>
                <p className="text-xs text-[#888888] mt-1">
                  We&apos;ll send you updates on {order.customer.email}
                </p>
              </div>
            </div>

            <div className="glass p-5 sm:p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f4] border border-[#e5e5e5] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#666666]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-1">
                  Shipping To
                </p>
                <p className="text-[#111111] text-sm font-medium">{order.customer.name}</p>
                <p className="text-[#666666] text-sm mt-1 leading-relaxed">
                  {order.customer.address}
                  <br />
                  {order.customer.city}, {order.customer.state} — {order.customer.zip}
                  <br />
                  {order.customer.phone}
                </p>
              </div>
            </div>

            <div className="glass p-5 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-4">
                Items in this order ({order.items.length})
              </p>
              <ul className="space-y-4">
                {order.items.map((item) => (
                  <li
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 pb-4 border-b border-[#f0f0f0] last:border-0 last:pb-0"
                  >
                    <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-[#f4f4f4]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#111111]">{item.name}</p>
                      <p className="text-xs text-[#666666] mt-1">
                        Size {item.size} · Qty {item.quantity}
                      </p>
                      <p className="text-sm text-[#333333] mt-2">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-[#6ee7b7] mt-2">
                        Delivery by {order.deliveryDate.split(",").slice(1).join(",").trim()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="glass p-5 sm:p-6 space-y-4 lg:sticky lg:top-8">
              <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[#111111]">
                Price Details
              </h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-[#666666]">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between text-[#111111] font-medium pt-3 border-t border-[#e5e5e5]">
                  <span>Total Paid</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-1">
                  Payment Method
                </p>
                <p className="text-sm text-[#111111]">{order.paymentLabel}</p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Button variant="primary" href="/" className="w-full">
                  Continue Shopping
                </Button>
                <Link
                  href={`/orders/${order.orderId}`}
                  className="text-center text-xs uppercase tracking-[0.15em] text-[#666666] hover:text-[#111111] transition-colors py-2"
                >
                  Track Order
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
