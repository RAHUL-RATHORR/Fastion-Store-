"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, Phone, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { USE_DUMMY_AUTH } from "@/lib/auth-config";
import { buildDummyUserFromPhone } from "@/lib/dummy-auth";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const inputClass = "form-input";

type LoginMethod = "email" | "phone";
type Step = "input" | "otp";

export function LoginPage() {
  const router = useRouter();
  const { user, login, isReady } = useAuth();

  const [method, setMethod] = useState<LoginMethod>("phone");
  const [step, setStep] = useState<Step>("input");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (isReady && user) {
      router.replace("/account");
    }
  }, [isReady, user, router]);

  if (!isReady || user) {
    return <div className="min-h-screen-safe bg-white" />;
  }

  const phoneLogin = () => {
    const nextUser = buildDummyUserFromPhone(phone);
    if (!nextUser) {
      setError("Enter valid 10-digit mobile number");
      return;
    }
    login(nextUser);
    router.push("/account");
  };

  const sendOtp = async () => {
    if (USE_DUMMY_AUTH) {
      phoneLogin();
      return;
    }

    setError("");
    setInfo("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method,
          email: method === "email" ? email : undefined,
          phone: method === "phone" ? phone : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }

      setInfo(data.message || "OTP sent successfully");
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
        body: JSON.stringify({ email, otp, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid OTP");
        return;
      }

      login(data.user);
      router.push("/account");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (USE_DUMMY_AUTH) {
    return (
      <div className="min-h-screen-safe bg-white pb-16">
        <Container className="pt-[calc(5rem+env(safe-area-inset-top))] max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#666666] hover:text-[#111111] text-xs uppercase tracking-[0.15em] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#f4f4f4] border border-[#e5e5e5] flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-[#666666]" strokeWidth={1.5} />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#111111] mb-2">
              Continue with Mobile
            </h1>
            <p className="text-[#666666] text-sm">Enter number — no OTP required</p>
          </div>

          <div className="bg-white border border-[#e5e5e5] p-6 sm:p-8 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="flex gap-2">
              <div className="flex items-center px-3 border border-[#e5e5e5] bg-[#fafafa] text-sm text-[#666666] shrink-0">
                +91
              </div>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter Phone Number"
                className={cn(inputClass, "flex-1")}
              />
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={phoneLogin}
              disabled={loading || phone.length < 10}
            >
              {loading ? "Please wait..." : "Proceed"}
            </Button>
            {error && <p className="text-red-600 text-xs text-center">{error}</p>}
          </div>
        </Container>
      </div>
    );
  }

  const switchMethod = (next: LoginMethod) => {
    setMethod(next);
    setStep("input");
    setOtp("");
    setError("");
    setInfo("");
  };

  return (
    <div className="min-h-screen-safe bg-white pb-16">
      <Container className="pt-[calc(5rem+env(safe-area-inset-top))] max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#666666] hover:text-[#111111] text-xs uppercase tracking-[0.15em] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#f4f4f4] border border-[#e5e5e5] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#666666]" strokeWidth={1.5} />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[#111111] mb-2">
            Sign In
          </h1>
          <p className="text-[#666666] text-sm">
            {method === "email"
              ? "We will send a one-time password to your email"
              : "Phone OTP login — coming soon"}
          </p>
        </div>

        <div className="flex border border-[#e5e5e5] mb-6">
          <button
            onClick={() => switchMethod("email")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-[10px] uppercase tracking-[0.15em] transition-colors",
              method === "email"
                ? "bg-[#f5f5f5] text-[#111111] border-b-2 border-[#111111]"
                : "text-[#888888] hover:text-[#111111]"
            )}
          >
            <Mail className="w-4 h-4" />
            Email OTP
          </button>
          <button
            onClick={() => switchMethod("phone")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-[10px] uppercase tracking-[0.15em] transition-colors relative",
              method === "phone"
                ? "bg-[#f5f5f5] text-[#111111] border-b-2 border-[#111111]"
                : "text-[#888888] hover:text-[#111111]"
            )}
          >
            <Phone className="w-4 h-4" />
            Phone OTP
          </button>
        </div>

        <div className="bg-white border border-[#e5e5e5] p-6 sm:p-8 space-y-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          {step === "input" ? (
            <>
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className={inputClass}
                />
              </div>
              <Button variant="primary" className="w-full" onClick={sendOtp} disabled={loading || !email.trim()}>
                {loading ? "Sending..." : "Send OTP to Email"}
              </Button>
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
                className={cn(inputClass, "text-center text-2xl tracking-[0.5em]")}
              />
              <Button variant="primary" className="w-full" onClick={verifyOtp} disabled={loading || otp.length !== 6}>
                {loading ? "Verifying..." : "Verify & Sign In"}
              </Button>
            </>
          )}
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          {info && <p className="text-[#6ee7b7] text-xs text-center">{info}</p>}
        </div>

        <div className="mt-6 flex items-start gap-3 text-[#888888] text-xs">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
          <p>Your OTP is valid for 10 minutes. We never share your email with third parties.</p>
        </div>
      </Container>
    </div>
  );
}
