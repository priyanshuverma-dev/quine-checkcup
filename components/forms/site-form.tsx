"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { BiErrorCircle } from "react-icons/bi";
import SiteCard from "../site-card";
import { redirect, useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BASE_ROUTE, cn } from "@/lib/utils";

function SiteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      url: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const { url } = values;
      console.log("[FORM_VALUES]", values);
      const scrapedRes = await fetch(
        `https://quine-checkcup-server.onrender.com/api/site`,
        {
          body: JSON.stringify({ url }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await scrapedRes.json();
      console.log("[SCRAPE_DATA]", data);

      if (scrapedRes.status !== 200) {
        throw new Error(data.message);
      }

      const StoreRes = await fetch("/api/site", {
        method: "POST",
        body: JSON.stringify({
          url,
          description: data.description,
          favicon: data.favicon,
          image: data.screenshot,
          status: data.status,
          title: data.title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const storeData = await StoreRes.json();

      console.log("[STORE_DATA]", storeData);

      if (StoreRes.status !== 200) {
        throw new Error(storeData.message);
      }

      router.push(`/site/${storeData.id}`);
    } catch (error: any) {
      console.error(error);

      setError("url", {
        type: "manual",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // if (state.message && !state.error) {
  //   router.push(state.message);
  // }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="mt-8 flex justify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center w-full"
        >
          <input
            disabled={isLoading}
            aria-disabled={isLoading}
            {...register("url", { required: true })}
            type="url"
            name="url"
            placeholder="Enter your website URL"
            className={cn(
              "px-4 py-2 w-[100%] rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
              errors["url"] && "focus:ring-rose-500"
            )}
          />
          <button
            type="submit"
            disabled={isLoading}
            aria-disabled={isLoading}
            className={cn(
              "ml-2 px-4 py-2 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
              isLoading && "opacity-50 cursor-default"
            )}
          >
            Check{isLoading ? "ing" : ""}
          </button>
        </form>
      </div>
      <div>
        <div className="flex justify-center h-8 flex-row w-full items-center px-2 my-2rounded-md">
          <BiErrorCircle className="text-teal-700 mr-1" />
          <p className="leading-6 text-teal-700">
            It can take upto 1-2 minutes to fetch status.
          </p>
        </div>
        {errors["url"] && (
          <>
            <div className="flex justify-center h-8 flex-row w-full items-center px-2 my-2 bg-red-500/25 rounded-md">
              <BiErrorCircle className="text-red-500 mr-1" />
              <p className="leading-6 text-red-500">
                {errors["url"].message?.toString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SiteForm;

const FormFields = () => {
  const { pending } = useFormStatus();

  return <></>;
};
