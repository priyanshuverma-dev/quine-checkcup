import CenterContainer from "@/components/center-container";
import SiteForm from "@/components/forms/site-form";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import SiteList from "@/components/site-list";
import SoonMore from "@/components/soon-more-banner";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CenterContainer>
        <SiteForm />
        <SoonMore />
        <SiteList />
      </CenterContainer>
    </>
  );
}
