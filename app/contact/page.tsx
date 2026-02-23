import Header from "@/components/Header";
import ContactIntro from "@/components/ContactIntro";
import ContactAutoOpen from "@/components/ContactAutoOpen";
import ContactLocations from "@/components/ContactLocations";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <ContactAutoOpen />
      <Header />
      <main>
        <ContactIntro />
        <ContactLocations />
      </main>
      <Footer />
    </>
  );
}
