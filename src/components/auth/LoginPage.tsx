"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, Phone, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full bg-[#111111] border border-[rgba(192,192,192,0.12)] px-4 py-3 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#c0c0c0] transition-colors";

type LoginMethod = "email" | "phone";
type Step = "input" | "otp";

export function LoginPage() {
  const router = useRouter();
  const { user, login, isReady } = useAuth();

  const [method, setMethod] = useState<LoginMethod>("email");
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
    return <div className="min-h-screen-safe bg-[#050505]" />;
  }

  const sendOtp = async () => {
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

  const switchMethod = (next: LoginMethod) => {
    setMethod(next);
    setStep("input");
    setOtp("");
    setError("");
    setInfo("");
  };

  return (
    <div className="min-h-screen-safe bg-[#050505] pb-16">
      <Container className="pt-[calc(5rem+env(safe-area-inset-top))] max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-white text-xs uppercase tracking-[0.15em] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#111111] border border-[rgba(192,192,192,0.12)] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#c0c0c0]" strokeWidth={1.5} />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-white mb-2">
            Sign In
          </h1>
          <p className="text-[#a1a1aa] text-sm">
            {method === "email"
              ? "We will send a one-time password to your email"
              : "Phone OTP login — coming soon"}
          </p>
        </div>

        <div className="flex border border-[rgba(192,192,192,0.12)] mb-6">
          <button
            onClick={() => switchMethod("email")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-[10px] uppercase tracking-[0.15em] transition-colors",
              method === "email"
                ? "bg-[#111111] text-white border-b-2 border-[#e5e5e5]"
                : "text-[#71717a] hover:text-[#a1a1aa]"
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
                ? "bg-[#111111] text-white border-b-2 border-[#e5e5e5]"
                : "text-[#71717a] hover:text-[#a1a1aa]"
            )}
          >
            <Phone className="w-4 h-4" />
            Phone OTP
            <span className="absolute top-1 right-2 text-[7px] bg-[#1a1a1a] text-[#71717a] px-1.5 py-0.5 rounded">
              Soon
            </span>
          </button>
        </div>

        <div className="bg-[#0d0d0d] border border-[rgba(192,192,192,0.1)] p-6 sm:p-8 space-y-5">
          {method === "phone" ? (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa] mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={cn(inputClass, "opacity-50 cursor-not-allowed")}
                  disabled
                />
              </div>
              <p className="text-[#71717a] text-xs text-center">
                Phone OTP login will be enabled soon. Please use Email OTP for now.
              </p>
              <Button
                variant="secondary"
                className="w-full opacity-50 cursor-not-allowed"
                disabled
              >
                Send OTP — Coming Soon
              </Button>
            </>
          ) : step === "input" ? (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa] mb-2">
                  Name <span className="text-[#71717a]">(optional)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={sendOtp}
                disabled={loading || !email.trim()}
              >
                {loading ? "Sending..." : "Send OTP to Email"}
              </Button>
            </>
          ) : (
            <>
              <p className="text-[#a1a1aa] text-sm text-center">
                OTP sent to <span className="text-white">{email}</span>
              </p>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa] mb-2">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className={cn(inputClass, "text-center text-2xl tracking-[0.5em]")}
                />
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </Button>
              <button
                onClick={() => {
                  setStep("input");
                  setOtp("");
                  setError("");
                }}
                className="w-full text-[10px] uppercase tracking-[0.15em] text-[#a1a1aa] hover:text-white transition-colors"
              >
                Change email
              </button>
              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full text-[10px] uppercase tracking-[0.15em] text-[#c0c0c0] hover:text-white transition-colors"
              >
                Resend OTP
              </button>
            </>
          )}

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}
          {info && (
            <p className="text-[#6ee7b7] text-xs text-center">{info}</p>
          )}
        </div>

        <div className="mt-6 flex items-start gap-3 text-[#71717a] text-xs">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Your OTP is valid for 10 minutes. We never share your email with third parties.
          </p>
        </div>
      </Container>
    </div>
  );
}
