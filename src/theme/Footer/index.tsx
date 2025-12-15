import React, { JSX } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "@docusaurus/router";
import styles from "./Footer.module.css";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

function Footer(): JSX.Element {
  const location = useLocation();

  // Don't show footer on certain pages if needed
  if (location.pathname.includes("pathname-to-exclude")) {
    return null;
  }

  return (
    <footer className={clsx("footer", styles.footer)}>
      <div className="container container-fluid">
        {/* Branding Section */}
        <div className={styles.brandingSection}>
          <div className={styles.branding}>
            <div className={styles.logo}>
              <img
                src={useBaseUrl("/img/book.webp")}
                alt="Physical AI & Humanoid Robotics Logo"
                className={styles.logoImg}
              />
            </div>
            <div className={styles.brandText}>
              <h4 className={styles.brandTitle}>
                Physical AI & Humanoid Robotics
              </h4>
              <p className={styles.brandSubtitle}>
                From Simulated Brains to Embodied Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className={styles.socialSection}>
          <div className={styles.socialLinks}>
            <Link
              href="https://youtube.com/your-channel"
              className={styles.socialLink}
            >
              <Facebook />
            </Link>
            <Link
              href="https://twitter.com/your-profile"
              className={styles.socialLink}
            >
              <Twitter />
            </Link>
            <Link
              href="https://linkedin.com/your-profile"
              className={styles.socialLink}
            >
              <Linkedin />
            </Link>
            <Link
              href="https://github.com/your-profile"
              className={styles.socialLink}
            >
              <Github />
            </Link>
          </div>
        </div>

        {/* Copyright and Urdu text */}
        <div className={styles.copyrightSection}>
          <p className={styles.copyright}>
            Copyright © {new Date().getFullYear()} Your Name – Physical AI
            Textbook
          </p>
          {/* <p className={clsx(styles.urduText, 'ur-text')}>
            فزکل AI اور ہیومینائیڈ روبوٹکس
          </p> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
