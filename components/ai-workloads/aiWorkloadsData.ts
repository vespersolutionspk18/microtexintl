export const featureCards = [
  {
    type: "number" as const,
    number: "2.5",
    unit: "GW",
    title: "2.5 GW in Deployment",
    copy: "Actively deploying over 2.5 gigawatts of AI UPS™ systems across multiple hyperscale campuses for multiple hyperscalers.",
  },
  {
    type: "icon" as const,
    icon: "https://a.storyblok.com/f/288034353253643/219x240/e0e7debdd5/tree.svg",
    iconAlt: "Tree",
    title: "Validated by NLR & NCREPT",
    copy: 'Tested at the <a href="https://www.nrel.gov/" target="_blank">National Laboratory of the Rockies</a> and the <a href="https://ncrept.uark.edu/" target="_blank">National Center for Reliable Electric Power Transmission</a>, confirming full performance under real-world grid conditions.',
  },
  {
    type: "icon" as const,
    icon: "https://a.storyblok.com/f/288034353253643/177x177/f1be256648/checkmark.svg",
    iconAlt: "Checkmark",
    title: "Certified & Grid-Ready",
    copy: "UL-certified and validated by key ISOs and utilities for large-scale, grid-safe interconnection.",
  },
  {
    type: "icon" as const,
    icon: "https://a.storyblok.com/f/288034353253643/156x198/0db07c86fd/arrows.svg",
    iconAlt: "Arrows",
    title: "Concurrent-Maintainable, Fault-Tolerant Design",
    copy: "Built on a concurrently maintainable architecture with modular topology, independent power paths, and real-time failover control. Configurable for Tier IV fault tolerance, ensuring continuous operation through any single point of failure.",
  },
];

export const testimonials = [
  {
    logo: "https://a.storyblok.com/f/288034353253643/330x36/bae55c5b43/crusoe.svg",
    logoAlt: "Crusoe",
    quote: '"We reviewed every credible solution on the market. ON.energy\'s AI UPS was the only technology that met the full interconnection and reliability requirements, and their team was by far the strongest we worked with. This is poised to become the new standard for connecting AI factories in America."',
    author: "Chris Dolan",
    role: ", Chief Data Center Officer",
  },
  {
    logo: "https://a.storyblok.com/f/288034353253643/330x36/b89abb0b1e/rosendin-logo-steffen.png/m/366x40/filters:format(png):quality(70)",
    logoAlt: "Rosendin Logo (Steffen)",
    quote: '"Working with ON.energy has been a pleasure from day one. While we\'ve faced challenges together - as expected on any major project - it\'s clear that their team is made from exceptional stock. The professionalism and attention to detail from everyone on the On Energy side has been incredibly helpful in making this process as seamless as possible. We look forward to working with ON.energy on many future projects to come."',
    author: "Clint Summers",
    role: ", PE Senior Director, Power Engineering",
  },
];

export const deploymentCards = [
  {
    image: "https://a.storyblok.com/f/288034353253643/2742x1538/970713ab0c/ai-workloads-return-card-1.jpg/m/1000x560/filters:format(jpeg):quality(70)",
    alt: "AI Workloads returns",
    stat: "370+",
    copy: "MWh live delivering stability today",
  },
  {
    image: "https://a.storyblok.com/f/288034353253643/4096x3067/49f8500274/ai-workloads-return-card-2.jpg/m/1000x748/filters:format(jpeg):quality(70)",
    alt: "AI Workloads returns",
    stat: "1 GW",
    copy: "MWh live delivering stability today",
  },
];

// Exact from source: ai-workloads card data
export const infoCards = [
  {
    key: "challenge-1",
    icon: "warning" as const,
    theme: "black" as const,
    title: "Challenge 1",
    subtitle: "Speed to Power Is the New Bottle Neck",
    copy: "Hyperscale AI growth outpaces transmission upgrades. The grid can\u2019t keep up\u2013capacity constraints and 24+ month interconnection delays stall deployments",
  },
  {
    key: "challenge-2",
    icon: "warning" as const,
    theme: "black" as const,
    title: "Challenge 2",
    subtitle: "Current Data Centers Do Not Ride Through",
    copy: "When grid voltage fluctuates, data centers instantly disconnect and switch to conventional UPS systems. This sudden load drop destabilizes the grid, often triggering widespread voltage collapse and city-wide blackouts.",
    hasChart: true,
  },
  {
    key: "challenge-3",
    icon: "warning" as const,
    theme: "black" as const,
    title: "Challenge 3",
    subtitle: "AI Workloads Ramp Violently",
    copy: "Rapid, unpredictable power surges from AI workloads strain both data centers and the grid. Traditional UPS systems can\u2019t buffer or smooth these spikes, causing grid instability and long interconnection delays.",
    hasChart: true,
  },
  {
    key: "challenge-4",
    icon: "warning" as const,
    theme: "black" as const,
    title: "Challenge 4",
    subtitle: "Traditional UPS System Fall Short",
    copy: "Conventional UPS units are slow and low voltage, built only for IT load. They struggle with AI\u2019s power volatility, cant backup cooling, and take up valuable in door space.",
    listChart: {
      title: "Protected Load",
      percentage: 65,
      subtitle: "Operation Status",
      items: [
        { label: "Servers", status: "Protected" as const },
        { label: "Cooling Systems", status: "Vulnerable" as const },
        { label: "Auxiliary Equipment", status: "Vulnerable" as const },
      ],
    },
  },
  {
    key: "solution-1",
    icon: "success" as const,
    theme: "yellow" as const,
    title: "Solution 1",
    subtitle: "Power for the Entire Facility",
    copy: "AI UPS integrates at the medium voltage level moving the power system outdoors. It powers compute cooling and auxiliaries, freeing indoor space and optimizing deployment.",
    listChart: {
      title: "Protected Load",
      percentage: 100,
      subtitle: "Operation Status",
      items: [
        { label: "Servers", status: "Protected" as const },
        { label: "Cooling Systems", status: "Protected" as const },
        { label: "Auxiliary Equipment", status: "Protected" as const },
      ],
    },
  },
  {
    key: "solution-2",
    icon: "success" as const,
    theme: "yellow" as const,
    title: "Solution 2",
    subtitle: "Decoupled Power, Total Stability",
    copy: "AI UPS acts as a firewall between the load and the grid. It absorbs sharp power variations, intercepts transients, and delivers clean, stable power to the data center while preventing instability from reaching the grid.",
    hasChart: true,
  },
  {
    key: "solution-3",
    icon: "success" as const,
    theme: "yellow" as const,
    title: "Solution 3",
    subtitle: "Flexible loads to streamline interconnection",
    copy: "When the grid reaches capacity, AI UPS batteries discharge to relieve strain. When demand drops, they recharge. By actively stabilizing the grid, data centers help balance load \u2014 enabling faster permitting and interconnection approvals.",
    hasChart: true,
  },
  {
    key: "solution-4",
    icon: "success" as const,
    theme: "yellow" as const,
    title: "Solution 4",
    subtitle: "Grid-Safe Data Centers",
    copy: "Voltage ride-through enables AI UPS to turn grid instability into resilience\u2014keeping data centers online, supporting the grid, and unlocking more capacity even amid voltage fluctuations.",
    listChart: {
      title: "Interconnects Queue",
      percentage: 65,
      subtitle: "Complete",
      items: [
        { label: "Site A", status: "Approved" as const },
        { label: "Site B", status: "Approved" as const },
        { label: "Site C", status: "Approved" as const },
        { label: "Site D", status: "Approved" as const },
      ],
    },
  },
];
