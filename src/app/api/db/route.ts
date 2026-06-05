import { NextResponse } from "next/server";
import { getClient, getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await getClient();
    await client.db("admin").command({ ping: 1 });
    const db = await getDb();
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      ok: true,
      message: "MongoDB connected",
      database: db.databaseName,
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Connection failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
