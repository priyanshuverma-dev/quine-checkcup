import CenterContainer from "@/components/center-container";
import Footer from "@/components/footer";
import SiteForm from "@/components/forms/site-form";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import SiteList from "@/components/site-list";
import SoonMore from "@/components/soon-more-banner";

export default function Home() {
  return (
    <>
      <Navbar />
      <SoonMore />
      <Hero />
      <CenterContainer>
        <SiteForm />
        <SiteList />
        <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      </CenterContainer>
      <Footer />
    </>
  );
}
