import type { Metadata } from "next";
import { AccountPage } from "@/components/account/AccountPage";

export const metadata: Metadata = {
  title: "My Account | GILZOD",
  description: "Manage your GILZOD account.",
};

export default function Account() {
  return <AccountPage />;
}
