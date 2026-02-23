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
      "https://images.unsplash.com/photo-1701328778019-e95dedbf5346?w=1200&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?w=1200&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1738162837408-5fbf53f0b97a?w=1200&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1727373203579-7b8984cb8120?w=1200&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1626964129686-38d9a25edf84?w=1200&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1752614671052-92e18f534db1?w=1200&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1693031630157-7ecc8d06de63?w=1200&q=80&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1577962144759-8dec6b55c952?w=1200&q=80&auto=format&fit=crop",
  },
];

export const socialPosts: SocialPost[] = [
  {
    author: "Ahmad Khan",
    jobTitle: "CEO & Founder, Microtex Industries",
    avatar:
      "https://images.unsplash.com/photo-1557947149-1a821f4188c0?w=400&q=80&auto=format&fit=crop",
    quote:
      "We are building some of the most reliable packaging machinery on the market \u2014 making production lines run faster, safer and more efficiently than ever before.",
    url: "#",
  },
  {
    author: "Technical Team",
    jobTitle: "Microtex Engineering",
    avatar:
      "https://images.unsplash.com/photo-1649779117064-107e63b88758?w=400&q=80&auto=format&fit=crop",
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
