"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-animation="default"
      className="navbar_component w-nav"
      data-easing2="ease"
      data-easing="ease"
      data-collapse="medium"
      data-w-id="b6557f25-fd1b-63c9-8ae3-f4a730396f9d"
      role="banner"
      data-duration="400"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.3s ease",
      }}
    >
      <div className="navbar_container">
        <Link href="/" className="navbar_logo-link w-nav-brand">
          <img
            src="https://microtex.co/wp-content/uploads/2023/01/Mctex-logo-New-e1674388359710.png"
            loading="lazy"
            alt="Microtex International"
            className="logo_img"
          />
        </Link>

        <nav role="navigation" className="navbar_menu w-nav-menu">
          <div className="navbar_menu-left">
            <Link href="/solutions" className="navbar_link w-nav-link">
              Machines
            </Link>
            <Link href="/services" className="navbar_link w-nav-link">
              Spare Parts
            </Link>
            <Link href="/our-services" className="navbar_link w-nav-link">
              Services
            </Link>
            <Link href="/about-us" className="navbar_link w-nav-link">
              About Us
            </Link>
          </div>

          <div className="navbar_menu-right">
            <Link href="/contact" className="navbar_link w-nav-link">
              Contact Us
            </Link>

            <a href="mailto:info@microtex.co" className="button is-price w-inline-block">
              <div>Get in touch</div>
              <div className="button-circle">
                <div className="arrow-right w-embed">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 12 10"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                    role="img"
                  >
                    <path
                      d="M7 0L6.285 0.6965L10.075 4.5H0V5.5H10.075L6.285 9.2865L7 10L12 5L7 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </nav>

        <div className="navbar_menu-button w-nav-button">
          <div className="menu-icon">
            <div className="menu-icon_line-top"></div>
            <div className="menu-icon_line-middle">
              <div className="menu-icon_line-middle-inner"></div>
            </div>
            <div className="menu-icon_line-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
