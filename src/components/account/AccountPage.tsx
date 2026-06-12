"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, Mail, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AccountPage() {
  const router = useRouter();
  const { user, isReady, logout } = useAuth();

  useEffect(() => {
    if (isReady && !user) {
      router.replace("/login");
    }
  }, [isReady, user, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isReady || !user) {
    return <div className="min-h-screen-safe bg-white" />;
  }

  return (
    <div className="min-h-screen-safe bg-white pb-16">
      <Container className="pt-[calc(5rem+env(safe-area-inset-top))] max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#666666] hover:text-[#111111] text-xs uppercase tracking-[0.15em] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#111111] mb-8">
          My Account
        </h1>

        <div className="bg-white border border-[#e5e5e5] p-6 space-y-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#f4f4f4] border border-[#e5e5e5] flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-[#666666]" />
            </div>
            <div>
              <p className="text-[#111111] text-lg">{user.name || "GILZOD Member"}</p>
              <p className="text-[#666666] text-sm flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="border-t border-[#e5e5e5] pt-5 space-y-3">
            <Button variant="secondary" href="/track-order" className="w-full">
              Track Orders
            </Button>
            <Button variant="secondary" href="/#collection" className="w-full">
              Continue Shopping
            </Button>
            <Button
              variant="ghost"
              className="w-full text-red-500 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
