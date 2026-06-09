import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail, verifyEmailOtp } from "@/lib/auth";

type Body = {
  email?: string;
  otp?: string;
  name?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const email = normalizeEmail(body.email || "");
    const otp = String(body.otp || "").trim();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: "Enter the 6-digit OTP" }, { status: 400 });
    }

    const user = await verifyEmailOtp(email, otp, body.name);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Verification failed" },
      { status: 400 }
    );
  }
}
