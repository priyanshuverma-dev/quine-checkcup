import { updateSite } from "@/actions";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { Status } from "@prisma/client";
import React, { Fragment } from "react";
import { IoReload } from "react-icons/io5";
import RefreshButton from "./forms/refresh-site";
import moment from "moment";

type Props = {};

const SiteList = async (props: Props) => {
  const sites = await db.site.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      {sites.map((site) => (
        <Fragment key={site.id}>
          <div className="m-3 flex flex-col border border-gray-200 shadow-sm rounded-lg dark:border-gray-700 dark:shadow-slate-700/[.7]">
            {/* // Head  */}
            <div className="flex justify-between flex-row items-center p-2">
              <div className="flex flex-row justify-start items-center p-1.5 bg-neutral-800/55 border-2 border-neutral-800/[.7] rounded-full m-1">
                <img
                  src={site.favicon ?? "/next.svg"}
                  className="w-6 h-6"
                  alt={`Favicon of ${site.url}`}
                />
                <p className="leading-6 pl-1 font-medium text-lg">{site.url}</p>
              </div>
              <RefreshButton url={site.url} />
            </div>

            <div className="my-2">
              <span
                className={cn(
                  "mx-2 py-1.5 px-4 rounded-full text-xs font-medium",
                  site.status === Status.ACTIVE
                    ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
                    : site.status === Status.INACTIVE
                    ? "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
                    : site.status === Status.ERROR
                    ? "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500"
                )}
              >
                Website is {site.status}
              </span>
              <span className="py-1.5 px-4 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
                Fetched at: {moment(site.updatedAt).fromNow()}
              </span>
            </div>
            {/* // Body */}

            <div className="p-2 flex items-start justify-start flex-col">
              <img
                src={`data:image/*;base64, ${site.image}`}
                alt={`Screenshot of ${site.url}`}
                loading="lazy"
                className="rounded-lg w-full h-full object-center"
              />
              <div className="px-2">
                <p className="text-lg font-medium py-2">{site.title}</p>
                <p className="text-sm">
                  {site.description?.substring(0, 180)}..
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default SiteList;
