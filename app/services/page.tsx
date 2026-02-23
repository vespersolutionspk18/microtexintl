import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesCatalog from "@/components/services/ServicesCatalog";

export const metadata = {
  title: "Services | Microtex International",
  description:
    "Upgradation, format conversion kits, support services and machine rebuilding from Microtex International.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesCatalog />
      </main>
      <Footer />
    </>
  );
}
