import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const browserWSEndpoint = `https://production-sfo.browserless.io?token=${process.env.BROWSERLESS_API_KEY}`;
const getBrowser = async () =>
  IS_PRODUCTION
    ? puppeteer.connect({ browserWSEndpoint })
    : puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    const data = await page.goto(url, { waitUntil: "networkidle0" });

    const status = () => {
      switch (data?.status()) {
        case 200:
          return Status.ACTIVE;
        case 404:
          return Status.INACTIVE;
        case 500:
          return Status.ERROR;
        default:
          return Status.UNKOWN;
      }
    };
    const title = await page.title();
    const description = await page
      .$eval('meta[name="description"]', (element) =>
        element.getAttribute("content")
      )
      .catch(() => null);
    const favicon = await page
      .$eval('link[rel="icon"]', (element) => element.getAttribute("href"))
      .catch(() => null);
    const screenshot = await page.screenshot({ encoding: "base64" });

    await browser.close();

    console.log("[SITE_ROUTE_SUCCESS]", { url, title, description });

    return NextResponse.json({
      status: status(),
      title,
      description,
      favicon,
      screenshot,
      fetchedAt: Date.now(),
    });
  } catch (error: any) {
    console.log("[SITE_ROUTE_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
