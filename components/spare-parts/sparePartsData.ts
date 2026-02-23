export interface SparePart {
  name: string;
  image: string;
}

export interface SpecRow {
  cells: string[];
}

export interface SpecTable {
  title: string;
  description: string;
  features?: string[];
  columns: string[];
  rows: SpecRow[];
}

export interface SparePartCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  secondaryDescription?: string;
  heroImage: string;
  cardImage: string;
  parts: SparePart[];
  specifications?: SpecTable[];
}

export const sparePartsIntro =
  "Microtex offers a variety of spare parts with highest industrial quality and meeting all the industrial standards to support your manufacturing and packaging operations. We have complete range of spare parts for tobacco machinery including Molins, GD, Sasib, Hauni, Marden Edward etc.";

export const categories: SparePartCategory[] = [
  {
    id: "mk8",
    slug: "mk8-mk9-mk95-maker-spare-parts",
    name: "MK8/MK9/MK95 Maker Spare Parts",
    shortName: "MK8/MK9/MK95",
    description:
      "We offer tobacco spare parts for cigarette making machine type of MK8, MK9, MK9-5, Max 3, Max 5, Max S, PA7, PA8, PA9. Our tobacco machinery spare parts are guaranteed in quality and short delivery time.",
    secondaryDescription:
      "Our hot-sale products are Tobacco Garniture Tape, Tobacco Suction Tape, Tongue Piece, Filter Rod Cutting Knives, Tobacco Rod Cutting Knives, Tipping Paper Cutting Knives, Garniture Assembly, Sharpening Disc, Tipping Drum and tipping paper porosity roller, etc.",
    heroImage: "/spare-parts/mk8/hero.jpg",
    cardImage: "/spare-parts/mk8/hero.jpg",
    parts: [
      { name: "Garniture Tape", image: "/spare-parts/mk8/garniture-tape.jpg" },
      { name: "Circular Blade", image: "/spare-parts/mk8/circular-blade.jpg" },
      {
        name: "Tobacco Cutting Knives",
        image: "/spare-parts/mk8/tobacco-knife.jpg",
      },
      { name: "Tongue Piece", image: "/spare-parts/mk8/tongue-piece.jpg" },
      {
        name: "Nylon Suction Tape",
        image: "/spare-parts/mk8/nylon-suction-tape.jpg",
      },
      {
        name: "Steel Suction Tape",
        image: "/spare-parts/mk8/steel-suction-tape.jpg",
      },
      {
        name: "Tipping Paper Knife",
        image: "/spare-parts/mk8/tipping-paper-knife.jpg",
      },
      {
        name: "Sharpening Disc",
        image: "/spare-parts/mk8/sharpening-disc.jpg",
      },
      { name: "Cigarette Tray", image: "/spare-parts/mk8/cigarette-tray.jpg" },
      {
        name: "Garniture Assembly",
        image: "/spare-parts/mk8/garniture-assembly.jpg",
      },
      { name: "Tipping Drum", image: "/spare-parts/mk8/tipping-drum.jpg" },
      {
        name: "Steel Bounce Band",
        image: "/spare-parts/mk8/steel-bounce-band.jpg",
      },
      {
        name: "Tipping Porosity Roller",
        image: "/spare-parts/mk8/porosity-roller.jpg",
      },
      { name: "Rolling Block", image: "/spare-parts/mk8/rolling-block.jpg" },
      {
        name: "Tipping Cutter Set",
        image: "/spare-parts/mk8/tipping-cutter-set.jpg",
      },
      { name: "Carding Set", image: "/spare-parts/mk8/carding-set.jpg" },
      {
        name: "Glue Nozzle Assembly",
        image: "/spare-parts/mk8/glue-nozzle-assembly.jpg",
      },
      {
        name: "Tipping Paper Drum Set",
        image: "/spare-parts/mk8/tipping-paper-drum-set.jpg",
      },
      {
        name: "Blade Grinder Disc",
        image: "/spare-parts/mk8/blade-grinder-disc.jpg",
      },
      {
        name: "Sharpening Disc II",
        image: "/spare-parts/mk8/sharpening-disc-2.jpg",
      },
      {
        name: "Ecreteur Gearbox Assembly",
        image: "/spare-parts/mk8/ecreteur-gearbox.jpg",
      },
      { name: "Tobacco Shoe", image: "/spare-parts/mk8/tobacco-shoe.jpg" },
      { name: "Ecreteur Disc", image: "/spare-parts/mk8/ecreteur-disc.jpg" },
      {
        name: "Drum Suction Piece",
        image: "/spare-parts/mk8/suction-piece.jpg",
      },
      { name: "Long Knife", image: "/spare-parts/mk8/long-knife.jpg" },
      {
        name: "Alloy Guide Inserts",
        image: "/spare-parts/mk8/alloy-guide-inserts.jpg",
      },
      {
        name: "Garniture Wheel",
        image: "/spare-parts/mk8/garniture-wheel.jpg",
      },
    ],
  },
  {
    id: "protos",
    slug: "hauni-protos-70-80-90-maker-spare-parts",
    name: "Hauni Protos 70/80/90 Maker Spare Parts",
    shortName: "Hauni Protos",
    description:
      "We offer tobacco machinery spare parts for Protos 70/80/90 cigarette making machine line. Our spare parts have been supplied to customers worldwide due to its good quality and short delivery time.",
    secondaryDescription:
      "Our hot-sale products are Tongue Piece, Nylon Suction Tape, Gum Roller, Slitting Roller, Cutting Knife Set, Eccrature Disc, Rolling Drum, Cutting Drum, Tipping Drum and more.",
    heroImage: "/spare-parts/protos/hero.jpg",
    cardImage: "/spare-parts/protos/hero.jpg",
    parts: [
      { name: "Tongue Piece", image: "/spare-parts/protos/tongue-piece.jpg" },
      {
        name: "Nylon Suction Tape",
        image: "/spare-parts/protos/nylon-suction-tape.jpg",
      },
      { name: "Gum Roller", image: "/spare-parts/protos/gum-roller.jpg" },
      {
        name: "Slitting Roller",
        image: "/spare-parts/protos/slitting-roller.jpg",
      },
      {
        name: "Tobacco Carding Set",
        image: "/spare-parts/protos/carding-set.jpg",
      },
      {
        name: "Eccrature Disc",
        image: "/spare-parts/protos/eccrature-disc.jpg",
      },
      {
        name: "Cutting Knife Set",
        image: "/spare-parts/protos/cutting-knife-set.jpg",
      },
      {
        name: "Transition Gear",
        image: "/spare-parts/protos/transition-gear.jpg",
      },
      {
        name: "Protos Parts EM45051800",
        image: "/spare-parts/protos/em45051800.jpg",
      },
      {
        name: "Protos Parts 4EM6021900",
        image: "/spare-parts/protos/4em6021900.jpg",
      },
      {
        name: "Tongue Piece II",
        image: "/spare-parts/protos/tongue-piece-2.jpg",
      },
      { name: "Shaft", image: "/spare-parts/protos/shaft.jpg" },
      {
        name: "Transport Channel Piece",
        image: "/spare-parts/protos/transport-channel.jpg",
      },
      {
        name: "Rolling Block",
        image: "/spare-parts/protos/rolling-block.jpg",
      },
      { name: "Heater Plate", image: "/spare-parts/protos/heater-plate.jpg" },
      {
        name: "Protos Parts 4DM5100100",
        image: "/spare-parts/protos/4dm5100100.jpg",
      },
      {
        name: "Protos Parts 4DM4420200",
        image: "/spare-parts/protos/4dm4420200.jpg",
      },
      {
        name: "Protos Parts 4EM1310201",
        image: "/spare-parts/protos/4em1310201.jpg",
      },
      {
        name: "Protos Parts 4DM2100100",
        image: "/spare-parts/protos/4dm2100100.jpg",
      },
      {
        name: "Protos Parts 2ACE661A0500",
        image: "/spare-parts/protos/2ace661a0500.jpg",
      },
      {
        name: "Protos Parts 4DN3120100",
        image: "/spare-parts/protos/4dn3120100.jpg",
      },
      {
        name: "Protos Parts 4DN480AQ00",
        image: "/spare-parts/protos/4dn480aq00.jpg",
      },
      {
        name: "Protos Parts 4DN390AR62",
        image: "/spare-parts/protos/4dn390ar62.jpg",
      },
      {
        name: "Protos Parts 4DM5200210",
        image: "/spare-parts/protos/4dm5200210.jpg",
      },
      {
        name: "Protos Parts 4DM4410101",
        image: "/spare-parts/protos/4dm4410101.jpg",
      },
      { name: "Rolling Drum", image: "/spare-parts/protos/rolling-drum.jpg" },
      { name: "Cutting Drum", image: "/spare-parts/protos/cutting-drum.jpg" },
      { name: "Tipping Drum", image: "/spare-parts/protos/tipping-drum.jpg" },
    ],
  },
  {
    id: "hlp",
    slug: "hlp-cigarette-packing-machine-spare-parts",
    name: "Molins HLP Packer Spare Parts",
    shortName: "Molins HLP",
    description:
      "We offer tobacco machinery spare parts for HLP cigarette packing machine line. Our spare parts have been supplied to customers worldwide due to its good quality and short delivery time.",
    secondaryDescription:
      "Our hot-sale products are Inner Frame Cutter, Embossing Roller (Male & Female), Glue Nozzle Set, Web Cutting Knives, Tear Tape Knives, Cigarette Detector Set, Aluminum Foil Cutter Set, Packet Tray Holder etc.",
    heroImage: "/spare-parts/hlp/hero.jpg",
    cardImage: "/spare-parts/hlp/hero.jpg",
    parts: [
      {
        name: "Inner Frame Cutter",
        image: "/spare-parts/hlp/inner-frame-cutter.jpg",
      },
      {
        name: "Embossing Roller",
        image: "/spare-parts/hlp/embossing-roller.jpg",
      },
      { name: "Glue Nozzle", image: "/spare-parts/hlp/glue-nozzle.jpg" },
      {
        name: "Web Rotating Knife",
        image: "/spare-parts/hlp/rotating-knife.jpg",
      },
      {
        name: "Tear Tape Knife",
        image: "/spare-parts/hlp/tear-tape-knife.jpg",
      },
      {
        name: "Embossing Roller Male Set",
        image: "/spare-parts/hlp/embossing-roller-male.jpg",
      },
      {
        name: "Cigarette Pusher",
        image: "/spare-parts/hlp/cigarette-pusher.jpg",
      },
      { name: "Rotor", image: "/spare-parts/hlp/rotor.jpg" },
      {
        name: "Detecting Touch Panel",
        image: "/spare-parts/hlp/detecting-panel.jpg",
      },
      { name: "Body Armer", image: "/spare-parts/hlp/body-armer.jpg" },
      {
        name: "Transition Gear",
        image: "/spare-parts/hlp/transition-gear.jpg",
      },
      {
        name: "Punch Die Cutting Set",
        image: "/spare-parts/hlp/punch-die-cutting.jpg",
      },
      { name: "Packet Tray", image: "/spare-parts/hlp/packet-tray.jpg" },
      { name: "Suction Bowl", image: "/spare-parts/hlp/suction-bowl.jpg" },
      { name: "Spring", image: "/spare-parts/hlp/spring.jpg" },
      {
        name: "Packet Holder Frame",
        image: "/spare-parts/hlp/packet-holder-frame.jpg",
      },
      { name: "Cutter Knife", image: "/spare-parts/hlp/cutter-knife.jpg" },
      {
        name: "Inner Frame Cutter Set",
        image: "/spare-parts/hlp/inner-frame-cutter-set.jpg",
      },
      {
        name: "Punch Knife Set",
        image: "/spare-parts/hlp/punch-knife-set.jpg",
      },
      { name: "Conveyor Belt", image: "/spare-parts/hlp/conveyor-belt.jpg" },
      {
        name: "Cigarette Detector Set",
        image: "/spare-parts/hlp/cigarette-detector.jpg",
      },
    ],
  },
  {
    id: "gd",
    slug: "gd-x1-gd-x2-packer-spare-parts",
    name: "GD X1 & GD X2 Packer Spare Parts",
    shortName: "GD X1/X2",
    description:
      "We offer tobacco machinery spare parts for GD series cigarette packing machine line. Our spare parts have been sold to cigarette manufacturers worldwide due to its good quality and short delivery time.",
    secondaryDescription:
      "Our hot-sale products are Inner Frame Cutter, Embossing Roller (Male & Female), Glue Nozzle Set, Web Cutting Knives, Tear Tape Knives, Cigarette Detector Set, Aluminum Foil Cutter Set, Packet Tray Holder etc.",
    heroImage: "/spare-parts/gd/hero.jpg",
    cardImage: "/spare-parts/gd/hero.jpg",
    parts: [
      {
        name: "Tear Tape Knife",
        image: "/spare-parts/gd/tear-tape-knife.jpg",
      },
      {
        name: "Steel Roller Set",
        image: "/spare-parts/gd/steel-roller-set.jpg",
      },
      {
        name: "Stamp Glue Assembly",
        image: "/spare-parts/gd/stamp-glue-assembly.jpg",
      },
      {
        name: "Six Knife Circular Blade Set",
        image: "/spare-parts/gd/six-knife-blade-set.jpg",
      },
      {
        name: "Pneumatic Tensioning System",
        image: "/spare-parts/gd/pneumatic-tensioning.jpg",
      },
      {
        name: "OX617 Malta Wheel",
        image: "/spare-parts/gd/malta-wheel.jpg",
      },
      {
        name: "No.8 Wheel Assembly",
        image: "/spare-parts/gd/no8-wheel-assembly.jpg",
      },
      {
        name: "No.7 Wheel Assembly",
        image: "/spare-parts/gd/no7-wheel-assembly.jpg",
      },
      {
        name: "Sliding Brace Assembly",
        image: "/spare-parts/gd/sliding-brace-assembly.jpg",
      },
      { name: "Body Armer", image: "/spare-parts/gd/body-armer.jpg" },
      {
        name: "No.4 Bobbin Wheel",
        image: "/spare-parts/gd/no4-bobbin-wheel.jpg",
      },
      {
        name: "No.2 Wheel Assembly",
        image: "/spare-parts/gd/no2-wheel-assembly.jpg",
      },
      {
        name: "No.1 Wheel Set",
        image: "/spare-parts/gd/no1-wheel-set.jpg",
      },
      {
        name: "Small Glue Container Set",
        image: "/spare-parts/gd/small-glue-container.jpg",
      },
      { name: "Glue Wheel", image: "/spare-parts/gd/glue-wheel.jpg" },
      { name: "Glue Nozzle", image: "/spare-parts/gd/glue-nozzle.jpg" },
      { name: "Glue Assembly", image: "/spare-parts/gd/glue-assembly.jpg" },
      {
        name: "Fixed Overlap Device",
        image: "/spare-parts/gd/fixed-overlap-device.jpg",
      },
      { name: "Cutting Knife", image: "/spare-parts/gd/cutting-knife.jpg" },
      {
        name: "Carton Film Standby Device",
        image: "/spare-parts/gd/carton-film-device.jpg",
      },
      { name: "Cam", image: "/spare-parts/gd/cam.jpg" },
      { name: "Bobbin Wheel", image: "/spare-parts/gd/bobbin-wheel.jpg" },
      { name: "Big Glue Set", image: "/spare-parts/gd/big-glue-set.jpg" },
      {
        name: "Belt Replacement Set",
        image: "/spare-parts/gd/belt-replacement-set.jpg",
      },
      {
        name: "Alu. Foil Anti-fake Roller",
        image: "/spare-parts/gd/alu-foil-roller.jpg",
      },
    ],
  },
  {
    id: "garniture",
    slug: "tobacco-garniture-suction-tapes",
    name: "Tobacco Garniture & Suction Tapes",
    shortName: "Garniture & Tapes",
    description:
      "Kevlar Garniture Tape with extremely high quality and in any and all sizes you require. It's for high speed cigarette making machines. Life of Kevlar Garniture Tape is very long because Kevlar is extremely strong. Tensile strength of Fiber Kevlar is 4.7 times than that of steel.",
    heroImage: "/spare-parts/garniture/hero.jpg",
    cardImage: "/spare-parts/garniture/hero.jpg",
    parts: [],
    specifications: [
      {
        title: "Kevlar Garniture Tape",
        description:
          "Kevlar Garniture Tape with extremely high quality and in any and all sizes you require. For high speed cigarette making machines with extremely long service life.",
        features: [
          "100% Kevlar",
          "High-temperature tolerance",
          "Low extensibility",
          "High fracture strength",
          "Long service life",
          "Extremely high tensile strength",
        ],
        columns: ["Machine Type", "Speed (Cig/min)", "Dimensions (mm)"],
        rows: [
          { cells: ["Skoda C7/C8", "2000", "21 \u00d7 2345"] },
          { cells: ["Skoda C9", "4000", "21 \u00d7 3125"] },
          { cells: ["Garan 4", "4000", "23 \u00d7 3100"] },
          { cells: ["Protos", "8000", "21 \u00d7 3100"] },
          { cells: ["Molins MK8 SM", "2500", "23 \u00d7 2490"] },
          { cells: ["Molins MK9", "5000", "22 \u00d7 2800"] },
          { cells: ["Hauni KDF", "2000", "21 \u00d7 2300"] },
          { cells: ["Hauni KDF 1", "3000", "19.5 \u00d7 3300"] },
        ],
      },
      {
        title: "Garniture Tapes (Linen)",
        description:
          "Linen Garniture tape with good quality and any size that you would like to order. Suitable for high speed cigarette making machines.",
        columns: ["Manufacturer", "Machine Type", "Dimensions (mm)"],
        rows: [
          { cells: ["Hauni", "Protos", "3100 \u00d7 21.0"] },
          { cells: ["Hauni", "Protos 90E", "3830 \u00d7 21.0"] },
          { cells: ["GD", "1-2-1 / 1-2-1 Plus", "2790 \u00d7 21.0"] },
          { cells: ["Molins", "Mark 8", "2489 \u00d7 22.0"] },
          { cells: ["Molins", "Mark 9", "2800 \u00d7 21.0 / 22.0"] },
        ],
      },
      {
        title: "Suction Tapes",
        description:
          "Nylon suction tape with good quality and any size that you require. Nylon suction tape is a perfect endless belt which is designed with good textile structure.",
        columns: ["Manufacturer", "Machine Type", "Dimensions (mm)"],
        rows: [
          { cells: ["Hauni", "Protos 70/80", "4000 \u00d7 8.2 / 9.2"] },
          { cells: ["Hauni", "Protos 90E", "5000 \u00d7 8.2 / 9.2"] },
          { cells: ["GD", "1-2-1", "4840 \u00d7 8.2 / 9.0"] },
          { cells: ["Molins", "Mark 9", "4000 \u00d7 8.2"] },
        ],
      },
    ],
  },
];

export function getCategoryBySlug(
  slug: string
): SparePartCategory | undefined {
  return categories.find((c) => c.slug === slug);
}
