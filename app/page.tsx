import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import TechnologySequence from "@/components/TechnologySequence";

import ExpertisesOverview from "@/components/ExpertisesOverview";

import FeatureCards from "@/components/FeatureCards";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <TechnologySequence />
        {/* HomeFeatures removed */}
        <ExpertisesOverview />

        <FeatureCards />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}
