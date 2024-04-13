import SiteForm from "@/components/forms/site-form";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import SoonMore from "@/components/soon-more-banner";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SoonMore />

      <SiteForm />
    </>
  );
}
