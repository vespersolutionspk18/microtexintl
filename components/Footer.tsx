"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import styles from "./Footer.module.css";

function Backdrop({ visible }: { visible: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <div
      className={`${styles.backdrop} ${visible ? styles.backdropVisible : ""}`}
    />,
    document.body
  );
}

export default function Footer() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [machinesOpen, setMachinesOpen] = useState(false);
  const [sparesOpen, setSparesOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const onEnter = () => {
    clearTimeout(hoverTimeout.current);
    setHovered(true);
  };
  const onLeave = () => {
    hoverTimeout.current = setTimeout(() => setHovered(false), 80);
  };

  return (
    <footer className={styles.footer}>
      <Backdrop visible={hovered} />
      <div className={styles.footerContainer}>
        {/* Copy and CTA */}
        <div className={styles.copyWrapper}>
          <p className={styles.footerCopy}>
            Packaging is complex. Reaching us isn&rsquo;t. Contact the Microtex
            team anytime.
          </p>
          <Link href="/contact" className={styles.baseButton}>
            <span className={styles.buttonBg} />
            <span className={styles.fillEffect} />
            <span className={styles.buttonLabel}>Get in touch</span>
          </Link>
        </div>

        {/* Navigation list */}
        <div className={styles.listWrapper}>
          <ul className={styles.list}>
            {/* Services with sub-menu */}
            <li
              className={styles.listItem}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <button
                className={styles.listItemLink}
                onClick={() => setServicesOpen((p) => !p)}
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <svg className={styles.chevron} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4" cy="4" r="1" transform="rotate(-90 4 4)" fill="currentColor" />
                  <circle cx="7" cy="1" r="1" transform="rotate(-90 7 1)" fill="currentColor" />
                  <circle cx="1" cy="1" r="1" transform="rotate(-90 1 1)" fill="currentColor" />
                </svg>
              </button>
              <ul className={`${styles.subList} ${servicesOpen ? styles.subListOpen : ""}`}>
                <li>
                  <Link href="/services/upgradation" className={`${styles.listItemLink} ${styles.subLink}`}>
                    Upgradation &amp; Installation
                  </Link>
                </li>
                <li>
                  <Link href="/services/conversion-kits" className={`${styles.listItemLink} ${styles.subLink}`}>
                    Format &amp; Conversion Kits
                  </Link>
                </li>
                <li>
                  <Link href="/services/rebuilding" className={`${styles.listItemLink} ${styles.subLink}`}>
                    Support &amp; Rebuilding
                  </Link>
                </li>
              </ul>
            </li>

            {/* Machines with sub-menu */}
            <li
              className={styles.listItem}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <button
                className={styles.listItemLink}
                onClick={() => setMachinesOpen((p) => !p)}
                aria-expanded={machinesOpen}
              >
                <span>Machines</span>
                <svg className={styles.chevron} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4" cy="4" r="1" transform="rotate(-90 4 4)" fill="currentColor" />
                  <circle cx="7" cy="1" r="1" transform="rotate(-90 7 1)" fill="currentColor" />
                  <circle cx="1" cy="1" r="1" transform="rotate(-90 1 1)" fill="currentColor" />
                </svg>
              </button>
              <ul className={`${styles.subList} ${machinesOpen ? styles.subListOpen : ""}`}>
                <li>
                  <Link href="/machines/wrapper-machine" className={`${styles.listItemLink} ${styles.subLink}`}>
                    Wrapper Machine
                  </Link>
                </li>
                <li>
                  <Link href="/machines/over-wrapper" className={`${styles.listItemLink} ${styles.subLink}`}>
                    Over Wrapper
                  </Link>
                </li>
                <li>
                  <Link href="/machines/high-speed-boxer" className={`${styles.listItemLink} ${styles.subLink}`}>
                    High Speed Boxer
                  </Link>
                </li>
                <li>
                  <Link href="/machines/case-packer" className={`${styles.listItemLink} ${styles.subLink}`}>
                    Case Packer
                  </Link>
                </li>
              </ul>
            </li>

            {/* Spare Parts with sub-menu */}
            <li
              className={styles.listItem}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <button
                className={styles.listItemLink}
                onClick={() => setSparesOpen((p) => !p)}
                aria-expanded={sparesOpen}
              >
                <span>Spare Parts</span>
                <svg className={styles.chevron} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4" cy="4" r="1" transform="rotate(-90 4 4)" fill="currentColor" />
                  <circle cx="7" cy="1" r="1" transform="rotate(-90 7 1)" fill="currentColor" />
                  <circle cx="1" cy="1" r="1" transform="rotate(-90 1 1)" fill="currentColor" />
                </svg>
              </button>
              <ul className={`${styles.subList} ${sparesOpen ? styles.subListOpen : ""}`}>
                <li>
                  <Link href="/spare-parts/mk8-mk9-mk95-maker-spare-parts" className={`${styles.listItemLink} ${styles.subLink}`}>
                    MK8/MK9/MK95 Maker
                  </Link>
                </li>
                <li>
                  <Link href="/spare-parts/hauni-protos-70-80-90-maker-spare-parts" className={`${styles.listItemLink} ${styles.subLink}`}>
                    Hauni Protos 70/80/90
                  </Link>
                </li>
                <li>
                  <Link href="/spare-parts/hlp-cigarette-packing-machine-spare-parts" className={`${styles.listItemLink} ${styles.subLink}`}>
                    Molins HLP Packer
                  </Link>
                </li>
                <li>
                  <Link href="/spare-parts/gd-x1-gd-x2-packer-spare-parts" className={`${styles.listItemLink} ${styles.subLink}`}>
                    GD X1 &amp; GD X2 Packer
                  </Link>
                </li>
                <li>
                  <Link href="/spare-parts/tobacco-garniture-suction-tapes" className={`${styles.listItemLink} ${styles.subLink}`}>
                    Garniture &amp; Suction Tapes
                  </Link>
                </li>
              </ul>
            </li>

            {/* About Us */}
            <li className={styles.listItem}>
              <Link href="/about" className={styles.listItemLink}>
                About Us
              </Link>
            </li>

            {/* News */}
            <li className={styles.listItem}>
              <Link href="/news" className={styles.listItemLink}>
                News
              </Link>
            </li>

            {/* Contact */}
            <li className={styles.listItem}>
              <Link href="/contact" className={styles.listItemLink}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Social links and legal */}
          <div className={styles.socialLinksWrapper}>
            <ul className={styles.socialLinks}>
              <li>
                <a
                  href="https://www.linkedin.com/company/microtex-international/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="linkedin"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8157 14.4922H12.269V10.5039C12.269 9.55335 12.2497 8.33016 10.9398 8.33016C9.61189 8.33016 9.41245 9.36562 9.41245 10.4337V14.4922H6.86572V6.42188H9.31287V7.53908H9.34529C9.6886 6.89379 10.528 6.21272 11.7909 6.21272C14.3714 6.21272 14.8483 7.90721 14.8483 10.114V14.4922H14.8157ZM3.55816 5.28879C2.74883 5.28879 2.10199 4.63368 2.10199 3.83489C2.10199 3.03609 2.75528 2.38099 3.55816 2.38099C4.35459 2.38099 5.01432 3.03609 5.01432 3.83489C5.01432 4.63368 4.36104 5.28879 3.55816 5.28879ZM4.83807 14.4922H2.27825V6.42188H4.83807V14.4922ZM16.0891 0.427734H0.998495C0.449012 0.427734 0 0.860629 0 1.39411V15.6033C0 16.143 0.449012 16.5697 0.998495 16.5697H16.083C16.6325 16.5697 17.0879 16.143 17.0879 15.6033V1.39411C17.0879 0.860629 16.6325 0.427734 16.083 0.427734H16.0891Z" fill="currentColor" />
                  </svg>
                </a>
              </li>
            </ul>
            <ul className={`${styles.legalLinks} ${styles.hiddenDesktop}`}>
              <li className={styles.legalListItem}>
                <Link href="/terms-of-use">Terms of Use</Link>
              </li>
              <li className={styles.legalListItem}>
                <Link href="/privacy-policy">Privacy and Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer logo */}
        <div className={styles.footerLogo}>
          <svg viewBox="0 0 70.24 26.12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,26.08c.12-.07,.21-.18,.31-.28,.94-.93,1.87-1.87,2.81-2.8,1.62-1.61,3.23-3.23,4.85-4.84,1.3-1.3,2.61-2.6,3.91-3.9,1.31-1.3,2.62-2.61,3.92-3.91,1.96-1.96,3.93-3.91,5.89-5.87,1.3-1.3,2.61-2.6,3.91-3.9,.18-.18,.36-.35,.53-.53,.07-.07,.11-.08,.19,0,.21,.22,.44,.44,.66,.66,1.52,1.52,3.03,3.04,4.56,4.55,.1,.09,.09,.14,0,.23-.56,.55-1.11,1.11-1.67,1.65-1.53,1.49-3.02,3.01-4.53,4.51-.56,.55-1.11,1.11-1.67,1.66-1.58,1.54-3.13,3.12-4.69,4.67-.51,.5-1.01,1.02-1.53,1.52-2.09,2.05-4.15,4.14-6.23,6.2-.12,.12-.25,.23-.36,.35-.06,.06-.13,.05-.2,.05-2.62,0-5.24,0-7.86,0-.94,0-1.88,0-2.82,0v-.03Z" fill="#fff"/>
            <path d="M19.05,26.11h-1.5c.06-.06,.1-.11,.14-.15,.44-.44,.87-.89,1.32-1.31,.9-.85,1.74-1.75,2.63-2.6,.89-.85,1.73-1.74,2.62-2.59,.9-.86,1.76-1.77,2.66-2.63,.88-.84,1.72-1.73,2.6-2.57,.9-.86,1.75-1.77,2.65-2.62,.86-.82,1.67-1.69,2.53-2.51,.93-.88,1.81-1.82,2.74-2.71,.89-.85,1.73-1.75,2.62-2.59,.9-.86,1.75-1.77,2.66-2.62,.4-.37,.77-.77,1.17-1.15,.09-.09,.13-.07,.21,0,.73,.75,1.47,1.49,2.2,2.24,.46,.48,.94,.95,1.41,1.43,.54,.56,1.09,1.11,1.64,1.66,.07,.07,.06,.1,0,.16-.61,.59-1.21,1.19-1.82,1.78-.39,.37-.76,.75-1.14,1.12-.48,.47-.95,.94-1.44,1.4-.44,.42-.86,.85-1.3,1.27-.87,.85-1.74,1.7-2.61,2.54-.07,.07-.14,.14-.21,.19-.08,.06-.05,.1,0,.16,.48,.49,.95,.99,1.42,1.48,.71,.74,1.43,1.49,2.14,2.23,.44,.46,.88,.93,1.33,1.39,.72,.75,1.43,1.49,2.15,2.24,.45,.47,.91,.95,1.36,1.42,.47,.49,.95,.99,1.42,1.48,.46,.48,.91,.95,1.37,1.43,.12,.12,.23,.25,.37,.4h-1.43c-.05-.03-.11-.01-.16-.01-.95,0-1.9,0-2.85,0-.06,0-.11,0-.17,0-.01,0-.03,0-.04,0-1.05,0-2.1,0-3.16,0-.05-.03-.11-.01-.16-.01-.85,0-1.7,0-2.54,0-.06,0-.11,0-.17,0-.31-.31-.63-.62-.92-.94-.31-.34-.65-.65-.98-.98-.27-.27-.55-.53-.81-.81-.65-.71-1.37-1.34-2.02-2.05-.55-.6-1.16-1.14-1.71-1.73-.07-.08-.11-.08-.19,0-.93,.94-1.86,1.87-2.78,2.82-.54,.56-1.09,1.11-1.64,1.66-.65,.66-1.31,1.32-1.96,1.99-.01,.01-.02,.03-.03,.05-.05,.03-.11,.02-.16,.02-.88,0-1.76,0-2.64,0-.06,0-.11-.01-.17,.01-1.11,0-2.21,0-3.32,0-.05,.02-.11,0-.17,0-1,0-2,0-3,0-.05,0-.11-.01-.16,.01Z" fill="#fff"/>
            <path d="M70.24,26.11c-.08,0-.14,0-.19,0-3.59,0-7.18,0-10.77,0-.11,0-.2-.03-.28-.11-1-1.01-2.02-1.99-3.01-3.01-1.24-1.28-2.53-2.52-3.77-3.8-1.17-1.21-2.39-2.37-3.55-3.59-.47-.5-.97-.97-1.45-1.46-.08-.08-.06-.12,0-.18,.74-.7,1.44-1.43,2.18-2.13,.5-.47,.96-.98,1.46-1.44,.61-.57,1.19-1.17,1.79-1.76,.1-.1,.16-.06,.24,.02,1.95,1.96,3.9,3.91,5.84,5.88,.92,.94,1.86,1.87,2.79,2.8,.8,.81,1.61,1.61,2.41,2.42,1.73,1.77,3.49,3.5,5.23,5.26,.35,.36,.71,.71,1.08,1.1Z" fill="#fff"/>
          </svg>
          <span className={styles.footerLogoText}>MICROTEX</span>
        </div>

        {/* Footnote */}
        <div className={styles.footnoteWrapper}>
          <p>&copy; 2026 All rights reserved, Microtex International.</p>
          <ul className={`${styles.legalLinks} ${styles.hiddenMobile}`}>
            <li className={styles.legalListItem}>
              <Link href="/terms-of-use">Terms of Use</Link>
            </li>
            <li className={styles.legalListItem}>
              <Link href="/privacy-policy">Privacy and Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
