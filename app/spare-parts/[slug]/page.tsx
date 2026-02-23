import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SparePartDetailHero from "@/components/spare-parts/SparePartDetailHero";
import SparePartProducts from "@/components/spare-parts/SparePartProducts";
import SparePartSpecs from "@/components/spare-parts/SparePartSpecs";
import {
  categories,
  getCategoryBySlug,
} from "@/components/spare-parts/sparePartsData";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} | Microtex International`,
    description: category.description,
  };
}

export default async function SparePartDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <>
      <Header />
      <main>
        <SparePartDetailHero category={category} />
        <SparePartProducts category={category} />
        <SparePartSpecs category={category} />
      </main>
      <Footer />
    </>
  );
}
