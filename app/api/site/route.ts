import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, description, favicon, image, status, title } =
      await req.json();

    if (!url) {
      throw new Error("URL is required");
    }

    const alreadyExists = await db.site.findUnique({
      where: { url },
    });

    if (alreadyExists) {
      const updateRecord = await db.site.update({
        where: { id: alreadyExists.id },
        data: {
          description,
          favicon,
          image,
          status,
          title,
        },
      });

      return NextResponse.json({ id: updateRecord.id }, { status: 200 });
    }

    const record = await db.site.create({
      data: {
        url,
        description,
        favicon,
        image,
        status,
        title,
      },
    });

    return NextResponse.json({ id: record.id }, { status: 200 });
  } catch (error: any) {
    console.log("[SITE_ROUTE_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
