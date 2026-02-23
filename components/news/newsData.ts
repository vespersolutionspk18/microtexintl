export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Product Updates" | "Company News" | "Industry" | "Events";
  date: string;
  image: string;
  featured?: boolean;
}

export interface SocialPost {
  author: string;
  jobTitle: string;
  avatar: string;
  quote: string;
  url: string;
}

export const newsPosts: NewsPost[] = [
  {
    slug: "microtex-launches-next-gen-wrapper-machine",
    title:
      "Microtex Launches Next-Generation MTI-W200-1 Wrapper Machine with Enhanced PLC Controls",
    excerpt:
      "The all-new MTI-W200-1 features a redesigned turret mechanism, upgraded Siemens PLC controls and an advanced faulty-pack rejection system delivering up to 200 packs per minute with industry-leading uptime.",
    category: "Product Updates",
    date: "February 18, 2026",
    image:
      "/655c6cfb4f7d36ff71747561/659eaca3da965823e60d5922_DSC07766.webp",
    featured: true,
  },
  {
    slug: "microtex-expands-global-spare-parts-network",
    title:
      "Microtex Expands Global Spare Parts Distribution Network Across 30 Countries",
    excerpt:
      "With new distribution hubs in Southeast Asia and Eastern Europe, Microtex now delivers critical spare parts for MK8, MK9, Hauni Protos and GD packer machines within 48 hours to over 30 countries worldwide.",
    category: "Company News",
    date: "February 4, 2026",
    image:
      "/655c6cfb4f7d36ff71747561/659eaca64500c645e45294b0_DSC07788.webp",
    featured: true,
  },
  {
    slug: "microtex-signs-multi-year-service-agreement",
    title:
      "Microtex Signs Multi-Year Service Agreement with Leading FMCG Manufacturer",
    excerpt:
      "A comprehensive support and rebuilding contract covering wrapper machines, over-wrappers and case packers across four production facilities.",
    category: "Company News",
    date: "January 22, 2026",
    image:
      "/655c6cfb4f7d36ff71747561/659eaca89806897908548525_DSC07868.webp",
  },
  {
    slug: "high-speed-boxer-breaks-throughput-record",
    title:
      "MTI-HSB30-1 High Speed Boxer Breaks Throughput Record at Customer Trial",
    excerpt:
      "During a live production trial, the MTI-HSB30-1 sustained 30 boxes per minute for 72 continuous hours with zero rejects.",
    category: "Product Updates",
    date: "January 10, 2026",
    image:
      "/655c6cfb4f7d36ff71747561/659eaca8ec2c66996e0625b7_DSC07836.webp",
  },
  {
    slug: "tobacco-packaging-automation-trends-2026",
    title:
      "Tobacco Packaging Automation: Key Trends Shaping the Industry in 2026",
    excerpt:
      "From servo-driven collation to predictive maintenance, the packaging machinery sector is accelerating its digital transformation.",
    category: "Industry",
    date: "December 18, 2025",
    image:
      "/655c6cfb4f7d36ff71747561/6566fac5cf5b210648cf8538_CNC.webp",
  },
  {
    slug: "microtex-case-packer-launch",
    title:
      "Microtex Launches MTI-CP06-1 Case Packer for End-of-Line Automation",
    excerpt:
      "The new horizontal case packer combines Siemens PLC control, adhesive tape sealing and modular construction for maximum flexibility.",
    category: "Product Updates",
    date: "November 29, 2025",
    image:
      "/655c6cfb4f7d36ff71747561/659eaca6810798ec8dc87258_DSC07817.webp",
  },
  {
    slug: "microtex-interpack-2025-recap",
    title:
      "Microtex at Interpack 2025: Full Recap and Product Showcase Highlights",
    excerpt:
      "Our team showcased the complete machinery lineup and next-generation spare parts catalogue at the world's largest packaging trade fair.",
    category: "Events",
    date: "November 12, 2025",
    image:
      "/655c6cfb4f7d36ff71747561/66669d6ee6fd9aa78a93b64b_6566faddf9828bc729647f72_Wire EDM-p-1080.webp",
  },
  {
    slug: "garniture-suction-tape-upgrade-program",
    title:
      "New Garniture & Suction Tape Upgrade Program Reduces Downtime by 40%",
    excerpt:
      "Microtex introduces a proactive replacement program for garniture and suction tapes, cutting unplanned downtime across MK8 and MK9 maker lines.",
    category: "Product Updates",
    date: "October 28, 2025",
    image:
      "/655c6cfb4f7d36ff71747561/66bc6a0725ef9e3c11553fad_6566fb601a95da94409fc8a3_Trumbling-p-1080.webp",
  },
];

export const socialPosts: SocialPost[] = [
  {
    author: "Ahmad Khan",
    jobTitle: "CEO & Founder, Microtex Industries",
    avatar:
      "/655c6cfb4f7d36ff71747561/6567357c24397f5643366c3c_A1070537 2.webp",
    quote:
      "We are building some of the most reliable packaging machinery on the market \u2014 making production lines run faster, safer and more efficiently than ever before.",
    url: "#",
  },
  {
    author: "Technical Team",
    jobTitle: "Microtex Engineering",
    avatar:
      "/655c6cfb4f7d36ff71747561/6565ef2c9804589b1077d281_Join Us-p-500.webp",
    quote:
      "Every spare part we manufacture goes through rigorous quality testing. Our customers depend on zero-compromise precision, and that is exactly what we deliver.",
    url: "#",
  },
];

export const newsCategories = [
  "All",
  "Product Updates",
  "Company News",
  "Industry",
  "Events",
] as const;
