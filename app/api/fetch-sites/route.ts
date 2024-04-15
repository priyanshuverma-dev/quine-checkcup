import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sites = await db.site.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 7,
    });

    if (!sites) {
      return NextResponse.json({ message: "No sites found" }, { status: 404 });
    }

    return NextResponse.json({ sites }, { status: 200 });
  } catch (error: any) {
    console.error("Error in fetch-sites route: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
