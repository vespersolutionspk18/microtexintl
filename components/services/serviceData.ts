export interface ServiceSection {
  title: string;
  body: string;
}

export interface ServiceHighlight {
  value: string;
  label: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  image: string;
  secondaryImage: string;
  highlights: ServiceHighlight[];
  process: ProcessStep[];
  sections: ServiceSection[];
  equipmentList?: string[];
  category: string;
}

export const services: Service[] = [
  {
    id: "upgradation",
    slug: "upgradation",
    name: "Upgradation & Installation",
    tagline:
      "We provide extensive installation & up-gradation protocol services alongside expert training for our clients.",
    description:
      "Microtex has a proven track record in delivering High Quality Machinery, Spare Parts and Support for your Making & Packaging Solutions. We provide best possible solutions to give you a competitive edge.",
    longDescription:
      "Our upgradation and installation services are designed to maximise the return on your existing capital investment. Rather than replacing entire production lines, our field service engineers upgrade individual machines and subsystems to meet current production standards — delivering modern performance from proven platforms. Every project follows a rigorous protocol: site audit, engineering specification, component sourcing, installation, calibration, testing and operator certification.",
    heroImage: "/services/upgradation.jpg",
    image:
      "https://microtex.co/wp-content/uploads/2020/09/the-laser-cuts-spark-production-4398315.jpg",
    secondaryImage:
      "https://microtex.co/wp-content/uploads/2020/09/machine-perforated-cnc-5446222.jpg",
    category: "Installation",
    highlights: [
      { value: "200+", label: "Installations completed" },
      { value: "48hr", label: "Average turnaround" },
      { value: "99.5%", label: "First-time success rate" },
    ],
    process: [
      {
        title: "Ask",
        description:
          "Identify your requirements, production targets and operational constraints through detailed consultation.",
      },
      {
        title: "Research",
        description:
          "Analyse the existing machinery condition, production data and facility layout to establish a baseline.",
      },
      {
        title: "Imagine",
        description:
          "Develop multiple upgrade scenarios with cost-benefit analysis for each approach.",
      },
      {
        title: "Plan",
        description:
          "Select the optimal solution, source components and create a detailed implementation schedule.",
      },
      {
        title: "Create",
        description:
          "Manufacture bespoke components and assemblies to exact specifications in our precision workshop.",
      },
      {
        title: "Test",
        description:
          "Commission the upgraded equipment with full calibration, safety checks and performance validation.",
      },
      {
        title: "Improve",
        description:
          "Monitor production data post-installation and fine-tune parameters for peak efficiency.",
      },
    ],
    sections: [
      {
        title: "Installation Protocol",
        body: "Our expert engineers follow rigorous installation protocols to ensure machinery is set up for optimal performance from day one. Every installation includes comprehensive calibration, safety checks and integration testing. We work to minimise production downtime by scheduling installations during planned maintenance windows wherever possible.",
      },
      {
        title: "Equipment Upgradation",
        body: "We specialise in upgrading existing production lines with the latest technology, improving throughput, reducing waste and extending machine lifecycle without the cost of full replacement. Our upgrades cover everything from control system modernisation to mechanical component replacement and sensor integration.",
      },
      {
        title: "Operator Training",
        body: "Every installation and upgrade includes hands-on operator training delivered by our field service engineers. We ensure your team is fully equipped to run, maintain and troubleshoot the machinery. Training covers daily operation, basic maintenance, fault diagnosis and safety procedures — delivered both on-site and through comprehensive documentation.",
      },
      {
        title: "Integration Services",
        body: "We provide seamless integration of new equipment into existing production lines, ensuring compatibility with upstream and downstream machinery for uninterrupted workflow. Our engineers handle PLC programming, signal interfacing and synchronisation to create a cohesive production system.",
      },
      {
        title: "Site Audit & Assessment",
        body: "Before any installation begins, our team conducts a thorough site audit covering floor space, power supply, compressed air capacity, environmental conditions and existing equipment interfaces. This ensures zero surprises during implementation and optimal placement for operator access and maintenance.",
      },
      {
        title: "Post-installation Support",
        body: "Our commitment extends well beyond the installation date. We provide ongoing technical support, remote diagnostics assistance and scheduled follow-up visits to ensure your equipment continues to perform at peak specification. Service contracts are available for extended peace of mind.",
      },
    ],
  },
  {
    id: "conversion-kits",
    slug: "conversion-kits",
    name: "Format & Conversion Kits",
    tagline:
      "We provide solutions that allow up-gradation of existing equipment via installation and integration of new format & conversion kits.",
    description:
      "When it comes to new product market trends and manufacturing demands, Microtex International has a specific service that will allow you to upgrade your existing equipment with new formats by installing new format & conversion kits.",
    longDescription:
      "Our format and conversion kits are precision-engineered to enable rapid product changeovers on your existing machinery. Each kit is designed, manufactured and tested to the same tolerances as OEM components — ensuring zero compromise on production quality, speed or reliability. We maintain an extensive library of format specifications covering all major machine types, allowing us to deliver kits with industry-leading turnaround times.",
    heroImage: "/services/conversion-kits.jpg",
    image:
      "https://microtex.co/wp-content/uploads/2020/09/machine-perforated-cnc-5446222.jpg",
    secondaryImage:
      "https://microtex.co/wp-content/uploads/2020/06/Asset-3-2048x1116.png",
    category: "Conversion",
    highlights: [
      { value: "8+", label: "Machine types supported" },
      { value: "<15", label: "Min changeover time" },
      { value: "100%", label: "OEM-grade precision" },
    ],
    equipmentList: [
      "Cigarette Making Machines — MK8, MK9, MAX 3/5 & MAX-S",
      "Cigarette Packer (HLP) Hinge Lid Packer",
      "GD Wrappers",
      "Scandia Wrapper",
      "CP1",
      "Sasib 3000/4000/5000/6000",
      "High Speed Boxer",
      "Over Wrapper",
    ],
    process: [
      {
        title: "Requirement",
        description:
          "Define the target product format, dimensions and material specifications for the new configuration.",
      },
      {
        title: "Analysis",
        description:
          "Audit the existing machine configuration and identify all components requiring modification or replacement.",
      },
      {
        title: "Design",
        description:
          "Engineer the conversion kit with full 3D modelling, tolerance analysis and material selection.",
      },
      {
        title: "Manufacture",
        description:
          "Precision-machine all components using CNC equipment with strict quality control at every stage.",
      },
      {
        title: "Assembly",
        description:
          "Assemble and pre-fit the complete kit in our workshop to verify dimensional accuracy before dispatch.",
      },
      {
        title: "Installation",
        description:
          "On-site fitting by our field engineers with full calibration, testing and operator walkthrough.",
      },
      {
        title: "Validation",
        description:
          "Run production trials to validate output quality, speed and consistency against specification.",
      },
    ],
    sections: [
      {
        title: "Format Change Solutions",
        body: "Our conversion kits enable rapid format changes across your production line, allowing you to respond to market demands without investing in entirely new machinery. Each kit is designed as a complete drop-in package with all necessary guides, tooling and adjustment components.",
      },
      {
        title: "Precision Engineering",
        body: "Every conversion kit is precision-engineered to exact specifications using CNC machinery and rigorous quality control processes. We guarantee perfect compatibility and zero compromise on production quality or speed — matching or exceeding OEM tolerances on every component.",
      },
      {
        title: "Comprehensive Compatibility",
        body: "We specialise in format kits for a wide range of machinery including cigarette makers, packers, wrappers, boxers and case packers from all major manufacturers. Our engineering library covers thousands of format combinations across multiple machine generations.",
      },
      {
        title: "Turnkey Delivery",
        body: "Each kit comes with full documentation, installation support and operator training to minimise changeover time and get your line running at full capacity. We handle everything from initial specification through to on-site commissioning.",
      },
      {
        title: "Rapid Turnaround",
        body: "Our dedicated manufacturing facility and extensive component inventory allow us to deliver standard format kits within weeks, not months. For urgent requirements, we offer expedited production schedules to minimise your production line downtime.",
      },
      {
        title: "Quality Assurance",
        body: "Every kit undergoes comprehensive quality checks including dimensional verification, material certification and pre-assembly testing. We provide full traceability documentation and a warranty on all components supplied.",
      },
    ],
  },
  {
    id: "rebuilding",
    slug: "rebuilding",
    name: "Support & Rebuilding",
    tagline:
      "Based on our extensive experience, Microtex International can bring your existing machine back to life.",
    description:
      "We focus on delivering high quality standards for assembly, finishing, inspection and testing processes. We also provide installation protocol services and expert training for our clients.",
    longDescription:
      "Our rebuilding services go far beyond simple replacement of worn parts. We perform a complete strip-down of the entire machine, inspect every component against original specifications, replace all items that fall outside tolerance, and then re-assemble to factory standards. The result is a machine that performs like new — at a fraction of the cost of a replacement. Every rebuild comes with comprehensive documentation, updated manuals and a full warranty.",
    heroImage: "/services/rebuilding.jpg",
    image:
      "https://microtex.co/wp-content/uploads/2020/09/milling-machine-tool-cnc-1137956.jpg",
    secondaryImage:
      "https://microtex.co/wp-content/uploads/2020/09/the-laser-cuts-spark-production-4398315.jpg",
    category: "Rebuilding",
    highlights: [
      { value: "50+", label: "Machines rebuilt" },
      { value: "60%", label: "Cost saving vs new" },
      { value: "12mo", label: "Rebuild warranty" },
    ],
    process: [
      {
        title: "Audit",
        description:
          "Detailed inspection of the donor machine by experienced field service personnel to establish condition.",
      },
      {
        title: "Report",
        description:
          "Comprehensive condition report with photographic evidence, identifying all components requiring attention.",
      },
      {
        title: "Strip-down",
        description:
          "Complete disassembly of the machine with systematic cataloguing and cleaning of all components.",
      },
      {
        title: "Inspection",
        description:
          "Every component measured and checked against original drawings and tolerance specifications.",
      },
      {
        title: "Replace",
        description:
          "All worn, damaged or out-of-tolerance parts replaced with new precision-manufactured components.",
      },
      {
        title: "Re-assemble",
        description:
          "Machine rebuilt to factory standards with updated bearings, seals, electrical components and control systems.",
      },
      {
        title: "Commission",
        description:
          "Full testing, calibration and performance validation before handover with complete documentation package.",
      },
    ],
    sections: [
      {
        title: "Full Rebuilding Services",
        body: "Our Rebuilding services are not just limited to the replacements — we do a complete strip-down, replacement of all worn parts and then re-assemble them by keeping OEM standards strictly in view. Our fast-paced team always keeps their knowledge up to date and incorporates the latest innovations to make rebuilt machines compatible with current production demands. All rebuild packages come with complete manuals and catalogues for the parts.",
      },
      {
        title: "Functional Rebuild",
        body: "As an alternative to the full rebuild, we offer a functional rebuild service. The level of this service is dependent on the condition of the donor machine, which is established following a detailed audit by competent and experienced Field Service personnel. A functional rebuild targets the key wear areas while leaving serviceable components in place — delivering significant performance improvement at lower cost.",
      },
      {
        title: "Scheduled Maintenance",
        body: "The cigarette making, packing and handling machines demand that all equipment receives regular servicing by skilled technicians if peak performance is to be maintained. Our maintenance teams bring deep expertise in all major machine platforms, ensuring your equipment receives the specialist attention it requires.",
      },
      {
        title: "Preventative Maintenance",
        body: "Preventative Maintenance is the service recommended for our complete product range to avoid problems before they occur. By ensuring that machines are kept running at optimum efficiency and systems are maintained at their original design specifications, unplanned stoppages can be virtually eliminated. This work is normally carried out under the terms of a Service Contract — a visual inspection, together with a full mechanical and electrical service, conducted at regular intervals throughout the year.",
      },
      {
        title: "Emergency Response",
        body: "When unplanned breakdowns occur, our rapid-response engineering team is available to provide remote diagnostic support and on-site emergency repair services. We maintain strategic inventory of critical spare parts to minimise downtime and get your production line back up and running as quickly as possible.",
      },
      {
        title: "Service Contracts",
        body: "Our flexible service contracts provide scheduled maintenance visits, priority emergency response, discounted spare parts and dedicated account management. Contracts are tailored to your specific equipment portfolio and production schedule, ensuring maximum uptime with predictable maintenance costs.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
