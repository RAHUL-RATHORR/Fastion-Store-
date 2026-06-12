"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Circle, MapPin, Package, Truck } from "lucide-react";
import { getOrderTracking, type PlacedOrder } from "@/lib/order";
import { cn, formatPrice } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const statusLabels: Record<string, string> = {
  placed: "Order Placed",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

type OrderTrackingViewProps = {
  order: PlacedOrder;
  showBackLink?: boolean;
};

export function OrderTrackingView({ order, showBackLink = true }: OrderTrackingViewProps) {
  const { steps, currentStatus, progress, isDelivered } = getOrderTracking(order);

  return (
    <div className="min-h-screen-safe bg-white pb-16">
      <div className="bg-[#fafafa] border-b border-[#e5e5e5] pt-[calc(1rem+env(safe-area-inset-top))]">
        <Container className="py-6 sm:py-8">
          {showBackLink && (
            <Link
              href="/track-order"
              className="inline-flex text-xs uppercase tracking-[0.15em] text-[#666666] hover:text-[#111111] transition-colors mb-5"
            >
              ← Track another order
            </Link>
          )}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-1">
                Order ID
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#111111]">
                {order.orderId}
              </h1>
              <p className="text-sm text-[#666666] mt-2">
                Placed on{" "}
                {new Date(order.placedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="glass px-4 py-3 sm:text-right">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-1">
                Current Status
              </p>
              <p
                className={cn(
                  "text-sm font-medium",
                  isDelivered ? "text-[#059669]" : "text-[#111111]"
                )}
              >
                {statusLabels[currentStatus]}
              </p>
              {!isDelivered && (
                <p className="text-xs text-[#888888] mt-1">
                  Expected by {order.deliveryDate}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.15em] text-[#888888] mb-2">
              <span>Delivery Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-[#e5e5e5] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "h-full rounded-full",
                  isDelivered ? "bg-[#059669]" : "bg-[#111111]"
                )}
              />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8 sm:py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
          <div className="space-y-6">
            <div className="glass p-5 sm:p-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[#111111] mb-6">
                Tracking Timeline
              </h2>
              <ol className="space-y-0">
                {steps.map((step, index) => (
                  <li key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full border flex items-center justify-center shrink-0",
                          step.completed
                            ? "bg-[#ecfdf5] border-[#059669] text-[#059669]"
                            : step.active
                              ? "bg-[#f5f5f5] border-[#111111] text-[#111111]"
                              : "bg-[#fafafa] border-[#e5e5e5] text-[#cccccc]"
                        )}
                      >
                        {step.completed ? (
                          <Check className="w-4 h-4" strokeWidth={2} />
                        ) : (
                          <Circle className="w-3 h-3" fill="currentColor" strokeWidth={0} />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "w-px flex-1 min-h-[40px] my-1",
                            step.completed ? "bg-[#059669]" : "bg-[#e5e5e5]"
                          )}
                        />
                      )}
                    </div>
                    <div className={cn("pb-8", index === steps.length - 1 && "pb-0")}>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          step.completed || step.active ? "text-[#111111]" : "text-[#888888]"
                        )}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                        {step.description}
                      </p>
                      {step.timestamp && (
                        <p className="text-[10px] text-[#888888] mt-2 uppercase tracking-wider">
                          {step.timestamp}
                        </p>
                      )}
                      {step.active && !step.completed && (
                        <span className="inline-block mt-2 text-[10px] uppercase tracking-[0.15em] text-[#666666] border border-[#e5e5e5] px-2 py-1">
                          In Progress
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass p-5 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-4">
                Items ({order.items.length})
              </p>
              <ul className="space-y-4">
                {order.items.map((item) => (
                  <li key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="relative w-16 h-20 shrink-0 overflow-hidden bg-[#f4f4f4]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#111111] truncate">{item.name}</p>
                      <p className="text-xs text-[#666666] mt-0.5">
                        Size {item.size} · Qty {item.quantity}
                      </p>
                      <p className="text-sm text-[#333333] mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-8">
            <div className="glass p-5 sm:p-6 space-y-4">
              <div className="flex gap-3 items-start">
                <Truck className="w-5 h-5 text-[#666666] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-1">
                    Courier
                  </p>
                  <p className="text-sm text-[#111111]">GILZOD Express</p>
                  <p className="text-xs text-[#888888] mt-1">
                    AWB: {order.orderId.replace("GZ", "GE")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[#666666] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-1">
                    Delivering To
                  </p>
                  <p className="text-sm text-[#111111]">{order.customer.name}</p>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    {order.customer.address}, {order.customer.city}, {order.customer.state} —{" "}
                    {order.customer.zip}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Package className="w-5 h-5 text-[#666666] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-1">
                    Order Total
                  </p>
                  <p className="text-sm text-[#111111] font-medium">{formatPrice(order.total)}</p>
                  <p className="text-xs text-[#888888] mt-1">{order.paymentLabel}</p>
                </div>
              </div>
            </div>

            <Button variant="secondary" href="/" className="w-full">
              Continue Shopping
            </Button>
          </aside>
        </div>
      </Container>
    </div>
  );
}
