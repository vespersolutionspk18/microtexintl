"use client";

import type { SocialPost } from "./newsData";
import styles from "./NewsSocials.module.css";

export default function NewsSocials({ posts }: { posts: SocialPost[] }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Featured Socials</h2>
      <div className={styles.carousel}>
        {posts.map((post, i) => (
          <div key={i} className={styles.slide}>
            <div className={styles.socialCard}>
              <div className={styles.cardContent}>
                <p className={styles.quote}>{post.quote}</p>
                <a
                  href={post.url}
                  className={styles.seePost}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See post
                </a>
              </div>
              <div className={styles.author}>
                <div className={styles.avatarWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.avatar} alt={post.author} />
                </div>
                <div className={styles.authorName}>{post.author}</div>
                <div className={styles.authorJob}>{post.jobTitle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
