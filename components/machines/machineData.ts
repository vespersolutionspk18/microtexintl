export interface MachineSpec {
  label: string;
  value: string;
}

export interface MachineFeature {
  title: string;
  description: string;
}

export interface MachineHighlight {
  value: string;
  label: string;
}

export interface Machine {
  id: string;
  slug: string;
  name: string;
  model: string;
  tagline: string;
  description: string;
  heroImage: string;
  showcaseImage: string;
  cardImage: string;
  productImage: string;
  output: string;
  category: string;
  specs: MachineSpec[];
  features: MachineFeature[];
  applications: string[];
  highlights: MachineHighlight[];
}

export const machines: Machine[] = [
  {
    id: "wrapper-machine",
    slug: "wrapper-machine",
    name: "Wrapper Machine",
    model: "MTI-W200-1",
    tagline: "High-speed turret wrapping for hard box and soft pack production lines.",
    description:
      "The MTI-W200-1 is a turret-style wrapper engineered for high-throughput packaging environments. Capable of up to 200 packs per minute, this machine handles hard box packs, shoulder boxes and soft cup packs with equal precision. Its reciprocating and retractable heaters, PLC-driven controls and faulty-pack rejection system ensure consistent quality at production speed.",
    heroImage:
      "/655c6cfb4f7d36ff71747561/67939cac929adeb300860216_metalworking-cnc-lathe-milling-machine-cutting-me-2023-11-27-05-16-13-utc (1)-p-2000.jpg",
    showcaseImage:
      "/655c6cfb4f7d36ff71747561/659eaca3da965823e60d5922_DSC07766.webp",
    cardImage: "/machines/wrapper-machine.png",
    productImage: "/machines/wrapper-machine.png",
    output: "200 PPM",
    category: "Wrapping",
    specs: [
      { label: "Output", value: "Up to 200 packs/min" },
      { label: "Products", value: "Hard Box, Shoulder Box, Soft Cup" },
      { label: "Packing Material", value: "Polypropylene" },
      { label: "Product Length", value: "70 \u2013 130 mm" },
      { label: "Product Width", value: "45 \u2013 65 mm" },
      { label: "Product Thickness", value: "18 \u2013 28 mm" },
      { label: "Floor Space", value: "200 \u00d7 135 cm" },
      { label: "Machine Height", value: "172 cm" },
      { label: "Power Supply", value: "380 V / 50 Hz / 3 Phase" },
      { label: "Compressed Air", value: "5 \u2013 6 Bar" },
    ],
    features: [
      {
        title: "Turret Style Mechanism",
        description:
          "Continuous-motion turret design enables non-stop wrapping at full production speed without compromising pack integrity.",
      },
      {
        title: "Reciprocating Heaters",
        description:
          "Retractable heating elements apply precise, uniform seals while preventing film damage during idle cycles.",
      },
      {
        title: "Faulty Pack Rejection",
        description:
          "Integrated quality-gate sensors detect and eject defective packs automatically, maintaining downstream quality.",
      },
      {
        title: "PLC Controlled",
        description:
          "Fully programmable logic controller enables rapid changeovers, diagnostics and integration with upstream machinery.",
      },
      {
        title: "Adjustable Turret",
        description:
          "Quick-change tooling allows fast format adjustments to accommodate multiple pack dimensions on a single line.",
      },
      {
        title: "Robust Construction",
        description:
          "Hardened steel frame and precision-machined components ensure reliable operation in demanding production environments.",
      },
    ],
    applications: [
      "Hard Box Packaging",
      "Shoulder Box Packaging",
      "Soft Cup Packing",
      "FMCG",
      "Pharmaceutical",
      "Food & Beverage",
    ],
    highlights: [
      { value: "200", label: "Packs per minute" },
      { value: "99.5", label: "% uptime" },
      { value: "24/7", label: "Production ready" },
    ],
  },
  {
    id: "over-wrapper",
    slug: "over-wrapper",
    name: "Over Wrapper",
    model: "MTI-OW25-1",
    tagline: "Automatic PLC-controlled over-wrapping for diverse product lines.",
    description:
      "The MTI-OW25-1 is an automatic, PLC-controlled over-wrapping machine suitable for a broad range of applications \u2014 from tobacco and tea to cosmetics and confectionary. With mechanical gripper film pull and quick-change components, this machine delivers superior wrapping quality at 20\u201325 overwraps per minute while maintaining ease of operation and minimal downtime.",
    heroImage:
      "/655c6cfb4f7d36ff71747561/664f3bc11667873462571464_metalworking-cnc-lathe-milling-machine-cutting-me-2023-11-27-05-14-10-utc (1)-p-2000.jpg",
    showcaseImage:
      "/655c6cfb4f7d36ff71747561/659eaca57e872a74bb05fe7f_DSC07762.webp",
    cardImage: "/machines/over-wrapper.png",
    productImage: "/machines/over-wrapper.png",
    output: "25 PPM",
    category: "Over-wrapping",
    specs: [
      { label: "Output", value: "20 \u2013 25 overwraps/min" },
      { label: "Packing Material", value: "Polypropylene" },
      { label: "Product Length", value: "50 \u2013 300 mm" },
      { label: "Product Width", value: "55 \u2013 150 mm" },
      { label: "Product Thickness", value: "10 \u2013 110 mm" },
      { label: "Floor Space", value: "100 \u00d7 150 cm" },
      { label: "In-feed Height", value: "160 cm" },
      { label: "Out-feed Height", value: "94 cm" },
      { label: "Compressed Air", value: "5 \u2013 6 Bar" },
    ],
    features: [
      {
        title: "Mechanical Gripper Film Pull",
        description:
          "Precision gripper mechanism ensures consistent film tension and clean cuts across a wide range of materials.",
      },
      {
        title: "PLC Control System",
        description:
          "Siemens-based controller offers intuitive HMI, recipe storage and real-time diagnostics for fast troubleshooting.",
      },
      {
        title: "Large Format Capability",
        description:
          "Accommodates products up to 300 mm in length and 150 mm in width, covering everything from single packs to cartons.",
      },
      {
        title: "External Side-loading Reel",
        description:
          "Film reel positioned for quick replenishment without halting production \u2014 reducing changeover time significantly.",
      },
      {
        title: "Tear Tape Unit",
        description:
          "Integrated tear-tape applicator adds easy-open functionality directly in the wrapping cycle.",
      },
      {
        title: "Quick-change Components",
        description:
          "Tool-free change parts enable rapid product switchovers in under 15 minutes.",
      },
    ],
    applications: [
      "Tobacco",
      "Tea & Coffee",
      "Cosmetics",
      "Confectionary",
      "Pharmaceutical",
      "Consumer Goods",
    ],
    highlights: [
      { value: "25", label: "Overwraps per minute" },
      { value: "300", label: "mm max product length" },
      { value: "<15", label: "Min changeover time" },
    ],
  },
  {
    id: "high-speed-boxer",
    slug: "high-speed-boxer",
    name: "High Speed Boxer",
    model: "MTI-HSB30-1",
    tagline: "Compact, high-speed carton boxing for end-of-line automation.",
    description:
      "The MTI-HSB30-1 is a compact, high-speed boxer that receives two high stacks of packs from the wrapper and collates them into 5\u00d75 configurations fed to the carton blank. Capable of 30 boxes per minute, it supports both American and European-style cartons with cold-glue sealing for secure, clean closures.",
    heroImage:
      "/655c6cfb4f7d36ff71747561/6566fac5cf5b210648cf8538_CNC.webp",
    showcaseImage:
      "/655c6cfb4f7d36ff71747561/659eaca64500c645e45294b0_DSC07788.webp",
    cardImage: "/machines/high-speed-boxer.png",
    productImage: "/machines/high-speed-boxer.png",
    output: "30 BPM",
    category: "Boxing",
    specs: [
      { label: "Output", value: "Up to 30 boxes/min" },
      { label: "Collation", value: "10 packs (2H \u00d7 5W)" },
      { label: "Product Length \u2018a\u2019", value: "220 \u2013 300 mm" },
      { label: "Product Length \u2018b\u2019", value: "75 \u2013 102 mm" },
      { label: "Product Length \u2018c\u2019", value: "25 \u2013 50 mm" },
      { label: "Floor Space", value: "177 \u00d7 88 cm" },
      { label: "Machine Height", value: "172 cm" },
      { label: "Out-feed Height", value: "94 cm" },
      { label: "Gluing", value: "Cold glue (long seam + side flaps)" },
      { label: "Compressed Air", value: "5 \u2013 6 Bar" },
    ],
    features: [
      {
        title: "Compact Footprint",
        description:
          "Space-efficient design fits seamlessly into existing production lines without major floor-plan changes.",
      },
      {
        title: "Dual Carton Compatibility",
        description:
          "Supports both American and European carton styles from a single machine configuration.",
      },
      {
        title: "Cold Glue Sealing",
        description:
          "Clean, secure closures on long seam and side flaps without heat damage to packaging materials.",
      },
      {
        title: "High-stack Infeed",
        description:
          "Receives two high stacks directly from the wrapper, eliminating buffer requirements.",
      },
      {
        title: "Servo-driven Collation",
        description:
          "Precision servo motors ensure accurate 2\u00d75 pack collation at full production speed.",
      },
      {
        title: "Quick Format Change",
        description:
          "Adjustable guides and tooling enable rapid changeovers between different box dimensions.",
      },
    ],
    applications: [
      "End-of-line Packaging",
      "Carton Boxing",
      "Secondary Packaging",
      "Distribution Ready",
      "Multi-pack Collation",
    ],
    highlights: [
      { value: "30", label: "Boxes per minute" },
      { value: "177", label: "cm footprint length" },
      { value: "2", label: "Carton styles supported" },
    ],
  },
  {
    id: "case-packer",
    slug: "case-packer",
    name: "Case Packer",
    model: "MTI-CP06-1",
    tagline: "Automated case packing with exceptional ROI and minimal operator input.",
    description:
      "The MTI-CP06-1 provides exceptional levels of automated performance for end-of-line case packing. Simple to operate and set up for different products and case sizes, this horizontal case packer uses adhesive tape sealing, Siemens PLC control and a modular construction philosophy that keeps maintenance costs low and flexibility high.",
    heroImage:
      "/655c6cfb4f7d36ff71747561/67e51f5a08e8b1335eb2e270_working-by-machine-2025-03-15-08-36-55-utc (1).jpg",
    showcaseImage:
      "/655c6cfb4f7d36ff71747561/659eaca89806897908548525_DSC07868.webp",
    cardImage: "/machines/case-packer.png",
    productImage: "/machines/case-packer.png",
    output: "6 CPM",
    category: "Case Packing",
    specs: [
      { label: "Type", value: "Horizontal" },
      { label: "Mode", value: "Fully Automatic" },
      { label: "Sealing", value: "Adhesive Tape" },
      { label: "Case Length", value: "130 \u2013 575 mm" },
      { label: "Case Width", value: "200 \u2013 550 mm" },
      { label: "Floor Space", value: "214 \u00d7 418 cm" },
      { label: "Machine Height", value: "194 cm" },
      { label: "Compressed Air", value: "5 \u2013 6 Bar" },
      { label: "Control System", value: "Siemens PLC" },
    ],
    features: [
      {
        title: "Modular Design",
        description:
          "Interchangeable modules simplify maintenance and allow the machine to evolve as production needs change.",
      },
      {
        title: "Siemens PLC Control",
        description:
          "Industry-standard Siemens controller with touchscreen HMI for straightforward operation and diagnostics.",
      },
      {
        title: "Adhesive Tape Sealing",
        description:
          "Reliable tape closure ensures tamper-evident packaging without the complexity of hot-melt systems.",
      },
      {
        title: "Competitive Pricing",
        description:
          "Engineered to deliver the highest performance-per-dollar ratio in its class.",
      },
      {
        title: "Low Maintenance",
        description:
          "Simplified mechanical design with readily available components minimises unplanned downtime.",
      },
      {
        title: "Flexible Case Sizes",
        description:
          "Handles case dimensions from 130 mm to 575 mm in length, covering a wide product range.",
      },
    ],
    applications: [
      "End-of-line Packing",
      "Case Erecting",
      "Product Collation",
      "Warehouse Ready",
      "Distribution Packaging",
    ],
    highlights: [
      { value: "6", label: "Cases per minute" },
      { value: "575", label: "mm max case length" },
      { value: "100", label: "% automatic operation" },
    ],
  },
];

export function getMachineBySlug(slug: string): Machine | undefined {
  return machines.find((m) => m.slug === slug);
}

export function getNextMachine(currentSlug: string): Machine {
  const idx = machines.findIndex((m) => m.slug === currentSlug);
  return machines[(idx + 1) % machines.length];
}
