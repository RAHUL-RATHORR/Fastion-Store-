"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full bg-[#111111] border border-[rgba(192,192,192,0.12)] px-4 py-3 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#c0c0c0] transition-colors";

const labelClass = "block text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa] mb-2";

export function AccountPage() {
  const { user, login, logout, isLoggedIn } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen-safe bg-[#050505] pt-[calc(5rem+env(safe-area-inset-top))] pb-16">
      <Container className="max-w-md py-10 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-white text-xs uppercase tracking-[0.15em] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#111111] border border-[rgba(192,192,192,0.12)] flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-[#c0c0c0]" strokeWidth={1.5} />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-white mb-2">
            {isLoggedIn ? "My Account" : "Login"}
          </h1>
          <p className="text-[#a1a1aa] text-sm">
            Order confirmations email aur phone dono par bheji jayengi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-5 sm:p-6 space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>

          {saved && (
            <p className="text-xs text-[#6ee7b7]">Login saved! Order alerts is number/email par aayenge.</p>
          )}

          <Button type="submit" variant="primary" className="w-full">
            {isLoggedIn ? "Update Account" : "Login"}
          </Button>

          {isLoggedIn && (
            <button
              type="button"
              onClick={logout}
              className="w-full inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] text-[#a1a1aa] hover:text-white transition-colors py-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </form>
      </Container>
    </div>
  );
}
