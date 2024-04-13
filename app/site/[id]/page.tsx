import CenterContainer from "@/components/center-container";
import SiteForm from "@/components/forms/site-form";
import Navbar from "@/components/navbar";
import SiteCard from "@/components/site-card";
import SoonMore from "@/components/soon-more-banner";
import db from "@/lib/db";
import React from "react";

const SitePage = async ({ params }: { params: { id: string } }) => {
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
      <CenterContainer>
        <SoonMore />
        <SiteForm />
        <SiteCard {...data} />
      </CenterContainer>
    </>
  );
};

export default SitePage;
