import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/LoginPage";

export const metadata: Metadata = {
  title: "Sign In | GILZOD",
  description: "Sign in to your GILZOD account with email OTP.",
};

export default function Login() {
  return <LoginPage />;
}
