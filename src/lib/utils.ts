export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Catalog prices are stored as short units (e.g. 89 → ₹890). */
const PRICE_TO_INR = 10;

export function toInr(storedPrice: number) {
  return Math.round(storedPrice * PRICE_TO_INR);
}

export function formatRupee(amountInInr: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amountInInr));
}

/** Format a stored catalog price as Indian Rupees. */
export function formatPrice(storedPrice: number) {
  return formatRupee(toInr(storedPrice));
}

/** @deprecated Use formatPrice */
export const formatInr = formatPrice;
