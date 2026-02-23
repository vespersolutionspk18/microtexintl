"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { jobListings, departments, locations } from "./teamData";
import type { JobListing } from "./teamData";
import styles from "./TeamList.module.css";

/* ── SVG icons ──────────────────────────────── */

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.95636" cy="9.96109" r="1" transform="rotate(45 9.95636 9.96109)" fill="currentColor" />
      <circle cx="9.95636" cy="14.2033" r="1" transform="rotate(45 9.95636 14.2033)" fill="currentColor" />
      <circle cx="9.95636" cy="18.4474" r="1" transform="rotate(45 9.95636 18.4474)" fill="currentColor" />
      <circle cx="14.1985" cy="9.96109" r="1" transform="rotate(45 14.1985 9.96109)" fill="currentColor" />
      <circle cx="18.4407" cy="9.96109" r="1" transform="rotate(45 18.4407 9.96109)" fill="currentColor" />
      <circle cx="9.90558" cy="9.90024" r="1" transform="rotate(-135 9.90558 9.90024)" fill="currentColor" />
      <circle cx="9.90558" cy="5.65805" r="1" transform="rotate(-135 9.90558 5.65805)" fill="currentColor" />
      <circle cx="9.90558" cy="1.41391" r="1" transform="rotate(-135 9.90558 1.41391)" fill="currentColor" />
      <circle cx="5.66339" cy="9.90024" r="1" transform="rotate(-135 5.66339 9.90024)" fill="currentColor" />
      <circle cx="1.4212" cy="9.90024" r="1" transform="rotate(-135 1.4212 9.90024)" fill="currentColor" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.dropdownArrow}>
      <ellipse cx="13.5" cy="25.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 25.5)" fill="currentColor" />
      <ellipse cx="13.5" cy="19.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 19.5)" fill="currentColor" />
      <ellipse cx="13.5" cy="25.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 25.5)" fill="currentColor" />
      <ellipse cx="7.5" cy="19.5" rx="1.5" ry="1.5" transform="rotate(-90 7.5 19.5)" fill="currentColor" />
      <ellipse cx="19.5" cy="19.5" rx="1.5" ry="1.5" transform="rotate(-90 19.5 19.5)" fill="currentColor" />
      <ellipse cx="25.5" cy="13.5" rx="1.5" ry="1.5" transform="rotate(-90 25.5 13.5)" fill="currentColor" />
      <ellipse cx="1.5" cy="13.5" rx="1.5" ry="1.5" transform="rotate(-90 1.5 13.5)" fill="currentColor" />
      <ellipse cx="13.5" cy="13.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 13.5)" fill="currentColor" />
      <ellipse cx="13.5" cy="7.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 7.5)" fill="currentColor" />
      <ellipse cx="13.5" cy="1.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 1.5)" fill="currentColor" />
    </svg>
  );
}

function RowArrowIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.41" cy="1.41" r="1" fill="currentColor" />
      <circle cx="5.66" cy="1.41" r="1" fill="currentColor" />
      <circle cx="9.9" cy="1.41" r="1" fill="currentColor" />
      <circle cx="3.54" cy="7.78" r="1" fill="currentColor" />
      <circle cx="5.66" cy="5.66" r="1" fill="currentColor" />
      <circle cx="7.78" cy="3.54" r="1" fill="currentColor" />
      <circle cx="1.41" cy="9.9" r="1" fill="currentColor" />
      <circle cx="9.9" cy="5.66" r="1" fill="currentColor" />
      <circle cx="9.9" cy="9.9" r="1" fill="currentColor" />
    </svg>
  );
}

/* ── Dropdown component ─────────────────────── */

interface DropdownProps {
  label: string;
  items: string[];
  selected: Set<string>;
  allKey: string;
  onToggle: (item: string) => void;
}

function Dropdown({ label, items, selected, allKey, onToggle }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.filterItem}${open ? ` ${styles.open}` : ""}`}
    >
      <div className="dropdown">
        <button
          className={styles.dropdownButton}
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          <div className={styles.dropdownButtonLabel}>{label}</div>
          <ArrowDownIcon />
        </button>
        <ul
          className={styles.dropdownList}
          style={{ display: open ? undefined : "none" }}
        >
          {items.map((item) => {
            const id = `${label}-${item}`.replace(/\s+/g, "-").toLowerCase();
            const isAll = item === allKey;
            const checked = isAll ? selected.size === 0 : selected.has(item);
            return (
              <li key={item} className={styles.dropdownListItem}>
                <input
                  id={id}
                  type="checkbox"
                  className={styles.dropdownCheckbox}
                  checked={checked}
                  onChange={() => onToggle(item)}
                />
                <label htmlFor={id} className={styles.dropdownLabel}>
                  {item}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ── Row component ──────────────────────────── */

function JobRow({ job }: { job: JobListing }) {
  return (
    <a href={job.url} className={styles.row} target="_blank" rel="noopener noreferrer">
      <div className={styles.rowTitle}>{job.title}</div>
      <div className={styles.rowCopyWrapper}>
        <div className={styles.rowCopy}>{job.location}</div>
        <div className={styles.rowLink}>
          <span>Apply now</span>
          <div className={styles.rowLinkButton}>
            <RowArrowIcon />
          </div>
        </div>
      </div>
    </a>
  );
}

/* ── Main TeamList component ────────────────── */

export default function TeamList() {
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState<Set<string>>(new Set());
  const [selectedLocs, setSelectedLocs] = useState<Set<string>>(new Set());

  const toggleDept = useCallback((item: string) => {
    setSelectedDepts((prev) => {
      if (item === "All departments") return new Set();
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }, []);

  const toggleLoc = useCallback((item: string) => {
    setSelectedLocs((prev) => {
      if (item === "All locations") return new Set();
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }, []);

  const filteredJobs = useMemo(() => {
    return jobListings.filter((job) => {
      /* Search filter */
      if (search) {
        const q = search.toLowerCase();
        if (
          !job.title.toLowerCase().includes(q) &&
          !job.location.toLowerCase().includes(q) &&
          !job.department.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      /* Department filter */
      if (selectedDepts.size > 0 && !selectedDepts.has(job.department)) {
        return false;
      }
      /* Location filter */
      if (selectedLocs.size > 0) {
        const jobLocs = job.location.split(",").map((l) => l.trim());
        if (!jobLocs.some((l) => selectedLocs.has(l))) {
          return false;
        }
      }
      return true;
    });
  }, [search, selectedDepts, selectedLocs]);

  return (
    <div className={styles.teamList} id="careers">
      <h2 className={styles.title}>Careers</h2>

      {/* ── Filters ──────────────────────────── */}
      <div className={styles.filters}>
        <div className={`grid-container ${styles.filterContainer}`}>
          {/* Search input */}
          <div
            className={`${styles.filterItemSearch}${searchActive ? ` ${styles.active}` : ""}`}
          >
            <input
              type="text"
              className={styles.filterInput}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
            />
            <button className={styles.filterSearchButton} type="button">
              <PlusIcon />
            </button>
          </div>

          {/* Department dropdown */}
          <Dropdown
            label="Departments"
            items={departments}
            selected={selectedDepts}
            allKey="All departments"
            onToggle={toggleDept}
          />

          {/* Location dropdown */}
          <Dropdown
            label="Locations"
            items={locations}
            selected={selectedLocs}
            allKey="All locations"
            onToggle={toggleLoc}
          />
        </div>
      </div>

      {/* ── Job rows ─────────────────────────── */}
      <div className="grid-container">
        {/* List head – desktop only */}
        <div className={styles.listHead}>
          <div>Position</div>
          <div style={{ display: "flex", flex: 0.5, justifyContent: "space-between" }}>
            <div>Location</div>
            <div></div>
          </div>
        </div>

        <div className={styles.rows}>
          {filteredJobs.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
          {filteredJobs.length === 0 && (
            <p className={styles.noResults}>No open positions match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
