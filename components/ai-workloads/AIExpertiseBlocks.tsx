import styles from "./AIExpertiseBlocks.module.css";

export default function AIExpertiseBlocks({ children }: { children: React.ReactNode }) {
  return <div className={styles.blocks}>{children}</div>;
}
