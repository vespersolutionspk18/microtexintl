"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { NewsPost } from "./newsData";
import { newsCategories } from "./newsData";
import styles from "./NewsAll.module.css";

export default function NewsAll({ posts }: { posts: NewsPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  const hasSearch = search.trim().length > 0;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>All</h2>

      <div className={styles.filters}>
        {/* Search */}
        <div className={styles.filterItemSearch}>
          <input
            className={`${styles.filterInput} ${hasSearch ? styles.filterInputActive : ""}`}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={`${styles.filterSearchButton} ${hasSearch ? styles.filterSearchButtonActive : ""}`}
            onClick={() => setSearch("")}
            aria-label="Search"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Category buttons */}
        {newsCategories.map((cat) => (
          <div key={cat} className={styles.filterItem}>
            <button
              className={`${styles.filterButton} ${activeCategory === cat ? styles.filterButtonActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className={styles.list}>
        {filtered.length === 0 && (
          <div className={styles.noResults}>No articles found.</div>
        )}
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/news/${post.slug}`}
            className={styles.row}
          >
            <div className={styles.rowTitle}>{post.title}</div>
            <div className={styles.rowCopyWrapper}>
              <span className={styles.rowDate}>{post.date}</span>
              <div className={styles.rowLink}>
                <span className={styles.rowLinkButton}>
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L11 1M11 1H1M11 1V11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className={styles.rowImageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
