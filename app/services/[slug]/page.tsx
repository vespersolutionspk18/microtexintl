import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDescription from "@/components/services/ServiceDescription";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceContent from "@/components/services/ServiceContent";
import { services, getServiceBySlug } from "@/components/services/serviceData";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.name} | Microtex International`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <main>
        <ServiceDetailHero service={service} />
        <ServiceDescription service={service} />
        <ServiceProcess service={service} />
        <ServiceContent service={service} />
      </main>
      <Footer />
    </>
  );
}
