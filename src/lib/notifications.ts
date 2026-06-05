import nodemailer from "nodemailer";
import type { PlacedOrder } from "@/lib/order";
import { formatPrice } from "@/lib/utils";

type NotifyTargets = {
  emails: string[];
  phones: string[];
};

type ChannelResult = {
  sent: boolean;
  targets: string[];
  error?: string;
};

type NotificationResult = {
  email: ChannelResult;
  sms: ChannelResult;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
  if (phone.trim().startsWith("+")) return phone.trim();
  return digits ? `+${digits}` : "";
}

export function collectNotifyTargets(
  order: PlacedOrder,
  login?: { email?: string; phone?: string }
): NotifyTargets {
  const emails = new Set<string>();
  const phones = new Set<string>();

  if (order.customer.email) emails.add(normalizeEmail(order.customer.email));
  if (order.customer.phone) {
    const p = normalizePhone(order.customer.phone);
    if (p) phones.add(p);
  }

  if (login?.email) emails.add(normalizeEmail(login.email));
  if (login?.phone) {
    const p = normalizePhone(login.phone);
    if (p) phones.add(p);
  }

  return {
    emails: [...emails].filter(Boolean),
    phones: [...phones].filter(Boolean),
  };
}

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "http://localhost:3000"
  );
}

function buildEmailHtml(order: PlacedOrder) {
  const trackUrl = `${getSiteUrl()}/orders/${order.orderId}`;
  const itemsHtml = order.items
    .map(
      (item) =>
        `<li style="margin-bottom:8px;">${item.name} (Size ${item.size}) × ${item.quantity} — ${formatPrice(item.price * item.quantity)}</li>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#111;">
      <h1 style="font-size:22px;margin-bottom:8px;">Order Confirmed — GILZOD</h1>
      <p style="color:#555;margin-bottom:20px;">Hi ${order.customer.name}, your order has been placed successfully.</p>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
      <p><strong>Expected Delivery:</strong> ${order.deliveryDate}</p>
      <p><strong>Payment:</strong> ${order.paymentLabel}</p>
      <h3 style="margin-top:24px;font-size:16px;">Items</h3>
      <ul style="padding-left:18px;color:#333;">${itemsHtml}</ul>
      <p style="margin-top:24px;">
        <a href="${trackUrl}" style="display:inline-block;background:#111;color:#fff;padding:12px 20px;text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Track Order</a>
      </p>
      <p style="margin-top:28px;font-size:12px;color:#888;">Thank you for shopping with GILZOD.</p>
    </div>
  `;
}

function buildSmsMessage(order: PlacedOrder) {
  const trackUrl = `${getSiteUrl()}/orders/${order.orderId}`;
  return `GILZOD: Order ${order.orderId} confirmed! Total ${formatPrice(order.total)}. Delivery by ${order.deliveryDate}. Track: ${trackUrl}`;
}

async function sendEmail(order: PlacedOrder, emails: string[]) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return { sent: false, targets: emails, error: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  const from = process.env.SMTP_FROM || `GILZOD <${user}>`;

  await transporter.sendMail({
    from,
    to: emails.join(", "),
    subject: `GILZOD Order Confirmed — ${order.orderId}`,
    text: `Your GILZOD order ${order.orderId} is confirmed. Total: ${formatPrice(order.total)}. Track: ${getSiteUrl()}/orders/${order.orderId}`,
    html: buildEmailHtml(order),
  });

  return { sent: true, targets: emails };
}

async function sendSmsTwilio(phones: string[], message: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!sid || !token || !from) {
    return { sent: false, targets: phones, error: "Twilio not configured" };
  }

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");

  await Promise.all(
    phones.map((phone) =>
      fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: phone,
          From: from,
          Body: message,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err);
        }
      })
    )
  );

  return { sent: true, targets: phones };
}

async function sendSmsMsg91(phones: string[], message: string) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const sender = process.env.MSG91_SENDER_ID || "GILZOD";

  if (!authKey) {
    return { sent: false, targets: phones, error: "MSG91 not configured" };
  }

  const mobiles = phones.map((p) => p.replace(/\D/g, "").replace(/^91/, "")).join(",");

  const res = await fetch(
    `https://control.msg91.com/api/sendhttp.php?${new URLSearchParams({
      authkey: authKey,
      mobiles,
      message,
      sender,
      route: process.env.MSG91_ROUTE || "4",
      country: "91",
    })}`
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return { sent: true, targets: phones };
}

async function sendSms(order: PlacedOrder, phones: string[]) {
  const message = buildSmsMessage(order);

  try {
    if (process.env.MSG91_AUTH_KEY) {
      return await sendSmsMsg91(phones, message);
    }
    return await sendSmsTwilio(phones, message);
  } catch (error) {
    return {
      sent: false,
      targets: phones,
      error: error instanceof Error ? error.message : "SMS failed",
    };
  }
}

export async function sendOrderNotifications(
  order: PlacedOrder,
  login?: { email?: string; phone?: string }
): Promise<NotificationResult> {
  const { emails, phones } = collectNotifyTargets(order, login);

  let emailResult: ChannelResult = { sent: false, targets: emails, error: "No email provided" };
  let smsResult: ChannelResult = { sent: false, targets: phones, error: "No phone provided" };

  if (emails.length > 0) {
    try {
      emailResult = await sendEmail(order, emails);
    } catch (error) {
      emailResult = {
        sent: false,
        targets: emails,
        error: error instanceof Error ? error.message : "Email failed",
      };
    }
  }

  if (phones.length > 0) {
    smsResult = await sendSms(order, phones);
  }

  return { email: emailResult, sms: smsResult };
}
