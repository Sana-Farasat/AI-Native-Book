/**
 * Custom Hero section component with humanoid robot + AI brain background
 * Implements the requirements for the Physical AI & Humanoid Robotics textbook
 */

import React, { JSX } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './Hero.module.css';

function Hero(): JSX.Element {
  return (
    <div className={clsx('hero', styles.hero)}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          Physical AI & Humanoid Robotics
        </h1>
        <p className={styles.heroSubtitle}>
          From Simulated Brains to Embodied Intelligence
        </p>
        <p className={styles.heroTagline}>
          A Hands-On Capstone Textbook using ROS 2, Gazebo, NVIDIA Isaac Sim, and Vision-Language-Action Models
        </p>
        <div className={styles.buttonsContainer}>
          <Link
            className={clsx(
              'button button--outline button--secondary button--lg',
              styles.heroButton,
              styles.glowingButton
            )}
            to={useBaseUrl('/docs/introduction-to-physical-ai')}>
            Start Reading the Book →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;