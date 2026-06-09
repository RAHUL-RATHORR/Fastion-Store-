import { NextResponse } from "next/server";
import { generateOtp, isValidEmail, normalizeEmail, saveEmailOtp } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/email";

type Body = {
  method?: "email" | "phone";
  email?: string;
  phone?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;

    if (body.method === "phone") {
      return NextResponse.json(
        { error: "Phone OTP coming soon. Please use Email login for now." },
        { status: 400 }
      );
    }

    const email = normalizeEmail(body.email || "");

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    const otp = generateOtp();
    await saveEmailOtp(email, otp);
    await sendOtpEmail(email, otp);

    return NextResponse.json({
      success: true,
      message: `OTP sent to ${email}`,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    const message = error instanceof Error ? error.message : "Failed to send OTP";

    if (message.includes("535") || message.toLowerCase().includes("badcredentials")) {
      return NextResponse.json(
        {
          error:
            "Gmail login failed. Use a new App Password (not your normal Gmail password) in SMTP_PASS.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
