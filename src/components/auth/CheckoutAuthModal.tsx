"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { USE_DUMMY_AUTH } from "@/lib/auth-config";
import { buildDummyUserFromPhone } from "@/lib/dummy-auth";
import { cn } from "@/lib/utils";

type Tab = "login" | "register";
type Step = "input" | "otp";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function CheckoutAuthModal() {
  const router = useRouter();
  const { login } = useAuth();
  const { checkoutAuthOpen, checkoutAuthRedirect, closeCheckoutAuth } = useUI();

  const [tab, setTab] = useState<Tab>("login");
  const [step, setStep] = useState<Step>("input");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    document.body.style.overflow = checkoutAuthOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [checkoutAuthOpen]);

  useEffect(() => {
    if (!checkoutAuthOpen) {
      setTab("login");
      setStep("input");
      setOtp("");
      setError("");
      setInfo("");
    }
  }, [checkoutAuthOpen]);

  const completeAuth = (user: NonNullable<ReturnType<typeof buildDummyUserFromPhone>>) => {
    login(user);
    closeCheckoutAuth();
    router.push(checkoutAuthRedirect);
  };

  const phoneLogin = () => {
    const user = buildDummyUserFromPhone(phone);
    if (!user) {
      setError("Enter valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      completeAuth(user);
      setLoading(false);
    }, 300);
  };

  const resetToInput = () => {
    setStep("input");
    setOtp("");
    setError("");
    setInfo("");
  };

  const switchTab = (next: Tab) => {
    setTab(next);
    resetToInput();
  };

  const sendOtp = async () => {
    setError("");
    setInfo("");

    if (USE_DUMMY_AUTH) {
      phoneLogin();
      return;
    }

    const loginEmail = email.trim();
    if (!loginEmail) {
      setError(tab === "login" ? "Enter your email address" : "Enter a valid email to register");
      return;
    }

    if (tab === "register" && !name.trim()) {
      setError("Enter your name to create an account");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "email",
          email: loginEmail,
          phone: phone.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }
      setInfo(data.message || "OTP sent to your email");
      setStep("otp");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp,
          name: tab === "register" ? name.trim() : name.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid OTP");
        return;
      }

      const nextUser = {
        ...data.user,
        ...(phone.trim() ? { phone: phone.trim() } : {}),
      };
      login(nextUser);
      closeCheckoutAuth();
      router.push(checkoutAuthRedirect);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {checkoutAuthOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeCheckoutAuth}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-md bg-white shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeCheckoutAuth}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center text-[#888888] hover:text-[#111111] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-6 pt-8 pb-2 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="relative w-8 h-8">
                  <Image src="/logo.png?v=3" alt="GILZOD" fill unoptimized sizes="32px" className="object-contain" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg tracking-[0.08em] text-[#111111]">
                  GILZOD
                </span>
              </div>
              <h2 className="text-[#333333] text-sm sm:text-base font-medium">
                {USE_DUMMY_AUTH ? "Continue with Mobile" : "Login with GILZOD"}
              </h2>
              <p className="text-[#888888] text-xs mt-1">
                {USE_DUMMY_AUTH
                  ? "Enter your number — no OTP, direct checkout"
                  : "Sign in to continue to checkout"}
              </p>
            </div>

            {USE_DUMMY_AUTH ? (
              <div className="mx-6 mt-4 mb-6 border border-[#e0e0e0] bg-[#fafafa] p-5 sm:p-6">
                <div className="flex gap-2 mb-4">
                  <div className="flex items-center px-3 border border-[#e0e0e0] bg-white text-sm text-[#666666] rounded-sm shrink-0">
                    +91
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter Phone Number"
                    autoFocus
                    className="flex-1 min-h-[48px] px-4 border border-[#e0e0e0] bg-white text-sm text-[#111111] placeholder:text-[#aaaaaa] focus:outline-none focus:border-[#111111] rounded-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={phoneLogin}
                  disabled={loading || phone.length < 10}
                  className="w-full min-h-[48px] bg-[#111111] text-white text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                >
                  {loading ? "Please wait..." : "Proceed"}
                </button>

                {error && <p className="text-red-600 text-xs text-center mt-3">{error}</p>}
              </div>
            ) : (
              <>
                <div className="relative px-6">
                  <div className="flex border border-[#e0e0e0]">
                    <button
                      type="button"
                      onClick={() => switchTab("login")}
                      className={cn(
                        "flex-1 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] transition-colors",
                        tab === "login" ? "bg-[#111111] text-white" : "bg-white text-[#666666] hover:text-[#111111]"
                      )}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => switchTab("register")}
                      className={cn(
                        "flex-1 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] transition-colors border-l border-[#e0e0e0]",
                        tab === "register" ? "bg-[#111111] text-white" : "bg-white text-[#666666] hover:text-[#111111]"
                      )}
                    >
                      Register
                    </button>
                  </div>
                </div>

                <div className="mx-6 mt-3 mb-6 border border-[#e0e0e0] bg-[#fafafa] p-5 sm:p-6">
                  {step === "input" ? (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <button type="button" className="flex items-center justify-center gap-2 min-h-[44px] px-3 border border-[#e0e0e0] bg-white rounded-sm text-sm text-[#333333]">
                          <FacebookIcon />
                          Facebook
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 min-h-[44px] px-3 border border-[#e0e0e0] bg-white rounded-sm text-sm text-[#333333]">
                          <GoogleIcon />
                          Google
                        </button>
                      </div>
                      <p className="text-center text-[#888888] text-xs mb-4 tracking-widest">— OR —</p>
                      {tab === "register" && (
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter Full Name"
                          className="w-full mb-3 min-h-[44px] px-4 border border-[#e0e0e0] bg-white text-sm rounded-sm"
                        />
                      )}
                      <div className="flex gap-2 mb-3">
                        <div className="flex items-center px-3 border border-[#e0e0e0] bg-white text-sm text-[#666666] rounded-sm shrink-0">+91</div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="Enter Phone Number"
                          className="flex-1 min-h-[44px] px-4 border border-[#e0e0e0] bg-white text-sm rounded-sm"
                        />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address"
                        className="w-full mb-4 min-h-[44px] px-4 border border-[#e0e0e0] bg-white text-sm rounded-sm"
                      />
                      <button
                        type="button"
                        onClick={sendOtp}
                        disabled={loading || !email.trim() || (tab === "register" && !name.trim())}
                        className="w-full min-h-[48px] bg-[#111111] text-white text-sm font-bold uppercase tracking-[0.15em] rounded-sm disabled:opacity-50"
                      >
                        {loading ? "Please wait..." : "Proceed"}
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        className="w-full mb-4 min-h-[48px] px-4 border text-center text-2xl tracking-[0.4em] rounded-sm"
                      />
                      <button
                        type="button"
                        onClick={verifyOtp}
                        disabled={loading || otp.length !== 6}
                        className="w-full min-h-[48px] bg-[#111111] text-white text-sm font-bold uppercase rounded-sm"
                      >
                        {loading ? "Verifying..." : "Verify & Continue"}
                      </button>
                    </>
                  )}
                  {error && <p className="text-red-600 text-xs text-center mt-3">{error}</p>}
                  {info && <p className="text-[#15803d] text-xs text-center mt-3">{info}</p>}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
