import SiteForm from "@/components/forms/site-form";
import Navbar from "@/components/navbar";
import SiteCard from "@/components/site-card";
import SoonMore from "@/components/soon-more-banner";
import db from "@/lib/db";
import React from "react";

type Props = {};

const SitePage = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);

  const data = await db.site.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!data) {
    return <div>Site not found</div>;
  }

  return (
    <>
      <Navbar />
      <SoonMore />
      <SiteForm />

      <SiteCard {...data} />
    </>
  );
};

export default SitePage;
