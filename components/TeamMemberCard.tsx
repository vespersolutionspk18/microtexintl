import { TeamMember } from "./teamData";
import styles from "./TeamMemberCard.module.css";

interface Props {
  member: TeamMember;
}

/** Append Storyblok optimisation transform to image URL */
function optimise(url: string): string {
  return `${url}/m/584x876/filters:format(jpeg):quality(70)`;
}

export default function TeamMemberCard({ member }: Props) {
  return (
    <div className={styles.card}>
      <button className={styles.imageWrapper} type="button">
        <picture>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={optimise(member.image)} alt={member.name} />
        </picture>
        <div className={styles.button}>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="9.95636"
              cy="9.96109"
              r="1"
              transform="rotate(45 9.95636 9.96109)"
              fill="currentColor"
            />
            <circle
              cx="9.95636"
              cy="14.2033"
              r="1"
              transform="rotate(45 9.95636 14.2033)"
              fill="currentColor"
            />
            <circle
              cx="9.95636"
              cy="18.4474"
              r="1"
              transform="rotate(45 9.95636 18.4474)"
              fill="currentColor"
            />
            <circle
              cx="14.1985"
              cy="9.96109"
              r="1"
              transform="rotate(45 14.1985 9.96109)"
              fill="currentColor"
            />
            <circle
              cx="18.4407"
              cy="9.96109"
              r="1"
              transform="rotate(45 18.4407 9.96109)"
              fill="currentColor"
            />
            <circle
              cx="9.90558"
              cy="9.90024"
              r="1"
              transform="rotate(-135 9.90558 9.90024)"
              fill="currentColor"
            />
            <circle
              cx="9.90558"
              cy="5.65805"
              r="1"
              transform="rotate(-135 9.90558 5.65805)"
              fill="currentColor"
            />
            <circle
              cx="9.90558"
              cy="1.41391"
              r="1"
              transform="rotate(-135 9.90558 1.41391)"
              fill="currentColor"
            />
            <circle
              cx="5.66339"
              cy="9.90024"
              r="1"
              transform="rotate(-135 5.66339 9.90024)"
              fill="currentColor"
            />
            <circle
              cx="1.4212"
              cy="9.90024"
              r="1"
              transform="rotate(-135 1.4212 9.90024)"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
      <div className={styles.content}>
        <div className={styles.name}>{member.name}</div>
        <div>{member.title}</div>
      </div>
    </div>
  );
}
