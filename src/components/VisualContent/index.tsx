import React from 'react';
import clsx from 'clsx';
import styles from './VisualContent.module.css';

// Component for displaying various types of visual content
// including screenshots, diagrams, architecture figures, and Mermaid flowcharts
interface VisualContentProps {
  type: 'screenshot' | 'diagram' | 'architecture' | 'mermaid' | 'graph' | 'photo';
  src?: string;
  alt: string;
  caption?: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export function VisualContent({ 
  type, 
  src, 
  alt, 
  caption, 
  title, 
  className,
  children
}: VisualContentProps) {
  const classes = clsx(
    styles.visualContent,
    styles[type],
    className
  );

  return (
    <div className={classes}>
      {title && <h4 className={styles.title}>{title}</h4>}
      
      <div className={styles.content}>
        {src ? (
          <img src={src} alt={alt} className={styles.image} />
        ) : (
          <div className={styles.mermaidContainer}>
            {children}
          </div>
        )}
      </div>
      
      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  );
}

// Specialized component for Mermaid diagrams
interface MermaidDiagramProps {
  chartDefinition: string;
  caption?: string;
  title?: string;
  className?: string;
}

export function MermaidDiagram({ 
  chartDefinition, 
  caption, 
  title, 
  className 
}: MermaidDiagramProps) {
  // In a real implementation, we would use the mermaid library to render the diagram
  // For now, we'll just display the chart definition as a code block
  
  return (
    <div className={clsx(styles.mermaidDiagram, className)}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <pre className={styles.mermaidCode}>
        <code>{chartDefinition}</code>
      </pre>
      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  );
}

// Gallery component for multiple related visual elements
interface VisualGalleryProps {
  title?: string;
  items: Array<{
    type: 'screenshot' | 'diagram' | 'architecture' | 'mermaid' | 'graph' | 'photo';
    src?: string;
    alt: string;
    caption?: string;
  }>;
  className?: string;
}

export function VisualGallery({ title, items, className }: VisualGalleryProps) {
  const classes = clsx(
    styles.visualGallery,
    className
  );

  return (
    <div className={classes}>
      {title && <h3 className={styles.galleryTitle}>{title}</h3>}
      <div className={styles.galleryGrid}>
        {items.map((item, index) => (
          <VisualContent
            key={index}
            type={item.type}
            src={item.src}
            alt={item.alt}
            caption={item.caption}
          />
        ))}
      </div>
    </div>
  );
}