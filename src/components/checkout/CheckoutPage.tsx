"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { generateOrderId, getDeliveryDate, savePlacedOrder, type PlacedOrder } from "@/lib/order";
import { cn, formatPrice } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full bg-[#111111] border border-[rgba(192,192,192,0.12)] px-4 py-3 text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#c0c0c0] transition-colors";

const labelClass = "block text-[10px] uppercase tracking-[0.18em] text-[#a1a1aa] mb-2";

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet" | "cod";

const paymentMethods: { id: PaymentMethod; label: string; desc: string }[] = [
  { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Card", desc: "Credit / Debit" },
  { id: "netbanking", label: "Net Banking", desc: "All major banks" },
  { id: "wallet", label: "Wallet", desc: "Paytm, Amazon Pay" },
  { id: "cod", label: "COD", desc: "Cash on Delivery" },
];

const upiApps = ["Google Pay", "PhonePe", "Paytm", "BHIM UPI"] as const;

const banks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
] as const;

const wallets = ["Paytm Wallet", "Amazon Pay", "Mobikwik", "Freecharge"] as const;

const paymentLabels: Record<PaymentMethod, string> = {
  upi: "UPI",
  card: "Credit / Debit Card",
  netbanking: "Net Banking",
  wallet: "Wallet",
  cod: "Cash on Delivery",
};

export function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>(upiApps[0]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 300 ? 0 : 15) : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const method = (form.get("paymentMethod") as PaymentMethod) || paymentMethod;

    let paymentLabel = paymentLabels[method];
    if (method === "upi") {
      paymentLabel = `${form.get("upiApp") || selectedUpiApp} · ${form.get("upiId")}`;
    } else if (method === "netbanking") {
      paymentLabel = `Net Banking · ${form.get("bank")}`;
    } else if (method === "wallet") {
      paymentLabel = `${form.get("wallet")} · ${form.get("walletPhone")}`;
    }

    setIsSubmitting(true);

    const order: PlacedOrder = {
      orderId: generateOrderId(),
      placedAt: new Date().toISOString(),
      items: [...items],
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod: method,
      paymentLabel,
      customer: {
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        name: `${form.get("firstName")} ${form.get("lastName")}`.trim(),
        address: String(form.get("address") || ""),
        city: String(form.get("city") || ""),
        state: String(form.get("state") || ""),
        zip: String(form.get("zip") || ""),
      },
      deliveryDate: getDeliveryDate(),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order,
          loginEmail: user?.email,
          loginPhone: user?.phone,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.notifications) {
          order.notifications = {
            emailSent: data.notifications.email.sent,
            smsSent: data.notifications.sms.sent,
            emailTargets: data.notifications.email.targets,
            smsTargets: data.notifications.sms.targets,
          };
        }
      }
    } catch {
      /* order still completes locally */
    }

    savePlacedOrder(order);
    clearCart();
    router.push("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen-safe bg-[#050505] pt-[calc(5rem+env(safe-area-inset-top))] pb-16">
        <Container className="max-w-lg text-center py-16 sm:py-24">
          <ShoppingBag className="w-12 h-12 text-[#a1a1aa] mx-auto mb-4" strokeWidth={1} />
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-white mb-3">
            Your bag is empty
          </h1>
          <p className="text-[#a1a1aa] text-sm mb-8">Add items to your bag before checking out.</p>
          <Button variant="primary" href="/#collection">
            Shop Collection
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen-safe bg-[#050505] pt-[calc(5rem+env(safe-area-inset-top))] pb-16">
      <header className="border-b border-[rgba(192,192,192,0.08)] bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-40 pt-[env(safe-area-inset-top)]">
        <Container className="py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-white text-xs uppercase tracking-[0.15em] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-white tracking-wide">
            Checkout
          </h1>
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-[#a1a1aa]">
            <Lock className="w-3.5 h-3.5" />
            Secure
          </div>
        </Container>
      </header>

      <Container className="py-8 sm:py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
            <div className="space-y-8 sm:space-y-10">
              <section>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-5">
                  Contact
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      defaultValue={user?.email || ""}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      defaultValue={user?.phone || ""}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-5">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        First Name
                      </label>
                      <input id="firstName" name="firstName" required className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        Last Name
                      </label>
                      <input id="lastName" name="lastName" required className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className={labelClass}>
                      Address
                    </label>
                    <input id="address" name="address" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="apartment" className={labelClass}>
                      Apartment, suite, etc. (optional)
                    </label>
                    <input id="apartment" name="apartment" className={inputClass} />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className={labelClass}>
                        City
                      </label>
                      <input id="city" name="city" required className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="state" className={labelClass}>
                        State
                      </label>
                      <input id="state" name="state" required className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="zip" className={labelClass}>
                        ZIP Code
                      </label>
                      <input id="zip" name="zip" required className={inputClass} />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-5">
                  Payment
                </h2>
                <div className="glass p-5 sm:p-6 space-y-5">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={cn(
                          "text-left p-3 border transition-all duration-300",
                          paymentMethod === method.id
                            ? "border-[#c0c0c0] bg-[rgba(192,192,192,0.08)]"
                            : "border-[rgba(192,192,192,0.12)] hover:border-[rgba(192,192,192,0.25)]"
                        )}
                      >
                        <p className="text-xs text-white font-medium">{method.label}</p>
                        <p className="text-[10px] text-[#71717a] mt-0.5">{method.desc}</p>
                      </button>
                    ))}
                  </div>

                  <input type="hidden" name="paymentMethod" value={paymentMethod} />

                  {paymentMethod === "upi" && (
                    <div className="space-y-4">
                      <div>
                        <p className={labelClass}>Pay via UPI App</p>
                        <div className="grid grid-cols-2 gap-2">
                          {upiApps.map((app) => (
                            <button
                              key={app}
                              type="button"
                              onClick={() => setSelectedUpiApp(app)}
                              className={cn(
                                "px-3 py-2.5 text-xs border transition-colors",
                                selectedUpiApp === app
                                  ? "border-[#c0c0c0] text-white bg-[rgba(192,192,192,0.08)]"
                                  : "border-[rgba(192,192,192,0.12)] text-[#a1a1aa] hover:text-white"
                              )}
                            >
                              {app}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="upiApp" value={selectedUpiApp} />
                      </div>
                      <div>
                        <label htmlFor="upiId" className={labelClass}>
                          UPI ID
                        </label>
                        <input
                          id="upiId"
                          name="upiId"
                          required
                          placeholder="yourname@upi"
                          className={inputClass}
                        />
                      </div>
                      <p className="text-xs text-[#a1a1aa]">
                        You will receive a payment request on {selectedUpiApp} after placing the order.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className={labelClass}>
                          Card Number
                        </label>
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          required
                          placeholder="1234 5678 9012 3456"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="cardName" className={labelClass}>
                          Name on Card
                        </label>
                        <input id="cardName" name="cardName" required className={inputClass} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className={labelClass}>
                            Expiry
                          </label>
                          <input
                            id="expiry"
                            name="expiry"
                            required
                            placeholder="MM / YY"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className={labelClass}>
                            CVV
                          </label>
                          <input id="cvc" name="cvc" required placeholder="123" className={inputClass} />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div>
                      <label htmlFor="bank" className={labelClass}>
                        Select Bank
                      </label>
                      <select id="bank" name="bank" required className={inputClass}>
                        <option value="">Choose your bank</option>
                        {banks.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-[#a1a1aa] mt-3">
                        You will be redirected to your bank&apos;s secure login page.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div>
                      <label htmlFor="wallet" className={labelClass}>
                        Select Wallet
                      </label>
                      <select id="wallet" name="wallet" required className={inputClass}>
                        <option value="">Choose wallet</option>
                        {wallets.map((wallet) => (
                          <option key={wallet} value={wallet}>
                            {wallet}
                          </option>
                        ))}
                      </select>
                      <div className="mt-4">
                        <label htmlFor="walletPhone" className={labelClass}>
                          Registered Mobile
                        </label>
                        <input
                          id="walletPhone"
                          name="walletPhone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="p-4 border border-[rgba(192,192,192,0.12)] bg-[#111111]/50">
                      <p className="text-sm text-white mb-1">Pay when your order arrives</p>
                      <p className="text-xs text-[#a1a1aa] leading-relaxed">
                        Cash on Delivery is available for orders under {formatPrice(500)}. A small
                        handling fee of {formatPrice(49)} may apply.
                      </p>
                    </div>
                  )}

                  <p className="text-[10px] text-[#71717a] tracking-wide">
                    Demo checkout — no real payment will be processed.
                  </p>
                </div>
              </section>

              <Button
                type="submit"
                variant="primary"
                className="w-full lg:hidden"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Place Order — ${formatPrice(total)}`}
              </Button>
            </div>

            <aside className="lg:sticky lg:top-28">
              <div className="glass p-5 sm:p-6 space-y-5">
                <h2 className="font-[family-name:var(--font-playfair)] text-lg text-white">
                  Order Summary
                </h2>

                <ul className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <li key={`${item.id}-${item.size}`} className="flex gap-3">
                      <div className="relative w-16 h-20 shrink-0 overflow-hidden bg-[#111111]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{item.name}</p>
                        <p className="text-xs text-[#a1a1aa] mt-0.5">
                          Size {item.size} · Qty {item.quantity}
                        </p>
                        <p className="text-sm text-[#c0c0c0] mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[rgba(192,192,192,0.08)] pt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-[#a1a1aa]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#a1a1aa]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-[#a1a1aa]">
                    <span>Estimated Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-white font-medium pt-2 border-t border-[rgba(192,192,192,0.08)]">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full hidden lg:inline-flex"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </aside>
          </div>
        </form>
      </Container>
    </div>
  );
}
