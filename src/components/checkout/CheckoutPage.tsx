"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { generateOrderId, getDeliveryDate, savePlacedOrder } from "@/lib/order";
import { cn, formatRupee, toInr } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const inputClass = "form-input";
const labelClass = "form-label";

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
  const { user, isReady } = useAuth();
  const { openCheckoutAuth, checkoutAuthOpen } = useUI();
  const { items, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isReady && !user) {
      openCheckoutAuth("/checkout");
    }
  }, [isReady, user, openCheckoutAuth]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>(upiApps[0]);

  const subtotalInr = items.reduce((sum, i) => sum + toInr(i.price) * i.quantity, 0);
  const shippingInr = subtotalInr > 0 ? (subtotalInr >= 999 ? 0 : 99) : 0;
  const taxInr = Math.round(subtotalInr * 0.08);
  const totalInr = subtotalInr + shippingInr + taxInr;

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
    await new Promise((resolve) => setTimeout(resolve, 1200));

    savePlacedOrder({
      orderId: generateOrderId(),
      placedAt: new Date().toISOString(),
      items: [...items],
      subtotal: subtotalInr,
      shipping: shippingInr,
      tax: taxInr,
      total: totalInr,
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
    });

    clearCart();
    router.push("/order-confirmation");
  };

  if (!isReady) {
    return <div className="min-h-screen-safe bg-white" />;
  }

  if (!user) {
    return (
      <div className="min-h-screen-safe bg-white pt-[calc(5rem+env(safe-area-inset-top))] pb-16">
        <Container className="max-w-lg text-center py-16 sm:py-24">
          <Lock className="w-12 h-12 text-[#cccccc] mx-auto mb-4" strokeWidth={1} />
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-[#111111] mb-3">
            Login Required
          </h1>
          <p className="text-[#666666] text-sm mb-8">
            Please sign in to complete your GILZOD order.
          </p>
          {!checkoutAuthOpen && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={() => openCheckoutAuth("/checkout")}>
                Login to Continue
              </Button>
              <Button variant="secondary" href="/#collection">
                Continue Shopping
              </Button>
            </div>
          )}
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen-safe bg-white pt-[calc(5rem+env(safe-area-inset-top))] pb-16">
        <Container className="max-w-lg text-center py-16 sm:py-24">
          <ShoppingBag className="w-12 h-12 text-[#a1a1aa] mx-auto mb-4" strokeWidth={1} />
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-[#111111] mb-3">
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
    <div className="min-h-screen-safe bg-white pt-[calc(5rem+env(safe-area-inset-top))] pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-16">
      <header className="border-b border-[#e5e5e5] bg-white/95 backdrop-blur-md sticky top-0 z-40 pt-[env(safe-area-inset-top)]">
        <Container className="py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[#666666] hover:text-[#111111] text-[10px] sm:text-xs uppercase tracking-[0.15em] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden min-[375px]:inline">Back</span>
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-base sm:text-xl text-[#111111] tracking-wide">
            Checkout
          </h1>
          <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-[#888888] min-h-[44px]">
            <Lock className="w-3.5 h-3.5" />
            Secure
          </div>
        </Container>
      </header>

      <Container className="py-6 sm:py-12">
        <form id="checkout-form" onSubmit={handleSubmit}>
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 sm:gap-10 lg:gap-14 items-start">
            <aside className="w-full lg:sticky lg:top-28 order-1 lg:order-2">
              <div className="glass p-4 sm:p-6 space-y-4 sm:space-y-5">
                <h2 className="font-[family-name:var(--font-playfair)] text-base sm:text-lg text-[#111111]">
                  Order Summary
                </h2>

                <ul className="space-y-3 sm:space-y-4 max-h-[220px] sm:max-h-[320px] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <li key={`${item.id}-${item.size}`} className="flex gap-3">
                      <div className="relative w-14 h-[4.5rem] sm:w-16 sm:h-20 shrink-0 overflow-hidden bg-[#f4f4f4]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#111111] truncate">{item.name}</p>
                        <p className="text-xs text-[#666666] mt-0.5">
                          Size {item.size} · Qty {item.quantity}
                        </p>
                        <p className="text-sm text-[#333333] mt-1">
                          {formatRupee(toInr(item.price) * item.quantity)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#e5e5e5] pt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-[#666666]">
                    <span>Subtotal</span>
                    <span>{formatRupee(subtotalInr)}</span>
                  </div>
                  <div className="flex justify-between text-[#666666]">
                    <span>Shipping</span>
                    <span>{shippingInr === 0 ? "Free" : formatRupee(shippingInr)}</span>
                  </div>
                  <div className="flex justify-between text-[#666666]">
                    <span>Estimated Tax</span>
                    <span>{formatRupee(taxInr)}</span>
                  </div>
                  <div className="flex justify-between text-[#111111] font-medium pt-2 border-t border-[#e5e5e5]">
                    <span>Total</span>
                    <span>{formatRupee(totalInr)}</span>
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

            <div className="w-full space-y-6 sm:space-y-10 order-2 lg:order-1">
              <section>
                <h2 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-[#111111] mb-4 sm:mb-5">
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
                <h2 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-[#111111] mb-4 sm:mb-5">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        required
                        defaultValue={user?.name?.split(" ")[0] || ""}
                        className={inputClass}
                      />
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <h2 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-[#111111] mb-4 sm:mb-5">
                  Payment
                </h2>
                <div className="glass p-4 sm:p-6 space-y-5">
                  <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={cn(
                          "shrink-0 w-[42%] min-[375px]:w-[38%] sm:w-auto text-left p-3 border transition-all duration-300 min-h-[56px]",
                          paymentMethod === method.id
                            ? "border-[#111111] bg-[#f5f5f5]"
                            : "border-[#e5e5e5] hover:border-[#cccccc]"
                        )}
                      >
                        <p className="text-xs text-[#111111] font-medium">{method.label}</p>
                        <p className="text-[10px] text-[#888888] mt-0.5">{method.desc}</p>
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
                                  ? "border-[#111111] text-[#111111] bg-[#f5f5f5]"
                                  : "border-[#e5e5e5] text-[#666666] hover:text-[#111111] hover:border-[#cccccc]"
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
                    <div className="p-4 border border-[#e5e5e5] bg-[#fafafa]">
                      <p className="text-sm text-[#111111] mb-1">Pay when your order arrives</p>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        Cash on Delivery is available for orders under {formatRupee(5000)}. A small
                        handling fee of {formatRupee(49)} may apply.
                      </p>
                    </div>
                  )}

                  <p className="text-[10px] text-[#71717a] tracking-wide">
                    Demo checkout — no real payment will be processed.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </form>
      </Container>

      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-[#e5e5e5] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <div className="shrink-0">
            <p className="text-[10px] uppercase tracking-wider text-[#888888]">Total</p>
            <p className="text-lg font-bold text-[#111111]">{formatRupee(totalInr)}</p>
          </div>
          <Button
            type="submit"
            form="checkout-form"
            variant="primary"
            className="flex-1 min-h-[48px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
