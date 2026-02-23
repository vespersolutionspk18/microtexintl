import Header from "@/components/Header";
import TeamHero from "@/components/TeamHero";
import TeamIntro from "@/components/TeamIntro";
import TeamLeadership from "@/components/TeamLeadership";
import TeamFullBleedImage from "@/components/TeamFullBleedImage";
import TeamPerks from "@/components/TeamPerks";
import TeamList from "@/components/TeamList";
import Footer from "@/components/Footer";

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <TeamHero />
        <TeamIntro />
        <TeamLeadership />
        <TeamFullBleedImage />
        <TeamPerks />
        <TeamList />
      </main>
      <Footer />
    </>
  );
}
