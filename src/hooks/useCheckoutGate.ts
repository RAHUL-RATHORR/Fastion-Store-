"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";

export function useCheckoutGate() {
  const router = useRouter();
  const { user, isReady } = useAuth();
  const { openCheckoutAuth } = useUI();

  const goToCheckout = useCallback(
    (redirect = "/checkout") => {
      if (!isReady) return;
      if (user) {
        router.push(redirect);
        return;
      }
      openCheckoutAuth(redirect);
    },
    [isReady, user, router, openCheckoutAuth]
  );

  return { goToCheckout, isLoggedIn: Boolean(user), isReady };
}
