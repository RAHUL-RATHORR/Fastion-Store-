"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";
import { findOrder, getAllOrders } from "@/lib/order";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const inputClass = "form-input";
const labelClass = "form-label";

export function TrackOrderSearch() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [recentOrders] = useState(() => getAllOrders().slice(0, 3));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const order = findOrder(orderId, email);
    if (!order) {
      setError("Order not found. Check your Order ID and email.");
      return;
    }

    router.push(`/orders/${order.orderId}`);
  };

  return (
    <div className="min-h-screen-safe bg-white pt-[calc(5rem+env(safe-area-inset-top))] pb-16">
      <Container className="max-w-xl py-10 sm:py-14">
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-14 h-14 rounded-full bg-[#f4f4f4] border border-[#e5e5e5] flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-[#666666]" strokeWidth={1.5} />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#111111] mb-2">
            Track Your Order
          </h1>
          <p className="text-[#666666] text-sm">
            Enter your Order ID and email to see live delivery status.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-5 sm:p-6 space-y-4">
          <div>
            <label htmlFor="orderId" className={labelClass}>
              Order ID
            </label>
            <input
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              placeholder="e.g. GZ1234567890"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" className="w-full gap-2">
            Track Order
          </Button>
        </form>

        {recentOrders.length > 0 && (
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#888888] mb-3">
              Recent Orders
            </p>
            <ul className="space-y-2">
              {recentOrders.map((order) => (
                <li key={order.orderId}>
                  <Link
                    href={`/orders/${order.orderId}`}
                    className="flex items-center justify-between glass px-4 py-3 hover:border-[#cccccc] transition-colors"
                  >
                    <span className="text-sm text-[#111111]">{order.orderId}</span>
                    <span className="text-xs text-[#666666]">
                      {new Date(order.placedAt).toLocaleDateString("en-IN")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}
