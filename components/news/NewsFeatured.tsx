"use client";

import Link from "next/link";
import type { NewsPost } from "./newsData";
import styles from "./NewsFeatured.module.css";

export default function NewsFeatured({ posts }: { posts: NewsPost[] }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Featured News</h2>
      <div className={styles.cards}>
        {posts.map((post) => (
          <div key={post.slug} className={styles.card}>
            <Link href={`/news/${post.slug}`} className={styles.postCard}>
              <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} />
              </div>
              <div className={styles.content}>
                <span className={styles.head}>{post.category}</span>
                <div className={styles.copyWrapper}>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.copy}>{post.excerpt}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
