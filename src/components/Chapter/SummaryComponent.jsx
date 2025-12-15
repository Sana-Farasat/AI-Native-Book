import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Summary.module.css';

// Define summaries for each chapter
const chapterSummaries = {
  'introduction-physical-ai': {
    title: 'Introduction to Physical AI & Embodied Intelligence',
    keyPoints: [
      'Physical AI emphasizes the importance of embodiment in intelligence',
      'Embodied intelligence suggests the body is integral to cognition, not just an output device',
      'Humanoid robots integrate perception, action, and cognition systems',
      'Sensorimotor integration occurs at low, mid, and high levels of complexity',
      'The Free Energy Principle provides a theoretical framework for understanding embodied intelligence',
      'Physical AI differs from traditional AI by considering the role of the physical body and environment in intelligence'
    ],
    mindmap: `graph TD
      A[Physical AI] --> B[Embodiment]
      A --> C[Emergence]
      A --> D[Sensorimotor Contingencies]
      A --> E[Morphological Computation]
      B --> F[Intelligence Shaped by Body]
      C --> G[Complex Behaviors from Simple Interactions]
      D --> H[Perception through Movement]
      E --> I[Body contributes to Computation]
      F --> J[Humanoid Robotics]
      G --> J
      H --> J
      I --> J
      J --> K[Intelligent Behavior]`
  },
  'ros2-deep-dive': {
    title: 'The Robotic Nervous System – ROS 2 Deep Dive',
    keyPoints: [
      'ROS 2 provides the communication infrastructure for humanoid robots',
      'Core concepts include nodes, topics, services, and actions',
      'QoS settings allow tuning communication behavior',
      'Launch files enable coordinated system startup',
      'Security features protect robot systems',
      'Real-time considerations are crucial for safety-critical functions',
      'Proper architecture follows best practices for modularity and reliability'
    ],
    mindmap: `graph LR
      A[ROS 2 Architecture] --> B[Nodes]
      A --> C[Topics]
      A --> D[Services]
      A --> E[Actions]
      B --> F[Computation Processes]
      C --> G[Publish-Subscribe Model]
      D --> H[Request-Response Model]
      E --> I[Goal-Framework Model]
      A --> J[QoS Settings]
      J --> K[Reliability]
      J --> L[Durability]
      J --> M[History]
      A --> N[Launch Files]
      A --> O[Security]`
  },
  // Additional chapters would follow similar structure
};

const SummaryComponent = ({ chapterId }) => {
  const summary = chapterSummaries[chapterId] || chapterSummaries['introduction-physical-ai'];
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryHeader} onClick={toggleExpanded}>
        <h3>Chapter Summary: {summary.title}</h3>
        <span className={styles.toggleIcon}>{expanded ? '−' : '+'}</span>
      </div>
      
      {expanded && (
        <div className={styles.summaryContent}>
          <h4>Key Points:</h4>
          <ul className={styles.keyPointsList}>
            {summary.keyPoints.map((point, index) => (
              <li key={index} className={styles.keyPoint}>{point}</li>
            ))}
          </ul>
          
          <h4>Chapter Mindmap:</h4>
          <div className={styles.mindmapContainer}>
            <pre className={styles.mermaidCode}>
              {summary.mindmap}
            </pre>
            <p className={styles.mindmapDescription}>
              This diagram illustrates the relationships between the key concepts covered in this chapter.
              You can visualize this using a Mermaid diagram tool.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryComponent;