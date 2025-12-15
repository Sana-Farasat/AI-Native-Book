import React from 'react';
import clsx from 'clsx';
import styles from './Textbook.module.css';

// Custom MDX component for the Physical AI & Humanoid Robotics textbook
// Ensures compatibility with Docusaurus v3, dark mode, and mobile responsiveness

interface TextbookProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  fullWidth?: boolean;
}

// Base textbook component
export function Textbook({ children, className, centered = false, fullWidth = false }: TextbookProps) {
  const classes = clsx(
    styles.textbook,
    className,
    {
      [styles.centered]: centered,
      [styles.fullWidth]: fullWidth,
    }
  );
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

// Component for displaying code examples with proper syntax highlighting
interface CodeExampleProps {
  children: React.ReactNode;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeExample({ children, language = 'python', title, className }: CodeExampleProps) {
  const classes = clsx(
    styles.codeExample,
    className
  );
  
  return (
    <div className={classes}>
      {title && <div className={styles.codeTitle}>{title}</div>}
      <div className={styles.codeBlock}>
        <pre className={`language-${language}`}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

// Component for visual elements (screenshots, diagrams, architecture figures, Mermaid flowcharts)
interface VisualElementProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  type?: 'screenshot' | 'diagram' | 'architecture' | 'mermaid';
}

export function VisualElement({ src, alt, caption, className, type = 'diagram' }: VisualElementProps) {
  const classes = clsx(
    styles.visualElement,
    styles[type],
    className
  );
  
  return (
    <div className={classes}>
      <img src={src} alt={alt} />
      {caption && <div className={styles.visualCaption}>{caption}</div>}
    </div>
  );
}

// Component for learning outcomes section
interface LearningOutcomesProps {
  outcomes: string[];
  className?: string;
}

export function LearningOutcomes({ outcomes, className }: LearningOutcomesProps) {
  const classes = clsx(
    styles.learningOutcomes,
    className
  );
  
  return (
    <div className={classes}>
      <h3>Learning Outcomes</h3>
      <ul>
        {outcomes.map((outcome, index) => (
          <li key={index}>{outcome}</li>
        ))}
      </ul>
    </div>
  );
}

// Component for hands-on labs
interface HandsOnLabProps {
  title: string;
  description: string;
  steps: string[];
  codeExample?: string;
  className?: string;
}

export function HandsOnLab({ title, description, steps, codeExample, className }: HandsOnLabProps) {
  const classes = clsx(
    styles.handsOnLab,
    className
  );
  
  return (
    <div className={classes}>
      <h3>{title}</h3>
      <p>{description}</p>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      {codeExample && (
        <CodeExample language="python" title="Implementation Example">
          {codeExample}
        </CodeExample>
      )}
    </div>
  );
}