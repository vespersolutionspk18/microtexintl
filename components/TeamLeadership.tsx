import { leadershipTeam } from "./teamData";
import TeamMemberCard from "./TeamMemberCard";
import styles from "./TeamLeadership.module.css";

export default function TeamLeadership() {
  return (
    <section className={styles.teamLeadership}>
      <h2 className={styles.title}>Leadership team</h2>
      <div className={`grid-container ${styles.container}`}>
        {leadershipTeam.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
