import styles from "./AIFeatureCard.module.css";

interface AIFeatureCardProps {
  type: "number" | "icon";
  number?: string;
  unit?: string;
  icon?: string;
  iconAlt?: string;
  title: string;
  copy: string;
}

export default function AIFeatureCard({ type, number, unit, icon, iconAlt, title, copy }: AIFeatureCardProps) {
  return (
    <div className={styles.card}>
      {type === "icon" && icon && (
        <div className={styles.iconWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.icon} src={icon} alt={iconAlt || ""} loading="lazy" />
        </div>
      )}
      {type === "number" && (
        <div className={styles.numberWrapper}>
          <div className={styles.number}>
            {number}<span>{unit}</span>
          </div>
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}><span>{title}</span></h3>
        <div className={styles.copy} dangerouslySetInnerHTML={{ __html: copy }} />
      </div>
    </div>
  );
}
