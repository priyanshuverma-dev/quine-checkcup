"use server";
import { z } from "zod";
import db from "./lib/db";
import { BASE_ROUTE } from "./lib/utils";
import axios, { Axios } from "axios";

const SiteFormSchema = z.object({
  url: z.string().url({
    message:
      "Invalid URL. TIP - Make sure to include the protocol (http/https)",
  }),
});

type FormState = {
  message: string;
  error: boolean;
};

export async function fetchSite(prevState: FormState, formData: FormData) {
  const validatedFields = SiteFormSchema.safeParse({
    url: formData.get("url"),
  });
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
      error: true,
    };
  }
  const url = validatedFields.data.url;

  try {
    const alreadyExists = await db.site.findFirst({
      where: { url },
    });
    if (alreadyExists) {
      const res = await updateSite(prevState, formData);
      return res;
    }
    const res = await fetch(`${BASE_ROUTE}/api/site`, {
      body: JSON.stringify({ url }),
      method: "POST",
    });
    const data = await res.json();

    console.log("[TOP_HERE_RTTTTT]", res);

    if (res.status !== 200) {
      throw new Error(data.message);
    }
    const site = await db.site.create({
      data: {
        url,
        description: data.description,
        favicon: data.favicon,
        image: data.screenshot,
        status: data.status,
        title: data.title,
      },
    });
    return {
      message: `/site/${site.id}`,
      error: false,
    };
  } catch (error: any) {
    // console.error(error);
    return {
      message: error.message,
      error: true,
    };
  }
}

export async function updateSite(prevState: FormState, formData: FormData) {
  const validatedFields = SiteFormSchema.safeParse({
    url: formData.get("url"),
  });
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
      error: true,
    };
  }
  const url = validatedFields.data.url;

  try {
    const alreadyExists = await db.site.findFirst({
      where: { url },
    });
    if (!alreadyExists) {
      return {
        message: "Site not found",
        error: true,
      };
    }

    const res = await fetch(`${BASE_ROUTE}/api/site`, {
      body: JSON.stringify({ url }),
      method: "POST",
    });
    const data = await res.json();

    console.log("[TOP_HERE_RTTTTT]", res);

    if (res.status !== 200) {
      throw new Error(data.message);
    }
    const site = await db.site.update({
      where: {
        id: alreadyExists.id,
      },
      data: {
        url,
        description: data.description,
        favicon: data.favicon,
        image: data.screenshot,
        status: data.status,
        title: data.title,
      },
    });
    return {
      message: `/site/${site.id}`,
      error: false,
    };
  } catch (error: any) {
    // console.error(error);
    return {
      message: error.message,
      error: true,
    };
  }
}
