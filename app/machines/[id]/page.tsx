import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MachineDetailHero from "@/components/machines/MachineDetailHero";
import MachineDescription from "@/components/machines/MachineDescription";
import MachineImageBreak from "@/components/machines/MachineImageBreak";
import MachineSpecs from "@/components/machines/MachineSpecs";
import MachineFeatures from "@/components/machines/MachineFeatures";
import { machines, getMachineBySlug } from "@/components/machines/machineData";

export function generateStaticParams() {
  return machines.map((m) => ({ id: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const machine = getMachineBySlug(id);
  if (!machine) return { title: "Machine Not Found" };
  return {
    title: `${machine.name} ${machine.model} | Microtex International`,
    description: machine.tagline,
  };
}

export default async function MachineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const machine = getMachineBySlug(id);
  if (!machine) notFound();

  return (
    <>
      <Header />
      <main>
        <MachineDetailHero machine={machine} />
        <MachineDescription machine={machine} />
        <MachineImageBreak
          src={machine.heroImage}
          alt={`${machine.name} production facility`}
          theme="dark"
          fullWidth
        />
        <MachineSpecs machine={machine} />
        <MachineImageBreak
          src={machine.showcaseImage}
          alt={`${machine.name} detail`}
          theme="light"
        />
        <MachineFeatures machine={machine} />
      </main>
      <Footer />
    </>
  );
}
