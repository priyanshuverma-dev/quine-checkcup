import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import { Site } from "@prisma/client";

const useSites = () => {
  const { data, error, isLoading } = useSWR(`/api/fetch-sites`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default useSites;
