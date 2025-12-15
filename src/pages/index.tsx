/**
 * Custom homepage component incorporating hero section and module cards
 * Implements the requirements for the Physical AI & Humanoid Robotics textbook
 */

import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Homepage/Hero';
import ModuleCards from '@site/src/components/Homepage/ModuleCards';
import styles from './Homepage.module.css';

export default function Homepage(): JSX.Element {
  return (
    <Layout
      title={`Physical AI & Humanoid Robotics`}
      description="A comprehensive textbook on Physical AI and Humanoid Robotics using ROS 2, Gazebo, NVIDIA Isaac Sim, and Vision-Language-Action Models">
      <main>
        <Hero />
        <ModuleCards />
      </main>
    </Layout>
  );
}