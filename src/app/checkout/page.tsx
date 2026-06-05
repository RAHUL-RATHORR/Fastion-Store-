import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | GILZOD",
  description: "Complete your GILZOD order securely.",
};

export default function Checkout() {
  return <CheckoutPage />;
}
