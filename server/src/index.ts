import { serve } from "@hono/node-server";
import { Hono } from "hono";
import puppeteer from "puppeteer-core";

const app = new Hono();

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  UNKOWN = "UNKOWN",
  ERROR = "ERROR",
}

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const browserWSEndpoint = process.env.BROWSERLESS_WS_URL;
const getBrowser = async () => puppeteer.connect({ browserWSEndpoint });

app.post("/api/site", async (c) => {
  try {
    const { url } = await c.req.json();
    if (!url) {
      return c.json({ message: "Invalid URL" }, { status: 400 });
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

    return c.json({
      status: status(),
      title,
      description,
      favicon: favicon
        ? favicon.includes("http")
          ? favicon
          : `${url}${favicon}`
        : "",
      screenshot,
      fetchedAt: Date.now(),
    });
  } catch (error: any) {
    console.log("[SITE_ROUTE_ERROR]", error.message);
    return c.json({ message: error.message }, { status: 500 });
  }
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = Number(process.env.PORT) || 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
