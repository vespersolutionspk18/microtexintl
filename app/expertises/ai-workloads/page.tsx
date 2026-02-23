import Header from "@/components/Header";
import AIHero from "@/components/ai-workloads/AIHero";
import AIProblem from "@/components/ai-workloads/AIProblem";
import AIExpertiseIntro from "@/components/ai-workloads/AIExpertiseIntro";
import AIFeatureCards from "@/components/ai-workloads/AIFeatureCards";
import AICopy from "@/components/ai-workloads/AICopy";
import AITestimonials from "@/components/ai-workloads/AITestimonials";
import AIDeployment from "@/components/ai-workloads/AIDeployment";
import AIExpertiseBlocks from "@/components/ai-workloads/AIExpertiseBlocks";
import AIScene from "@/components/ai-workloads/AIScene";
import AINextProject from "@/components/ai-workloads/AINextProject";
import Footer from "@/components/Footer";

export default function AIWorkloadsPage() {
  return (
    <>
      <Header />
      <main>
        <AIHero />
        <AIProblem />
        <AIScene />
        <AIExpertiseBlocks>
          <AIExpertiseIntro />
          <AIFeatureCards />
          <AICopy />
          <AITestimonials />
          <AIDeployment />
        </AIExpertiseBlocks>
        <AINextProject />
      </main>
      <Footer />
    </>
  );
}
