import nodemailer from "nodemailer";

export async function sendOtpEmail(email: string, otp: string) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s/g, "");

  if (!host || !user || !pass) {
    throw new Error("SMTP not configured. Add SMTP_USER and SMTP_PASS (Gmail App Password) to .env");
  }

  const port = Number(process.env.SMTP_PORT || 587);

  const allowInvalidTls =
    process.env.SMTP_TLS_ALLOW_INVALID === "true" ||
    (process.env.NODE_ENV === "development" && process.env.SMTP_TLS_ALLOW_INVALID !== "false");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    tls: {
      minVersion: "TLSv1.2",
      ...(allowInvalidTls ? { rejectUnauthorized: false } : {}),
    },
  });

  const from = process.env.SMTP_FROM || `GILZOD <${user}>`;

  await transporter.sendMail({
    from,
    to: email,
    subject: "Your GILZOD Login OTP",
    text: `Your GILZOD login OTP is ${otp}. Valid for 10 minutes. Do not share this code.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;color:#111;padding:24px;">
        <h1 style="font-size:20px;margin-bottom:12px;">GILZOD Login</h1>
        <p style="color:#555;margin-bottom:20px;">Use this one-time password to sign in to your account:</p>
        <p style="font-size:32px;letter-spacing:8px;font-weight:bold;color:#111;margin:24px 0;">${otp}</p>
        <p style="color:#888;font-size:13px;">Valid for 10 minutes. Do not share this code with anyone.</p>
      </div>
    `,
  });
}
