import { getDb, resetMongoClient } from "@/lib/mongodb";
import { memorySaveOtp, memoryVerifyOtp } from "@/lib/otp-store";

export type AuthUser = {
  email: string;
  name?: string;
  phone?: string;
};

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_COOLDOWN_MS = 60 * 1000;

function shouldUseMemoryOtp() {
  return (
    process.env.AUTH_OTP_MEMORY === "true" ||
    (process.env.NODE_ENV === "development" && process.env.AUTH_OTP_MEMORY !== "false")
  );
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function saveOtpToDb(email: string, otp: string) {
  const db = await getDb();
  const now = new Date();

  const recent = await db.collection("auth_otps").findOne({
    email,
    createdAt: { $gte: new Date(now.getTime() - OTP_COOLDOWN_MS) },
  });

  if (recent) {
    throw new Error("Please wait 60 seconds before requesting another OTP");
  }

  await db.collection("auth_otps").deleteMany({ email });

  await db.collection("auth_otps").insertOne({
    email,
    otp,
    expiresAt: new Date(now.getTime() + OTP_TTL_MS),
    createdAt: now,
  });
}

export async function saveEmailOtp(email: string, otp: string) {
  const normalized = normalizeEmail(email);

  if (shouldUseMemoryOtp()) {
    memorySaveOtp(normalized, otp);
    return;
  }

  try {
    await saveOtpToDb(normalized, otp);
  } catch (error) {
    console.warn("MongoDB OTP save failed, using memory store:", error);
    resetMongoClient();
    memorySaveOtp(normalized, otp);
  }
}

async function verifyOtpInDb(email: string, otp: string, name?: string): Promise<AuthUser> {
  const db = await getDb();
  const now = new Date();

  const record = await db.collection("auth_otps").findOne({
    email,
    otp,
    expiresAt: { $gte: now },
  });

  if (!record) {
    throw new Error("Invalid or expired OTP");
  }

  await db.collection("auth_otps").deleteMany({ email });

  const existing = await db.collection("users").findOne({ email });

  if (existing) {
    await db.collection("users").updateOne(
      { email },
      { $set: { lastLoginAt: now, ...(name?.trim() ? { name: name.trim() } : {}) } }
    );
  } else {
    await db.collection("users").insertOne({
      email,
      name: name?.trim() || email.split("@")[0],
      createdAt: now,
      lastLoginAt: now,
    });
  }

  const user = await db.collection("users").findOne({ email });

  return {
    email,
    name: (user?.name as string) || email.split("@")[0],
    phone: (user?.phone as string) || undefined,
  };
}

export async function verifyEmailOtp(email: string, otp: string, name?: string): Promise<AuthUser> {
  const normalized = normalizeEmail(email);

  if (shouldUseMemoryOtp()) {
    memoryVerifyOtp(normalized, otp);
    return {
      email: normalized,
      name: name?.trim() || normalized.split("@")[0],
    };
  }

  try {
    return await verifyOtpInDb(normalized, otp, name);
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid or expired OTP") {
      try {
        memoryVerifyOtp(normalized, otp);
        return {
          email: normalized,
          name: name?.trim() || normalized.split("@")[0],
        };
      } catch {
        throw error;
      }
    }

    console.warn("MongoDB verify failed, trying memory store:", error);
    resetMongoClient();
    memoryVerifyOtp(normalized, otp);
    return {
      email: normalized,
      name: name?.trim() || normalized.split("@")[0],
    };
  }
}
