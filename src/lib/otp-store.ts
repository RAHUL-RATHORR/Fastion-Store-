type OtpEntry = {
  otp: string;
  expiresAt: number;
  createdAt: number;
};

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_COOLDOWN_MS = 60 * 1000;

const store = new Map<string, OtpEntry>();

export function memorySaveOtp(email: string, otp: string) {
  const now = Date.now();
  const existing = store.get(email);

  if (existing && now - existing.createdAt < OTP_COOLDOWN_MS) {
    throw new Error("Please wait 60 seconds before requesting another OTP");
  }

  store.set(email, {
    otp,
    expiresAt: now + OTP_TTL_MS,
    createdAt: now,
  });
}

export function memoryVerifyOtp(email: string, otp: string) {
  const entry = store.get(email);

  if (!entry || entry.expiresAt < Date.now() || entry.otp !== otp) {
    throw new Error("Invalid or expired OTP");
  }

  store.delete(email);
}
