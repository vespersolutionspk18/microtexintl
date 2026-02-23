import Header from "@/components/Header";
import NewsHero from "@/components/news/NewsHero";
import NewsContent from "@/components/news/NewsContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "News | Microtex Industries",
  description:
    "Latest news, product updates and industry insights from Microtex Industries.",
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <NewsHero />
      <NewsContent />
      <Footer />
    </>
  );
}
