/**
 * Basic plagiarism detection for text originality verification
 * This is a simplified implementation for demonstration purposes
 * A real implementation would use more sophisticated text comparison algorithms
 * and likely connect to external services for comparison
 */

/**
 * Checks if text contains potential plagiarism by comparing against a reference corpus
 * @param text The text to check
 * @param referenceCorpus An array of reference texts to compare against
 * @returns An array of potential plagiarism issues
 */
export function checkPlagiarism(text: string, referenceCorpus: string[]): { 
  isPlagiarized: boolean; 
  matches: { text: string; reference: string; similarity: number }[] 
} {
  const matches = [];
  const sentences = splitIntoSentences(text);
  
  for (const sentence of sentences) {
    // Skip very short sentences as they're more likely to have coincidental matches
    if (sentence.trim().length < 10) continue;
    
    for (const reference of referenceCorpus) {
      const similarity = calculateSimilarity(sentence, reference);
      
      // If similarity is above threshold, flag as potential plagiarism
      if (similarity > 0.8) {  // 80% similarity threshold
        matches.push({
          text: sentence,
          reference,
          similarity
        });
      }
    }
  }
  
  return {
    isPlagiarized: matches.length > 0,
    matches
  };
}

/**
 * Splits text into sentences
 * @param text The text to split
 * @returns Array of sentences
 */
function splitIntoSentences(text: string): string[] {
  // Simple sentence splitting (in practice, you'd use more sophisticated NLP libraries)
  return text.split(/(?<!\w\.\w.)(?<![A-Z][a-z].)\.(?=\s+[A-Z])/).filter(s => s.trim().length > 0);
}

/**
 * Calculates similarity between two strings using a simple algorithm
 * @param str1 First string
 * @param str2 Second string
 * @returns Similarity ratio (0 to 1)
 */
export function calculateSimilarity(str1: string, str2: string): number {
  // Simple similarity algorithm based on common words
  const words1 = str1.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  const words2 = str2.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  let intersection = 0;
  for (const word of set1) {
    if (set2.has(word)) {
      intersection++;
    }
  }
  
  const union = set1.size + set2.size - intersection;
  return union > 0 ? intersection / union : 0;
}

/**
 * Verifies if text is original paraphrasing
 * @param text The text to verify
 * @param sourceText The original source text for comparison
 * @returns Verification result
 */
export function verifyOriginalParaphrasing(text: string, sourceText: string): { 
  isOriginal: boolean; 
  issues: string[] 
} {
  const issues = [];
  
  // Check if text is too similar to source (indicating lack of paraphrasing)
  const similarity = calculateSimilarity(text, sourceText);
  if (similarity > 0.7) {  // 70% similarity threshold for paraphrasing
    issues.push(`Text is ${Math.round(similarity * 100)}% similar to source, suggest more paraphrasing`);
  }
  
  // Additional checks could be implemented here:
  // - Check for proper citation of source material
  // - Analyze sentence structure diversity
  // - Check for use of synonyms and different phrasing
  
  return {
    isOriginal: issues.length === 0,
    issues
  };
}

/**
 * Comprehensive plagiarism check function
 * @param content The content to check
 * @param referenceSources Array of reference sources to compare against
 * @returns Comprehensive check results
 */
export function comprehensivePlagiarismCheck(
  content: string, 
  referenceSources: string[]
): { 
  isOriginal: boolean; 
  issues: string[]; 
  details: { text: string; reference: string; similarity: number }[] 
} {
  const issues = [];
  const details = [];
  
  // Check against reference sources
  const plagiarismResult = checkPlagiarism(content, referenceSources);
  if (plagiarismResult.matches.length > 0) {
    issues.push("Potential plagiarism detected");
    details.push(...plagiarismResult.matches);
  }
  
  return {
    isOriginal: issues.length === 0,
    issues,
    details
  };
}