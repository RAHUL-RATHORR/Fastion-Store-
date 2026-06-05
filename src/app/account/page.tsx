import type { Metadata } from "next";
import { AccountPage } from "@/components/account/AccountPage";

export const metadata: Metadata = {
  title: "My Account | GILZOD",
  description: "Login to your GILZOD account with email and phone.",
};

export default function Account() {
  return <AccountPage />;
}
