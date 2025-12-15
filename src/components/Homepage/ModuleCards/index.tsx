/**
 * Module cards component with hover effects for the 7 chapters
 * Implements the requirements for the Physical AI & Humanoid Robotics textbook
 */

import React, { JSX } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ModuleCards.module.css';

// Module data for the 7 chapters
// const modules = [
//   {
//     id: 1,
//     title: "Introduction to Physical AI",
//     description: "Exploring the fundamentals of Physical AI and embodied intelligence in humanoid robotics",
//     // path: "/docs/01-introduction-to-physical-ai",
//     path: "http://localhost:3000/physical-ai-and-humanoid-robotics-textbook/docs/introduction-to-physical-ai/",
//     image:"/img/cards-img.webp",
//   },
//   {
//     id: 2,
//     title: "ROS 2 – The Robotic Nervous System",
//     description: "Understanding ROS 2 architecture and its role in humanoid robotics",
//     path: "http://localhost:3000/physical-ai-and-humanoid-robotics-textbook/docs/ros2-deep-dive/",
//     image:"/img/cards-img.webp",
//   },
//   {
//     id: 3,
//     title: "Digital Twins – Simulation with Gazebo & Isaac Sim",
//     description: "Creating and using digital twins for humanoid robot development in simulation",
//     path: "/docs/03-digital-twins",
//     image:"/img/cards-img.webp",
//   },
//   {
//     id: 4,
//     title: "NVIDIA Isaac Platform & Synthetic Data",
//     description: "Building intelligent robot brains using NVIDIA Isaac platform and synthetic data",
//     path: "/docs/04-nvidia-isaac",
//     image:"/img/cards-img.webp",
//   },
//   {
//     id: 5,
//     title: "Vision-Language-Action (VLA) Models",
//     description: "Understanding and implementing VLA models for humanoid robot intelligence",
//     path: "/docs/05-vision-language-action",
//     image:"/img/cards-img.webp",
//   },
//   {
//     id: 6,
//     title: "Building & Controlling Real Humanoid Robots",
//     description: "Practical guide to building, programming, and controlling humanoid robots",
//     path: "/docs/06-real-humanoid-robots",
//     image:"/img/cards-img.webp",
//   },
//   {
//     id: 7,
//     title: "Capstone Project – Autonomous Conversational Humanoid",
//     description: "Implementing a complete autonomous conversational humanoid robot",
//     path: "/docs/07-capstone-project",
//     image:"/img/cards-img.webp",
//   }
// ];

const modules = [
  {
    id: 1,
    title: "Introduction to Physical AI",
    description: "Exploring the fundamentals of Physical AI and embodied intelligence in humanoid robotics",
    path: "/docs/introduction-to-physical-ai",
    image: "/img/cards-img.webp",
  },
  {
    id: 2,
    title: "ROS 2 – The Robotic Nervous System",
    description: "Understanding ROS 2 architecture and its role in humanoid robotics",
    path: "/docs/ros2-deep-dive",
    image: "/img/cards-img.webp",
  },
  {
    id: 3,
    title: "Digital Twins – Simulation with Gazebo & Isaac Sim",
    description: "Creating and using digital twins for humanoid robot development in simulation",
    path: "/docs/digital-twins",
    image: "/img/cards-img.webp",
  },
  {
    id: 4,
    title: "NVIDIA Isaac Platform & Synthetic Data",
    description: "Building intelligent robot brains using NVIDIA Isaac platform and synthetic data",
    path: "/docs/nvidia-isaac",
    image: "/img/cards-img.webp",
  },
  {
    id: 5,
    title: "Vision-Language-Action (VLA) Models",
    description: "Understanding and implementing VLA models for humanoid robot intelligence",
    path: "/docs/vision-language-action",
    image: "/img/cards-img.webp",
  },
  {
    id: 6,
    title: "Building & Controlling Real Humanoid Robots",
    description: "Practical guide to building, programming, and controlling humanoid robots",
    path: "/docs/real-humanoid-robots",
    image: "/img/cards-img.webp",
  },
  {
    id: 7,
    title: "Capstone Project – Autonomous Conversational Humanoid",
    description: "Implementing a complete autonomous conversational humanoid robot",
    path: "/docs/capstone-project",
    image: "/img/cards-img.webp",
  }
];


function ModuleCards(): JSX.Element {
  return (
    <div className={styles.moduleCardsContainer}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Course Modules</h2>
        <p className={styles.sectionSubtitle}>
          Explore the complete curriculum of the Physical AI & Humanoid Robotics textbook
        </p>
        <div className={styles.cardsGrid}>
          {modules.map((module) => (
            <Link 
              key={module.id} 
              //to={useBaseUrl(module.path)}
              to={module.path}  
              className={clsx(styles.moduleCard, styles.glowCard)}
            >
              <div className={styles.cardImageContainer}>
                <img 
                  src={useBaseUrl(module.image)} 
                  alt={module.title} 
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{module.title}</h3>
                <p className={styles.cardDescription}>{module.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModuleCards;