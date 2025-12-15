/**
 * APA 7th edition citation formatter
 * Formats in-text citations and reference lists according to APA 7th edition standards
 */

interface CitationData {
  type: 'book' | 'journal' | 'web' | 'thesis' | 'conference' | 'report' | 'manual' | 'encyclopedia' | 'dictionary' | 'preprint';
  title: string;
  author: string | string[];
  year: number;
  publisher?: string;
  journal?: string;
  volume?: number;
  issue?: number;
  pages?: string;
  doi?: string;
  url?: string;
  accessed?: string; // For web sources (YYYY-MM-DD)
}

/**
 * Formats an in-text citation according to APA 7th edition
 * @param citation The citation data
 * @param isParenthetical Whether to format as (Author, Year) or Author (Year)
 * @returns Formatted in-text citation
 */
export function formatInTextCitation(citation: CitationData, isParenthetical: boolean = true): string {
  let authorPart: string;
  
  if (typeof citation.author === 'string') {
    authorPart = citation.author;
  } else if (citation.author.length === 1) {
    authorPart = citation.author[0];
  } else if (citation.author.length === 2) {
    authorPart = `${citation.author[0]} & ${citation.author[1]}`;
  } else {
    // For 3+ authors, use first author followed by "et al."
    authorPart = `${citation.author[0]} et al.`;
  }
  
  const yearPart = citation.year > 0 ? citation.year.toString() : 'n.d.';
  
  if (isParenthetical) {
    return `(${authorPart}, ${yearPart})`;
  } else {
    return `${authorPart} (${yearPart})`;
  }
}

/**
 * Formats a reference entry according to APA 7th edition
 * @param citation The citation data
 * @returns Formatted reference entry
 */
export function formatReference(citation: CitationData): string {
  let reference = '';
  
  // Format author(s)
  if (typeof citation.author === 'string') {
    // Convert "Last, First" to "Last, F."
    reference += citation.author.replace(/^(.*?),\s*(.*)$/, (match, last, first) => {
      const initials = first.split(/\s+/).map(name => `${name.charAt(0)}.`).join('');
      return `${last}, ${initials} `;
    });
  } else if (Array.isArray(citation.author)) {
    if (citation.author.length === 1) {
      reference += `${citation.author[0]}. `;
    } else if (citation.author.length <= 20) {
      // For up to 20 authors, list them all
      reference += citation.author.slice(0, -1).join(', ') + 
                  `, & ${citation.author[citation.author.length - 1]}. `;
    } else {
      // For 21+ authors, list first 19, then ellipsis, then last author
      reference += citation.author.slice(0, 19).join(', ') + 
                  ', …, ' + citation.author[citation.author.length - 1] + '. ';
    }
  }
  
  // Add year in parentheses
  reference += `(${citation.year}). `;
  
  // Add title
  reference += `${citation.title}. `;
  
  switch (citation.type) {
    case 'book':
      if (citation.publisher) {
        reference += citation.publisher;
      }
      break;
      
    case 'journal':
      if (citation.journal) {
        reference += citation.journal;
        if (citation.volume) {
          reference += `, ${citation.volume}`;
          if (citation.issue) {
            reference += `(${citation.issue})`;
          }
        }
        if (citation.pages) {
          reference += `, ${citation.pages}`;
        }
      }
      break;
      
    case 'web':
      if (citation.url) {
        reference += citation.url;
        if (citation.accessed) {
          reference += ` [Accessed: ${citation.accessed}]`;
        }
      }
      break;
      
    case 'thesis':
      if (citation.publisher) {
        reference += citation.publisher;
      }
      break;
      
    case 'conference':
      if (citation.journal) {
        reference += citation.journal;
        if (citation.pages) {
          reference += `, ${citation.pages}`;
        }
      }
      break;
      
    case 'report':
      if (citation.publisher) {
        reference += citation.publisher;
      }
      break;
      
    case 'manual':
      if (citation.publisher) {
        reference += citation.publisher;
      }
      break;
      
    case 'encyclopedia':
      if (citation.publisher) {
        reference += citation.publisher;
      }
      break;
      
    case 'dictionary':
      if (citation.publisher) {
        reference += citation.publisher;
      }
      break;
      
    case 'preprint':
      if (citation.publisher) {
        reference += citation.publisher;
      }
      break;
      
    default:
      if (citation.publisher) {
        reference += citation.publisher;
      }
  }
  
  // Add DOI if available
  if (citation.doi) {
    reference += ` https://doi.org/${citation.doi}`;
  }
  
  return reference;
}

/**
 * Parses citation text and returns citation data
 * @param text The citation text to parse
 * @returns Citation data object
 */
export function parseCitation(text: string): CitationData | null {
  // This is a simplified parser - in a real implementation, you might want to use a more sophisticated approach
  // For now, return a placeholder with just the input text as title
  return {
    type: 'book',
    title: text,
    author: 'Unknown Author',
    year: new Date().getFullYear(),
  };
}