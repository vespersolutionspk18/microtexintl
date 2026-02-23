import styles from "./AboutMilestones.module.css";

const milestones = [
  {
    year: "2008",
    title: "Company Founded",
    description:
      "Microtex International is established in Sharjah, UAE with a mission to provide superior packaging machinery and spare parts.",
  },
  {
    year: "2011",
    title: "First Machine Line",
    description:
      "Launch of the MTI-W200 wrapper machine, proving our design philosophy of industrial-level performance at competitive pricing.",
  },
  {
    year: "2015",
    title: "Spare Parts Division",
    description:
      "Expansion into comprehensive spare parts supply for Maker, Hauni, Molins, GD, and Sasib systems.",
  },
  {
    year: "2018",
    title: "SAIF Zone Manufacturing",
    description:
      "Opening of our dedicated manufacturing facility in SAIF Zone, Sharjah with integrated assembly and testing capabilities.",
  },
  {
    year: "2022",
    title: "Full Turnkey Solutions",
    description:
      "Launch of end-to-end services including custom design, installation, upgradation, and format conversion kits.",
  },
  {
    year: "2025",
    title: "40+ Countries Served",
    description:
      "Surpassing 500 machines delivered and 10,000 spare part SKUs stocked, serving clients across 40+ countries.",
  },
];

export default function AboutMilestones() {
  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.head}>
          <h2 className={styles.label}>Our Journey</h2>
          <h3 className={styles.title}>
            <span>Key </span>
            <span>Milestones</span>
          </h3>
        </div>

        <div className={styles.timeline}>
          {milestones.map((milestone) => (
            <div key={milestone.year} className={styles.milestone}>
              <span className={styles.year}>{milestone.year}</span>
              <div className={styles.milestoneContent}>
                <h4 className={styles.milestoneTitle}>{milestone.title}</h4>
                <p className={styles.milestoneDesc}>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
