import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import AboutMission from "@/components/AboutMission";
import AboutStory from "@/components/AboutStory";
import AboutStats from "@/components/AboutStats";

import AboutMilestones from "@/components/AboutMilestones";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutStory />
        <AboutStats />

        <AboutMilestones />
      </main>
      <Footer />
    </>
  );
}
