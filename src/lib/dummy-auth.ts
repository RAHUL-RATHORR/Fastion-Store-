import type { User } from "@/context/AuthContext";

/** Quick phone-only session — no profile / OTP. */
export function buildDummyUserFromPhone(phone: string): User | null {
  const trimmedPhone = phone.replace(/\D/g, "").slice(-10);
  if (trimmedPhone.length < 10) return null;

  return {
    phone: trimmedPhone,
    name: `+91 ${trimmedPhone}`,
    email: `${trimmedPhone}@gilzod.phone`,
  };
}

export function isPhoneOnlyUser(user: User) {
  return user.email.endsWith("@gilzod.phone");
}
