"use client";

import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { getOrderById, type PlacedOrder } from "@/lib/order";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { OrderTrackingView } from "@/components/orders/OrderTrackingView";

type OrderDetailPageProps = {
  orderId: string;
};

export function OrderDetailPage({ orderId }: OrderDetailPageProps) {
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(getOrderById(orderId));
    setReady(true);
  }, [orderId]);

  if (!ready) {
    return <div className="min-h-screen-safe bg-white" />;
  }

  if (!order) {
    return (
      <div className="min-h-screen-safe bg-white pt-[calc(5rem+env(safe-area-inset-top))] pb-16">
        <Container className="max-w-lg text-center py-16 sm:py-24">
          <Package className="w-12 h-12 text-[#888888] mx-auto mb-4" strokeWidth={1} />
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-[#111111] mb-3">
            Order not found
          </h1>
          <p className="text-[#666666] text-sm mb-8">
            We couldn&apos;t find order <span className="text-[#111111]">{orderId}</span>. Please check
            the Order ID and try again.
          </p>
          <Button variant="primary" href="/track-order">
            Track Order
          </Button>
        </Container>
      </div>
    );
  }

  return <OrderTrackingView order={order} />;
}
