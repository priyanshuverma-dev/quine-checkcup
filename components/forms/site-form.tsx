"use client";

import { fetchSite } from "@/actions";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { BiErrorCircle } from "react-icons/bi";
import SiteCard from "../site-card";
import { redirect, useRouter } from "next/navigation";

type Props = {};

const initialState = {
  message: "",
  error: false,
};
function SiteForm({}: Props) {
  const [state, formAction] = useFormState(fetchSite, initialState);
  const router = useRouter();

  if (state.message && !state.error) {
    router.push(state.message);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-8 flex justify-center">
        <form
          action={(fd) => {
            formAction(fd);
          }}
        >
          <FormFields />
        </form>
      </div>
      <div>
        {state.error && (
          <>
            <div className="flex justify-center h-8 flex-row w-full items-center px-2 my-2 bg-red-500/25 rounded-md">
              <BiErrorCircle className="text-red-500 mr-1" />
              <p className="leading-6 text-red-500">{state.message}</p>
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

  return (
    <>
      <input
        disabled={pending}
        aria-disabled={pending}
        type="text"
        name="url"
        placeholder="Enter your website URL"
        className="px-4 py-2 w-96 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      />
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="ml-2 px-4 py-2 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Check{pending ? "ing" : ""}
      </button>
    </>
  );
};
