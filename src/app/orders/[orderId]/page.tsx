import type { Metadata } from "next";
import { OrderDetailPage } from "@/components/orders/OrderDetailPage";

export const metadata: Metadata = {
  title: "Order Tracking | GILZOD",
  description: "View live delivery status for your GILZOD order.",
};

type PageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderTrackingRoute({ params }: PageProps) {
  const { orderId } = await params;
  return <OrderDetailPage orderId={orderId} />;
}
