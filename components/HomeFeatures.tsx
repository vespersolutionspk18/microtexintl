import styles from "./HomeFeatures.module.css";

const features = [
  {
    icon: "https://a.storyblok.com/f/288034353253643/39x38/3409a82835/bankable-hardware-tier-1-components.svg",
    title: "Bespoke Design & Engineering",
    copy: "Custom-designed machinery tailored to your exact production specifications.",
  },
  {
    icon: "https://a.storyblok.com/f/288034353253643/33x33/aef3f79623/gigawatt-scale-supply-chain.svg",
    title: "Global Spare Parts Supply",
    copy: "Comprehensive parts inventory for all major packaging brands.",
  },
  {
    icon: "https://a.storyblok.com/f/288034353253643/51x40/9a6e2c16f6/u-s-manufacturing-feoc-compliant.svg",
    title: "UAE Manufacturing Hub",
    copy: "Proudly engineered and built in Sharjah, UAE.",
  },
  {
    icon: "https://a.storyblok.com/f/288034353253643/33x39/1a6c87e243/fault-tolerant-architectures.svg",
    title: "Expert Installation & Support",
    copy: "End-to-end installation, training, and ongoing maintenance services.",
  },
];

export default function HomeFeatures() {
  return (
    <section className={styles.homeFeatures}>
      <div className="grid-container">
        <div className={styles.items}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.iconFeature}>
              <div className={styles.iconWrapper}>
                <img src={feature.icon} alt={feature.title} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureCopy}>{feature.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
