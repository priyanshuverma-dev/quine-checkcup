"use client";
import useSites from "@/hooks/use-sites";
import { PLACEHOLDER_IMAGE_BASE64, cn } from "@/lib/utils";
import { useGlobalStore } from "@/store/global";
import { Site, Status } from "@prisma/client";
import moment from "moment";
import { Fragment } from "react";
import LoadingSkeleton from "./loading-skeleton";

const SiteList = () => {
  const globalStore = useGlobalStore();

  if (globalStore.isLoading) return <LoadingSkeleton />;

  if (globalStore.isLoading == false && globalStore.site == null) {
    return <Sites />;
  }

  return null;
};

export default SiteList;

const Sites = () => {
  const { data, error, isLoading } = useSites();
  console.log(data);

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading)
    return Array(3)
      .fill(0)
      .map((el, index) => (
        <div className="flex flex-row shadow-lg items-center gap-2 p-2 my-2 rounded border-2 border-gray-900/70">
          <div className="rounded-full bg-gray-900/90 w-[4.5rem] h-[4.5rem] animate-pulse"></div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-900/90 h-2 rounded-full animate-pulse" />
            <span className="w-9/12 bg-gray-900/90 h-2 rounded-full animate-pulse" />
          </div>
        </div>
      ));

  return (
    <>
      {data.sites.map((site: Site) => (
        <Fragment key={site.id}>
          <div className="m-3 flex flex-col border border-gray-200 shadow-sm rounded-lg dark:border-gray-700 dark:shadow-slate-700/[.7]">
            {/* // Head  */}
            <div className="flex justify-between flex-row items-center p-2">
              <div className="flex flex-row justify-start items-center p-1.5 bg-neutral-800/55 border-2 border-neutral-800/[.7] rounded-full m-1 overflow-hidden overflow-ellipsis">
                <img
                  src={
                    site.favicon
                      ? site.favicon
                      : `data:image/*;base64, ${PLACEHOLDER_IMAGE_BASE64}`
                  }
                  className="w-6 h-6"
                  alt={`Favicon of ${site.url}`}
                />
                <p className="leading-6 pl-1 font-medium text-lg">{site.url}</p>
              </div>
              {/* <RefreshButton url={site.url} /> */}
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
                src={`data:image/*;base64, ${
                  site.image ? site.image : PLACEHOLDER_IMAGE_BASE64
                }`}
                alt={`Screenshot of ${site.url}`}
                loading="lazy"
                className="rounded-lg w-full h-full object-center"
              />
              <div className="px-2">
                <p className="text-lg font-medium py-2">
                  {site.title ?? "No title"}
                </p>
                <p className="text-sm">
                  {site.description?.substring(0, 180) ?? "No description"}..
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};
