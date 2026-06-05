import type { Metadata } from "next";
import { TrackOrderSearch } from "@/components/orders/TrackOrderSearch";

export const metadata: Metadata = {
  title: "Track Order | GILZOD",
  description: "Track your GILZOD order delivery status in real time.",
};

export default function TrackOrderPage() {
  return <TrackOrderSearch />;
}
