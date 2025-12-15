/**
 * Accessibility utilities for the Physical AI & Humanoid Robotics textbook
 * Ensures content meets accessibility requirements:
 * - Alt text for images
 * - Proper heading hierarchy
 * - Properly formatted code blocks with syntax highlighting
 */

/**
 * Validates alt text for images in content
 * @param content The content to validate
 * @returns Array of accessibility issues related to alt text
 */
export function validateAltText(content: string): string[] {
  const issues: string[] = [];
  
  // Find all img tags in the content
  const imgRegex = /<img\s+([^>]*?)>/gi;
  let match;
  
  while ((match = imgRegex.exec(content)) !== null) {
    const imgTag = match[0];
    
    // Check if alt attribute is present
    if (!imgTag.toLowerCase().includes('alt=')) {
      issues.push(`Missing alt text in image tag: ${imgTag}`);
      continue;
    }
    
    // Extract alt attribute value
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
    if (altMatch) {
      const altText = altMatch[1];
      
      // Check if alt text is meaningful (not empty or just spaces)
      if (!altText.trim()) {
        issues.push(`Empty alt text in image tag: ${imgTag}`);
      }
      
      // Check if alt text is too generic
      if (['image', 'picture', 'photo', 'graphic', 'img'].includes(altText.toLowerCase().trim())) {
        issues.push(`Generic alt text "${altText}" in image tag: ${imgTag}`);
      }
    }
  }
  
  return issues;
}

/**
 * Validates heading hierarchy in content
 * @param content The content to validate
 * @returns Array of accessibility issues related to heading hierarchy
 */
export function validateHeadingHierarchy(content: string): string[] {
  const issues: string[] = [];
  
  // Find all heading tags in the content
  const headingRegex = /<h([1-6])[^>]*>.*?<\/h\1>/gi;
  const headings = content.match(headingRegex) || [];
  
  let lastLevel = 0;
  
  for (const heading of headings) {
    // Extract heading level
    const levelMatch = heading.match(/<h([1-6])/i);
    if (!levelMatch) continue;
    
    const level = parseInt(levelMatch[1], 10);
    
    // Check if heading levels are not increasing by more than one step
    if (lastLevel !== 0 && level > lastLevel + 1) {
      issues.push(`Heading level jump from H${lastLevel} to H${level} found: ${heading}`);
    }
    
    lastLevel = level;
  }
  
  return issues;
}

/**
 * Validates code syntax highlighting in content
 * @param content The content to validate
 * @returns Array of accessibility issues related to code blocks
 */
export function validateCodeSyntaxHighlighting(content: string): string[] {
  const issues: string[] = [];
  
  // Find all code blocks in the content
  const codeBlockRegex = /(?:```(\w+)?\n([\s\S]*?)```|`([^`]+)`)/g;
  let match;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    // For multiline code blocks
    if (match[2]) {
      const language = match[1] ? match[1].toLowerCase() : null;
      
      if (!language) {
        issues.push(`Code block missing language specification: ${match[0].substring(0, 50)}...`);
      }
    }
    // For inline code
    else if (match[3]) {
      // Inline code doesn't need language specification
    }
  }
  
  return issues;
}

/**
 * Performs comprehensive accessibility validation
 * @param content The content to validate
 * @returns Object containing all accessibility issues
 */
export function validateAccessibility(content: string): { 
  altTextIssues: string[]; 
  headingIssues: string[]; 
  codeIssues: string[]; 
} {
  return {
    altTextIssues: validateAltText(content),
    headingIssues: validateHeadingHierarchy(content),
    codeIssues: validateCodeSyntaxHighlighting(content)
  };
}

/**
 * Applies accessibility improvements to content
 * @param content The content to improve
 * @returns Improved content with better accessibility
 */
export function improveAccessibility(content: string): string {
  // Add empty alt text to images that don't have it (assuming decorative images)
  content = content.replace(/<img(?![^>]*alt=)([^>]*?)>/gi, '<img$1 alt="">');
  
  // The other accessibility improvements would require more complex parsing
  // and are more appropriately handled during content creation/editing
  
  return content;
}