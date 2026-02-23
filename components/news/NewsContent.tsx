"use client";

import { newsPosts, socialPosts } from "./newsData";
import NewsFeatured from "./NewsFeatured";
import NewsSocials from "./NewsSocials";
import NewsAll from "./NewsAll";
import styles from "./NewsContent.module.css";

export default function NewsContent() {
  const featured = newsPosts.filter((p) => p.featured);

  return (
    <div className={styles.content}>
      <NewsFeatured posts={featured} />
      <NewsSocials posts={socialPosts} />
      <NewsAll posts={newsPosts} />
    </div>
  );
}
