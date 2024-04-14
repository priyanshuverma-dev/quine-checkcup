import { Status } from "@prisma/client";
import puppeteer from "puppeteer-core";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const browserWSEndpoint = process.env.BROWSERLESS_WS_URL;
export const getBrowser = async () => puppeteer.connect({ browserWSEndpoint });

export type SiteResponse = {
  success: boolean;
  message?: string;
  data?: {
    status: Status;
    title: string;
    description: string;
    favicon: string;
    screenshot: string;
    fetchedAt: number;
  };
};

export const ScrapeSite = async ({ url }: { url: string }) => {
  try {
    if (!url) {
      return { message: "Invalid URL", success: false };
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
    const screenshot = await page
      .screenshot({ encoding: "base64" })
      .catch(() => null);

    await browser.close();

    return {
      data: {
        status: status(),
        title,
        description,
        favicon: favicon?.includes("http") ? favicon : `${url}${favicon}`,
        screenshot: screenshot || "",
        fetchedAt: Date.now(),
      },
      success: true,
    };
  } catch (error: any) {
    console.log("[SITE_ROUTE_ERROR]", error.message);
    return { message: error.message, success: false };
  }
};
