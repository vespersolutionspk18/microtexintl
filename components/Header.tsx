"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useContactPanel } from "./ContactPanelContext";
import styles from "./Header.module.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [machinesOpen, setMachinesOpen] = useState(false);
  const [sparesOpen, setSparesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { open: openContactPanel } = useContactPanel();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
    if (!mobileOpen) {
      setServicesOpen(false);
      setMachinesOpen(false);
      setSparesOpen(false);
    }
  };

  const toggleServices = () => {
    setServicesOpen((prev) => !prev);
  };

  const toggleMachines = () => {
    setMachinesOpen((prev) => !prev);
  };

  const toggleSpares = () => {
    setSparesOpen((prev) => !prev);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMachinesOpen(false);
    setSparesOpen(false);
  };

  return (
    <nav className={`${styles.menu} ${mobileOpen ? styles.mobileOpen : ""} ${hidden && !mobileOpen ? styles.menuHidden : ""}`}>
      <div className={styles.inner}>
        {/* Top bar with logo and burger */}
        <div className={styles.bar}>
          <Link href="/" className={styles.logo} onClick={closeMobile} aria-label="Link to homepage">
            <svg className={styles.logoSvg} viewBox="0 0 70.24 26.12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,26.08c.12-.07,.21-.18,.31-.28,.94-.93,1.87-1.87,2.81-2.8,1.62-1.61,3.23-3.23,4.85-4.84,1.3-1.3,2.61-2.6,3.91-3.9,1.31-1.3,2.62-2.61,3.92-3.91,1.96-1.96,3.93-3.91,5.89-5.87,1.3-1.3,2.61-2.6,3.91-3.9,.18-.18,.36-.35,.53-.53,.07-.07,.11-.08,.19,0,.21,.22,.44,.44,.66,.66,1.52,1.52,3.03,3.04,4.56,4.55,.1,.09,.09,.14,0,.23-.56,.55-1.11,1.11-1.67,1.65-1.53,1.49-3.02,3.01-4.53,4.51-.56,.55-1.11,1.11-1.67,1.66-1.58,1.54-3.13,3.12-4.69,4.67-.51,.5-1.01,1.02-1.53,1.52-2.09,2.05-4.15,4.14-6.23,6.2-.12,.12-.25,.23-.36,.35-.06,.06-.13,.05-.2,.05-2.62,0-5.24,0-7.86,0-.94,0-1.88,0-2.82,0v-.03Z" fill="#fff"/>
              <path d="M19.05,26.11h-1.5c.06-.06,.1-.11,.14-.15,.44-.44,.87-.89,1.32-1.31,.9-.85,1.74-1.75,2.63-2.6,.89-.85,1.73-1.74,2.62-2.59,.9-.86,1.76-1.77,2.66-2.63,.88-.84,1.72-1.73,2.6-2.57,.9-.86,1.75-1.77,2.65-2.62,.86-.82,1.67-1.69,2.53-2.51,.93-.88,1.81-1.82,2.74-2.71,.89-.85,1.73-1.75,2.62-2.59,.9-.86,1.75-1.77,2.66-2.62,.4-.37,.77-.77,1.17-1.15,.09-.09,.13-.07,.21,0,.73,.75,1.47,1.49,2.2,2.24,.46,.48,.94,.95,1.41,1.43,.54,.56,1.09,1.11,1.64,1.66,.07,.07,.06,.1,0,.16-.61,.59-1.21,1.19-1.82,1.78-.39,.37-.76,.75-1.14,1.12-.48,.47-.95,.94-1.44,1.4-.44,.42-.86,.85-1.3,1.27-.87,.85-1.74,1.7-2.61,2.54-.07,.07-.14,.14-.21,.19-.08,.06-.05,.1,0,.16,.48,.49,.95,.99,1.42,1.48,.71,.74,1.43,1.49,2.14,2.23,.44,.46,.88,.93,1.33,1.39,.72,.75,1.43,1.49,2.15,2.24,.45,.47,.91,.95,1.36,1.42,.47,.49,.95,.99,1.42,1.48,.46,.48,.91,.95,1.37,1.43,.12,.12,.23,.25,.37,.4h-1.43c-.05-.03-.11-.01-.16-.01-.95,0-1.9,0-2.85,0-.06,0-.11,0-.17,0-.01,0-.03,0-.04,0-1.05,0-2.1,0-3.16,0-.05-.03-.11-.01-.16-.01-.85,0-1.7,0-2.54,0-.06,0-.11,0-.17,0-.31-.31-.63-.62-.92-.94-.31-.34-.65-.65-.98-.98-.27-.27-.55-.53-.81-.81-.65-.71-1.37-1.34-2.02-2.05-.55-.6-1.16-1.14-1.71-1.73-.07-.08-.11-.08-.19,0-.93,.94-1.86,1.87-2.78,2.82-.54,.56-1.09,1.11-1.64,1.66-.65,.66-1.31,1.32-1.96,1.99-.01,.01-.02,.03-.03,.05-.05,.03-.11,.02-.16,.02-.88,0-1.76,0-2.64,0-.06,0-.11-.01-.17,.01-1.11,0-2.21,0-3.32,0-.05,.02-.11,0-.17,0-1,0-2,0-3,0-.05,0-.11-.01-.16,.01Z" fill="#fff"/>
              <path d="M70.24,26.11c-.08,0-.14,0-.19,0-3.59,0-7.18,0-10.77,0-.11,0-.2-.03-.28-.11-1-1.01-2.02-1.99-3.01-3.01-1.24-1.28-2.53-2.52-3.77-3.8-1.17-1.21-2.39-2.37-3.55-3.59-.47-.5-.97-.97-1.45-1.46-.08-.08-.06-.12,0-.18,.74-.7,1.44-1.43,2.18-2.13,.5-.47,.96-.98,1.46-1.44,.61-.57,1.19-1.17,1.79-1.76,.1-.1,.16-.06,.24,.02,1.95,1.96,3.9,3.91,5.84,5.88,.92,.94,1.86,1.87,2.79,2.8,.8,.81,1.61,1.61,2.41,2.42,1.73,1.77,3.49,3.5,5.23,5.26,.35,.36,.71,.71,1.08,1.1Z" fill="#fff"/>
            </svg>
            <div className={styles.logoBg} />
          </Link>
          <button
            className={styles.burger}
            onClick={toggleMobile}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2.82843" cy="2.82812" r="2" transform="rotate(-45 2.82843 2.82812)" fill="currentColor" />
              <circle cx="8.16241" cy="2.82812" r="2" transform="rotate(-45 8.16241 2.82812)" fill="currentColor" />
              <circle cx="13.4944" cy="2.82812" r="2" transform="rotate(-45 13.4944 2.82812)" fill="currentColor" />
              <circle cx="2.82843" cy="8.16211" r="2" transform="rotate(-45 2.82843 8.16211)" fill="currentColor" />
              <circle cx="8.16241" cy="8.16211" r="2" transform="rotate(-45 8.16241 8.16211)" fill="currentColor" />
              <circle cx="13.4944" cy="8.16211" r="2" transform="rotate(-45 13.4944 8.16211)" fill="currentColor" />
              <circle cx="2.82812" cy="13.4944" r="2" transform="rotate(45 2.82812 13.4944)" fill="currentColor" />
              <circle cx="8.16211" cy="13.4944" r="2" transform="rotate(45 8.16211 13.4944)" fill="currentColor" />
              <circle cx="13.4941" cy="13.4944" r="2" transform="rotate(45 13.4941 13.4944)" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Navigation container */}
        <div className={styles.container}>
          <ul className={styles.list}>
            {/* Services with sub-menu */}
            <li className={styles.listItem}>
              <button
                className={styles.listItemLink}
                onClick={toggleServices}
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <svg
                  className={styles.chevron}
                  viewBox="0 0 8 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="1" transform="rotate(-90 4 4)" fill="currentColor" />
                  <circle cx="7" cy="1" r="1" transform="rotate(-90 7 1)" fill="currentColor" />
                  <circle cx="1" cy="1" r="1" transform="rotate(-90 1 1)" fill="currentColor" />
                </svg>
              </button>
              <ul
                className={`${styles.subList} ${servicesOpen ? styles.subListOpen : ""}`}
              >
                <li>
                  <Link
                    href="/services/upgradation"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    Upgradation & Installation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/conversion-kits"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    Format & Conversion Kits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/rebuilding"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    Support & Rebuilding
                  </Link>
                </li>
              </ul>
            </li>

            {/* Machines with sub-menu */}
            <li className={styles.listItem}>
              <button
                className={styles.listItemLink}
                onClick={toggleMachines}
                aria-expanded={machinesOpen}
              >
                <span>Machines</span>
                <svg
                  className={styles.chevron}
                  viewBox="0 0 8 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="1" transform="rotate(-90 4 4)" fill="currentColor" />
                  <circle cx="7" cy="1" r="1" transform="rotate(-90 7 1)" fill="currentColor" />
                  <circle cx="1" cy="1" r="1" transform="rotate(-90 1 1)" fill="currentColor" />
                </svg>
              </button>
              <ul
                className={`${styles.subList} ${machinesOpen ? styles.subListOpen : ""}`}
              >
                <li>
                  <Link
                    href="/machines/wrapper-machine"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    Wrapper Machine
                  </Link>
                </li>
                <li>
                  <Link
                    href="/machines/over-wrapper"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    Over Wrapper
                  </Link>
                </li>
                <li>
                  <Link
                    href="/machines/high-speed-boxer"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    High Speed Boxer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/machines/case-packer"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    Case Packer
                  </Link>
                </li>
              </ul>
            </li>

            {/* Spare Parts with sub-menu */}
            <li className={styles.listItem}>
              <button
                className={styles.listItemLink}
                onClick={toggleSpares}
                aria-expanded={sparesOpen}
              >
                <span>Spare Parts</span>
                <svg
                  className={styles.chevron}
                  viewBox="0 0 8 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="1" transform="rotate(-90 4 4)" fill="currentColor" />
                  <circle cx="7" cy="1" r="1" transform="rotate(-90 7 1)" fill="currentColor" />
                  <circle cx="1" cy="1" r="1" transform="rotate(-90 1 1)" fill="currentColor" />
                </svg>
              </button>
              <ul
                className={`${styles.subList} ${sparesOpen ? styles.subListOpen : ""}`}
              >
                <li>
                  <Link
                    href="/spare-parts/mk8-mk9-mk95-maker-spare-parts"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    MK8/MK9/MK95 Maker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/spare-parts/hauni-protos-70-80-90-maker-spare-parts"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    Hauni Protos 70/80/90
                  </Link>
                </li>
                <li>
                  <Link
                    href="/spare-parts/hlp-cigarette-packing-machine-spare-parts"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    Molins HLP Packer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/spare-parts/gd-x1-gd-x2-packer-spare-parts"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    GD X1 & GD X2 Packer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/spare-parts/tobacco-garniture-suction-tapes"
                    className={`${styles.listItemLink} ${styles.subLink}`}
                    onClick={closeMobile}
                  >
                    Garniture & Suction Tapes
                  </Link>
                </li>
              </ul>
            </li>

            {/* About Us */}
            <li className={styles.listItem}>
              <Link
                href="/about"
                className={styles.listItemLink}
                onClick={closeMobile}
              >
                About Us
              </Link>
            </li>

            {/* News */}
            <li className={styles.listItem}>
              <Link
                href="/news"
                className={styles.listItemLink}
                onClick={closeMobile}
              >
                News
              </Link>
            </li>
          </ul>

          {/* Get in touch button */}
          <button
            className={styles.contactButton}
            onClick={() => {
              closeMobile();
              openContactPanel();
            }}
          >
            Get in touch
          </button>

          {/* Mobile overlay backdrop */}
          <div className={styles.mobileOverlay} onClick={closeMobile} />
        </div>
      </div>
    </nav>
  );
}
