/**
 * Content verification framework for primary source validation
 * Validates that content cites primary sources only:
 * - Official NVIDIA docs
 * - ROS 2 documentation
 * - IEEE/arXiv papers
 * - Unitree/Robotis GitHub repos
 * - Isaac Sim tutorials
 * - Official textbooks
 */

// Primary source patterns to validate against
const PRIMARY_SOURCE_PATTERNS = [
  // NVIDIA documentation
  /developer\.nvidia\.com\//,
  /docs\.nvidia\.com\//,
  /research\.nvidia\.com\//,
  
  // ROS 2 documentation
  /docs\.ros\.org\//,
  /ros\.wiki\.ubuntu\.com\//,
  /index\.ros\.org\//,
  
  // IEEE and arXiv papers
  /ieeexplore\.ieee\.org\//,
  /arxiv\.org\//,
  /ieee\.org\//,
  
  // Unitree and Robotis GitHub repos
  /github\.com\/unitree(?:-robotics)?/,
  /github\.com\/robotis/,
  
  // Isaac Sim tutorials
  /docs\.isaac\.nvidia\.com\//,
  /isaac-sim\.nvidia\.com\//,
  
  // Academic and official sources
  /\.edu\//,
  /\.ac\./,
  /springer\.com\//,
  /elsevier\.com\//,
  /wiley\.com\//,
  /mitpress\.mit\.edu\//
];

/**
 * Validates if a URL is a primary source
 * @param url The URL to validate
 * @returns True if the URL is a primary source, false otherwise
 */
export function isPrimarySource(url: string): boolean {
  return PRIMARY_SOURCE_PATTERNS.some(pattern => pattern.test(url));
}

/**
 * Validates content for primary source compliance
 * @param content The content to validate
 * @returns An array of validation errors, empty if content is valid
 */
export function validatePrimarySources(content: string): string[] {
  const errors: string[] = [];
  
  // Extract all URLs from the content
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/g;
  const urls = content.match(urlRegex) || [];
  
  for (const url of urls) {
    if (!isPrimarySource(url)) {
      errors.push(`Non-primary source detected: ${url}`);
    }
  }
  
  return errors;
}

/**
 * Validates a content block for citation compliance
 * @param text The text to validate
 * @returns An array of validation errors, empty if content is valid
 */
export function validateCitations(text: string): string[] {
  const errors: string[] = [];
  
  // Check for APA 7th edition in-text citations
  // Pattern: (Author, Year) or Author (Year)
  const citationPattern = /(?:\([A-Z][a-z]+(?:,?\s*[0-9]{4})?\)|[A-Z][a-z]+\s*\([0-9]{4}\))/g;
  const citations = text.match(citationPattern) || [];
  
  if (citations.length === 0) {
    errors.push("No in-text citations detected. Content must include APA 7th edition citations.");
  }
  
  return errors;
}

/**
 * Performs comprehensive content validation
 * @param content The content to validate
 * @returns An array of all validation errors
 */
export function validateContent(content: string): string[] {
  const errors: string[] = [];
  
  // Validate primary sources
  errors.push(...validatePrimarySources(content));
  
  // Validate citations
  errors.push(...validateCitations(content));
  
  return errors;
}