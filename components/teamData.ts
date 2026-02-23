// ──────────────────────────────────────────────
// Team page – static data
// ──────────────────────────────────────────────

/* ── Interfaces ─────────────────────────────── */

export interface TeamMember {
  name: string;
  title: string;
  image: string;
}

export interface ValueBlock {
  heading: string;
  description: string;
}

export interface JobListing {
  id: string;
  title: string;
  location: string;
  department: string;
  url: string;
}

/* ── Leadership team ────────────────────────── */

const GREENHOUSE_BASE = "https://job-boards.greenhouse.io/onenergy/jobs/";

export const leadershipTeam: TeamMember[] = [
  {
    name: "Alan Cooper",
    title: "CEO & Co-Founder",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/4a95516fe6/alan-cooper.jpg",
  },
  {
    name: "Ricardo De Azevedo",
    title: "CTO & Co-Founder",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/f07ecd807c/ricardo-de-azevedo.jpg",
  },
  {
    name: "David Fernandes",
    title: "CIO & Founding Partner",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/b2e841f383/david-fernandes.jpg",
  },
  {
    name: "Andrea Petersen",
    title: "CFO",
    image:
      "https://a.storyblok.com/f/288034353253643/6884x10331/26c06daddc/andrea.jpg",
  },
  {
    name: "Dax Kepshire",
    title: "President, Data Centers",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/2d93a3d5d5/dax-kepshire.jpg",
  },
  {
    name: "Norman Cooper",
    title: "Chairman of the Board",
    image:
      "https://a.storyblok.com/f/288034353253643/2256x2880/c97a8bf94d/norman.jpg",
  },
  {
    name: "Jos\u00e9 Manuel D\u00edaz P\u00e9rez",
    title: "President, LATAM",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/d3f65c20df/jose-manuel-diaz-perez.jpg",
  },
  {
    name: "Jorge Bianchi",
    title: "Executive VP of People",
    image:
      "https://a.storyblok.com/f/288034353253643/2256x2880/eec5f8c0e5/jorge-bianchi.png",
  },
  {
    name: "Daniel Seixas",
    title: "SVP, Corporate Development",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/f08fb1bd72/daniel-seixas.jpg",
  },
  {
    name: "Jose Aranguren",
    title: "SVP, Commissioning and Service",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/78957121f7/jose-aranguren.jpg",
  },
  {
    name: "Lauren Wong",
    title: "VP, Procurement",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/c55c0e98e1/lauren-wong.jpg",
  },
  {
    name: "Jeff Silvan",
    title: "VP, Strategic Initiatives",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/5f4eaec9cc/jeff-silvan.jpg",
  },
  {
    name: "Alberto Avila",
    title: "VP, Finance - Data Centers",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/92cdb0f3b3/alberto-avila.jpg",
  },
  {
    name: "Asser Elsamahy",
    title: "VP, Engineering",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/095e49ce78/asser-elsamahy.jpg",
  },
  {
    name: "Ruben Mendez",
    title: "VP, Accounting",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/27dfb2c9cd/ruben-mendez.jpg",
  },
  {
    name: "Kevin Rooney",
    title: "VP, Structured Finance",
    image:
      "https://a.storyblok.com/f/288034353253643/1024x1536/3e96dcbbee/kevin-rooney.jpg",
  },
  {
    name: "Jaime Mayol",
    title: "SVP Sales",
    image:
      "https://a.storyblok.com/f/288034353253643/1195x1600/17a6b53d27/jaime-mayol.jpg",
  },
  {
    name: "Ismario Gonzalez",
    title: "SVP Sales Engineering",
    image:
      "https://a.storyblok.com/f/288034353253643/1195x1600/0737e38a96/ismario-2.jpg",
  },
  {
    name: "Eric McGaha",
    title: "VP Sales",
    image:
      "https://a.storyblok.com/f/288034353253643/1195x1600/493f33065c/eric-mcgaha.jpg",
  },
];

/* ── Values ─────────────────────────────────── */

export const values: ValueBlock[] = [
  {
    heading: "Do work that matters",
    description:
      "We\u2019re solving the most critical challenges in energy infrastructure. Our work directly impacts grid resilience, sustainability, and the future of AI-powered data centers. Every project pushes the boundaries of what\u2019s possible.",
  },
  {
    heading: "Operate in autonomous teams",
    description:
      "We trust our people. Small, empowered teams make decisions quickly and own their outcomes. You\u2019ll have the freedom and responsibility to drive real impact from day one.",
  },
  {
    heading: "Grow professionally",
    description:
      "Work alongside world-class engineers, financiers, and operators. Cross-functional collaboration means you\u2019ll constantly learn from experts across disciplines, accelerating your growth.",
  },
];

/* ── Filter options ─────────────────────────── */

export const departments: string[] = [
  "All departments",
  "Commissioning & Services",
  "Cyber",
  "Energy Management Systems",
  "Finance",
  "Human Resources",
  "IT",
  "Interns",
  "Investment",
  "Legal",
  "Marketing",
  "Network & Deployment",
  "Operations",
  "People",
  "Product",
  "Project Controls",
  "Project Engineering",
  "Project Management",
  "Quality",
  "Recruiting",
  "Research & Development",
  "Safety",
  "Sales",
  "Sales Engineering & Operations",
  "Services",
  "Software Platform",
  "Supply Chain",
  "Talent Community",
  "Technology",
];

export const locations: string[] = [
  "All locations",
  "Alpharetta",
  "Argentina",
  "Atlanta",
  "Chile",
  "Houston",
  "Mexico",
  "Mexico City",
  "Miami",
  "Reston",
  "United States",
  "Villahermosa",
];

/* ── Job listings ───────────────────────────── */

export const jobListings: JobListing[] = [
  {
    id: "aws-cloud-jr",
    title: "AWS Cloud Engineer Jr.",
    location: "Argentina, Chile, Mexico",
    department: "Cyber",
    url: `${GREENHOUSE_BASE}aws-cloud-jr`,
  },
  {
    id: "aws-cloud-sr",
    title: "AWS Cloud Engineer Senior",
    location: "Argentina, Chile, Mexico",
    department: "Cyber",
    url: `${GREENHOUSE_BASE}aws-cloud-sr`,
  },
  {
    id: "controls-engineer",
    title: "Controls Engineer",
    location: "Atlanta",
    department: "Technology",
    url: `${GREENHOUSE_BASE}controls-engineer`,
  },
  {
    id: "deployment-engineer",
    title: "Deployment Engineer",
    location: "Atlanta",
    department: "Network & Deployment",
    url: `${GREENHOUSE_BASE}deployment-engineer`,
  },
  {
    id: "ems-deployment",
    title: "EMS Deployment Engineer",
    location: "Atlanta",
    department: "Energy Management Systems",
    url: `${GREENHOUSE_BASE}ems-deployment`,
  },
  {
    id: "ot-systems",
    title: "OT Systems Engineer",
    location: "Atlanta",
    department: "Technology",
    url: `${GREENHOUSE_BASE}ot-systems`,
  },
  {
    id: "sr-deployment-mgr",
    title: "Senior Deployment Manager",
    location: "Atlanta",
    department: "Network & Deployment",
    url: `${GREENHOUSE_BASE}sr-deployment-mgr`,
  },
  {
    id: "commissioning-eng",
    title: "Commissioning Engineer",
    location: "Houston",
    department: "Commissioning & Services",
    url: `${GREENHOUSE_BASE}commissioning-eng`,
  },
  {
    id: "comm-tech-ii",
    title: "Commissioning Technician II",
    location: "Houston",
    department: "Commissioning & Services",
    url: `${GREENHOUSE_BASE}comm-tech-ii`,
  },
  {
    id: "comm-tech-iii",
    title: "Commissioning Technician III",
    location: "Houston",
    department: "Commissioning & Services",
    url: `${GREENHOUSE_BASE}comm-tech-iii`,
  },
  {
    id: "comm-tech-i",
    title: "Commissioning Technician I",
    location: "Houston",
    department: "Commissioning & Services",
    url: `${GREENHOUSE_BASE}comm-tech-i`,
  },
  {
    id: "field-service",
    title: "Field Service Technician",
    location: "Houston",
    department: "Services",
    url: `${GREENHOUSE_BASE}field-service`,
  },
  {
    id: "tech-trainer",
    title: "Technology Trainer",
    location: "Houston",
    department: "Technology",
    url: `${GREENHOUSE_BASE}tech-trainer`,
  },
  {
    id: "sw-controls-hou",
    title: "Software & Controls Engineer",
    location: "Houston, Miami",
    department: "Technology",
    url: `${GREENHOUSE_BASE}sw-controls-hou`,
  },
  {
    id: "ux-scada",
    title: "UX/UI Specialist - SCADA",
    location: "Houston",
    department: "Software Platform",
    url: `${GREENHOUSE_BASE}ux-scada`,
  },
  {
    id: "sr-power-elec",
    title: "Senior Power Electronics Engineer",
    location: "Houston, United States",
    department: "Research & Development",
    url: `${GREENHOUSE_BASE}sr-power-elec`,
  },
  {
    id: "sr-product-bess",
    title: "Sr Product Engineer BESS",
    location: "Houston",
    department: "Product",
    url: `${GREENHOUSE_BASE}sr-product-bess`,
  },
  {
    id: "sr-project-eng",
    title: "Senior Project Engineer",
    location: "Houston",
    department: "Project Engineering",
    url: `${GREENHOUSE_BASE}sr-project-eng`,
  },
  {
    id: "project-exec-dc",
    title: "Project Executive Data Center",
    location: "Houston",
    department: "Project Management",
    url: `${GREENHOUSE_BASE}project-exec-dc`,
  },
  {
    id: "master-scheduler",
    title: "Master Scheduler",
    location: "Houston, Miami, United States",
    department: "Project Controls",
    url: `${GREENHOUSE_BASE}master-scheduler`,
  },
  {
    id: "scada-support",
    title: "SCADA Systems Support Engineer",
    location: "Mexico City, Villahermosa",
    department: "Energy Management Systems",
    url: `${GREENHOUSE_BASE}scada-support`,
  },
  {
    id: "sw-controls-mx",
    title: "Software & Controls Engineer",
    location: "Mexico City",
    department: "Technology",
    url: `${GREENHOUSE_BASE}sw-controls-mx`,
  },
  {
    id: "treasury-mgr",
    title: "Treasury Manager",
    location: "Mexico City",
    department: "Finance",
    url: `${GREENHOUSE_BASE}treasury-mgr`,
  },
  {
    id: "sharepoint-analyst",
    title: "SharePoint Business Analyst",
    location: "Mexico City",
    department: "IT",
    url: `${GREENHOUSE_BASE}sharepoint-analyst`,
  },
  {
    id: "doc-controller",
    title: "Document Controller",
    location: "Mexico City",
    department: "Project Controls",
    url: `${GREENHOUSE_BASE}doc-controller`,
  },
  {
    id: "it-support",
    title: "IT Support",
    location: "Mexico City",
    department: "IT",
    url: `${GREENHOUSE_BASE}it-support`,
  },
  {
    id: "network-admin",
    title: "Network Administrator",
    location: "Mexico City",
    department: "IT",
    url: `${GREENHOUSE_BASE}network-admin`,
  },
  {
    id: "sr-cybersecurity",
    title: "Sr. Cybersecurity Engineer",
    location: "Miami",
    department: "Cyber",
    url: `${GREENHOUSE_BASE}sr-cybersecurity`,
  },
  {
    id: "sox-compliance",
    title: "Sox Compliance and Business Process Analyst",
    location: "Miami",
    department: "Finance",
    url: `${GREENHOUSE_BASE}sox-compliance`,
  },
  {
    id: "chief-of-staff",
    title: "Chief of Staff",
    location: "Miami",
    department: "Operations",
    url: `${GREENHOUSE_BASE}chief-of-staff`,
  },
  {
    id: "qa-lead",
    title: "Quality Assurance Lead",
    location: "Miami",
    department: "Quality",
    url: `${GREENHOUSE_BASE}qa-lead`,
  },
  {
    id: "commercial-pc",
    title: "Commercial Project Controller",
    location: "Reston",
    department: "Project Controls",
    url: `${GREENHOUSE_BASE}commercial-pc`,
  },
  {
    id: "supervising-comm",
    title: "Supervising Commissioning Engineer",
    location: "United States",
    department: "Commissioning & Services",
    url: `${GREENHOUSE_BASE}supervising-comm`,
  },
  {
    id: "supplier-quality",
    title: "Supplier Quality Engineer",
    location: "United States",
    department: "Quality",
    url: `${GREENHOUSE_BASE}supplier-quality`,
  },
  {
    id: "sc-batteries",
    title: "Supply Chain Manager - Batteries and Inverters",
    location: "United States",
    department: "Supply Chain",
    url: `${GREENHOUSE_BASE}sc-batteries`,
  },
  {
    id: "sc-controls",
    title: "Supply Chain Manager - Controls",
    location: "United States",
    department: "Supply Chain",
    url: `${GREENHOUSE_BASE}sc-controls`,
  },
  {
    id: "sc-transformers",
    title: "Supply Chain Manager - Transformers",
    location: "United States",
    department: "Supply Chain",
    url: `${GREENHOUSE_BASE}sc-transformers`,
  },
];
