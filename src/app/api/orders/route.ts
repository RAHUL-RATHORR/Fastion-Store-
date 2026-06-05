import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { PlacedOrder } from "@/lib/order";
import { sendOrderNotifications } from "@/lib/notifications";

type OrderRequestBody = {
  order: PlacedOrder;
  loginEmail?: string;
  loginPhone?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequestBody;

    if (!body?.order?.orderId || !body?.order?.customer) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const { order, loginEmail, loginPhone } = body;

    try {
      const db = await getDb();
      await db.collection("orders").insertOne({
        ...order,
        loginEmail: loginEmail || null,
        loginPhone: loginPhone || null,
        savedAt: new Date(),
      });
    } catch (dbError) {
      console.error("Order DB save failed:", dbError);
    }

    const notifications = await sendOrderNotifications(order, {
      email: loginEmail,
      phone: loginPhone,
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      notifications,
    });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process order" },
      { status: 500 }
    );
  }
}
