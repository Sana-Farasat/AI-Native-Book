/**
 * Source tracking system to ensure minimum 15 high-quality sources 
 * across the book (at least 10 peer-reviewed papers or official NVIDIA/ROS documentation)
 */

interface Source {
  id: string;
  title: string;
  authors: string[];
  year: number;
  url?: string;
  doi?: string;
  type: 'peer-reviewed' | 'official-doc' | 'book' | 'preprint' | 'web';
  publisher?: string;
  isPrimary: boolean; // Whether this is one of the required primary sources
}

interface SourceTrackingResult {
  totalSources: number;
  peerReviewedCount: number;
  officialDocCount: number;
  primarySourcesCount: number;
  isValid: boolean;
  missingSources: number;
  missingPrimarySources: number;
  validationErrors: string[];
}

/**
 * Validates if a source is a peer-reviewed paper
 * @param source The source to validate
 * @returns True if the source is peer-reviewed, false otherwise
 */
export function isPeerReviewed(source: Source): boolean {
  // Check if source is from known peer-reviewed venues
  const peerReviewedPublishers = [
    'IEEE', 'ACM', 'Springer', 'Elsevier', 'Wiley', 'Nature', 
    'Science', 'AAAI', 'IEEE Xplore', 'ACM Digital Library',
    'arXiv', 'Journal', 'Transactions', 'Proceedings'
  ];
  
  if (source.type === 'peer-reviewed') return true;
  
  return peerReviewedPublishers.some(publisher => 
    source.publisher?.includes(publisher) || 
    source.title.toLowerCase().includes(publisher.toLowerCase())
  );
}

/**
 * Validates if a source is official documentation
 * @param source The source to validate
 * @returns True if the source is official documentation, false otherwise
 */
export function isOfficialDocumentation(source: Source): boolean {
  // Check if source is from official docs (NVIDIA, ROS, etc.)
  const officialSources = [
    'nvidia.com', 'developer.nvidia.com', 'docs.nvidia.com',
    'ros.org', 'docs.ros.org', 'index.ros.org',
    'unitree.com', 'robotis.com',
    'isaac-sim.nvidia.com', 'docs.isaac.nvidia.com'
  ];
  
  return officialSources.some(officialUrl => 
    source.url?.includes(officialUrl) ||
    source.publisher?.toLowerCase().includes(officialUrl.replace('.com', ''))
  );
}

/**
 * Tracks sources and validates against requirements
 * @param sources The list of sources to validate
 * @returns Validation results
 */
export function trackSources(sources: Source[]): SourceTrackingResult {
  const result: SourceTrackingResult = {
    totalSources: sources.length,
    peerReviewedCount: 0,
    officialDocCount: 0,
    primarySourcesCount: 0,
    isValid: false,
    missingSources: 0,
    missingPrimarySources: 0,
    validationErrors: []
  };
  
  // Count different types of sources
  for (const source of sources) {
    if (isPeerReviewed(source)) {
      result.peerReviewedCount++;
    }
    
    if (isOfficialDocumentation(source)) {
      result.officialDocCount++;
    }
    
    if (source.isPrimary) {
      result.primarySourcesCount++;
    }
  }
  
  // Validate against requirements
  if (result.totalSources < 15) {
    result.missingSources = 15 - result.totalSources;
    result.validationErrors.push(`Missing ${result.missingSources} sources. Need at least 15 total sources.`);
  }
  
  const primaryCount = result.peerReviewedCount + result.officialDocCount;
  if (primaryCount < 10) {
    result.missingPrimarySources = 10 - primaryCount;
    result.validationErrors.push(`Missing ${result.missingPrimarySources} primary sources. Need at least 10 peer-reviewed papers or official documentation.`);
  }
  
  result.isValid = result.validationErrors.length === 0;
  
  return result;
}

/**
 * Adds a new source to the tracking system
 * @param sources The current list of sources
 * @param newSource The source to add
 * @returns Updated list of sources
 */
export function addSource(sources: Source[], newSource: Omit<Source, 'id'>): Source[] {
  const id = `${newSource.authors[0] || 'Unknown'}_${newSource.year}_${Date.now()}`;
  return [...sources, { ...newSource, id }];
}

/**
 * Generates a report of sources by type
 * @param sources The list of sources to report on
 * @returns Report of sources by type
 */
export function generateSourceReport(sources: Source[]): Record<string, Source[]> {
  const report: Record<string, Source[]> = {
    'peer-reviewed': [],
    'official-doc': [],
    'book': [],
    'preprint': [],
    'web': [],
    'other': []
  };
  
  for (const source of sources) {
    if (source.type in report) {
      report[source.type].push(source);
    } else {
      report['other'].push(source);
    }
  }
  
  return report;
}