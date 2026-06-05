import type { Metadata } from "next";
import { OrderConfirmationPage } from "@/components/checkout/OrderConfirmationPage";

export const metadata: Metadata = {
  title: "Order Placed | GILZOD",
  description: "Your GILZOD order has been placed successfully.",
};

export default function OrderConfirmation() {
  return <OrderConfirmationPage />;
}
