import React from 'react';
import clsx from 'clsx';
import styles from './Ros2CodeSnippet.module.css';

// ROS 2 Python code snippet component with syntax highlighting and educational annotations
interface Ros2CodeSnippetProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  annotations?: Array<{line: number; text: string}>;
  className?: string;
}

export function Ros2CodeSnippet({ 
  children, 
  title, 
  description, 
  annotations = [], 
  className 
}: Ros2CodeSnippetProps) {
  const classes = clsx(
    styles.ros2CodeSnippet,
    className
  );

  return (
    <div className={classes}>
      {title && <div className={styles.title}>{title}</div>}
      {description && <div className={styles.description}>{description}</div>}
      
      <div className={styles.codeContainer}>
        <pre className={styles.codeBlock}>
          <code className="language-python">{children}</code>
        </pre>
        
        {annotations.length > 0 && (
          <div className={styles.annotations}>
            {annotations.map((annotation, index) => (
              <div key={index} className={styles.annotation}>
                <div className={styles.annotationLine}>Line {annotation.line}</div>
                <div className={styles.annotationText}>{annotation.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ROS 2 launch file snippet component
interface Ros2LaunchFileProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function Ros2LaunchFile({ 
  children, 
  title, 
  description, 
  className 
}: Ros2LaunchFileProps) {
  const classes = clsx(
    styles.ros2LaunchFile,
    className
  );

  return (
    <div className={classes}>
      {title && <div className={styles.title}>{title}</div>}
      {description && <div className={styles.description}>{description}</div>}
      
      <div className={styles.codeContainer}>
        <pre className={styles.codeBlock}>
          <code className="language-python">{children}</code>
        </pre>
      </div>
    </div>
  );
}