import { Site, Status } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = {};

function SiteCard({ description, favicon, image, status, title }: Site) {
  return (
    <div className="m-3 flex flex-col border rounded-b-lg border-gray-200 shadow-sm rounded-sm dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="">
        <div className="p-4 md:p-6">
          <div className="flex items-center space-x-2">
            {favicon && (
              <>
                <p>Favicon</p>
                <img
                  src={favicon}
                  alt="site favicon"
                  className="w-6 h-6 my-2"
                />
              </>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 hover:cursor-pointer dark:text-gray-300 dark:hover:text-white">
            Title: {title}
          </h3>
          <p className="my-2 text-white min-h-[50px]  overflow-y-auto">
            Description: {description}
          </p>
          <span className="py-1.5 px-4 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
            Fetched at: {Date.now()}
          </span>
          <span
            className={clsx(
              "mx-2 py-1.5 px-4 rounded-full text-xs font-medium",
              status === Status.ACTIVE
                ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
                : status === Status.INACTIVE
                ? "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
                : status === Status.ERROR
                ? "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500"
            )}
          >
            {status}
          </span>
        </div>
        <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
          <h1 className="p-2">Site Screenshot</h1>
        </div>
        <img
          className="rounded-t-sm w-full h-full object-center rounded-lg"
          src={`data:image/*;base64, ${image}`}
          alt="Screenshot of the website"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default SiteCard;
