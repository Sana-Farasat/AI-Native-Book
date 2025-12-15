/**
 * Environment variable management for the Physical AI & Humanoid Robotics textbook
 * Handles API keys and other environment-specific configurations
 */

// Define the expected environment variables
interface EnvironmentConfig {
  GEMINI_API_KEY?: string;
  NODE_ENV?: string;
  ALGOLIA_APP_ID?: string;
  ALGOLIA_API_KEY?: string;
}

// Default configuration
const DEFAULT_CONFIG: EnvironmentConfig = {
  NODE_ENV: 'development',
};

// Configuration that will be exposed to the client (careful with sensitive data)
const CLIENT_CONFIG = {
  algolia: {
    appId: process.env.ALGOLIA_APP_ID || 'YOUR_ALGOLIA_APP_ID',
    apiKey: process.env.ALGOLIA_API_KEY || 'YOUR_ALGOLIA_API_KEY', 
    indexName: 'physical-ai-humanoid-robotics',
  },
  // Note: Never expose GEMINI_API_KEY to the client; it should only be used server-side
  isServerSide: typeof window === 'undefined',
};

/**
 * Gets the value of an environment variable
 * @param name The name of the environment variable
 * @param defaultValue A default value to return if the variable is not set
 * @returns The value of the environment variable or the default value
 */
export function getEnvVar(name: string, defaultValue?: string): string | undefined {
  // In a Docusaurus environment, we can access environment variables during build time
  // For client-side access, these would need to be defined with the `@theme` prefix
  const value = process.env[name] || defaultValue;
  
  if (name === 'GEMINI_API_KEY' && value) {
    // Log a warning if GEMINI_API_KEY is accessed on the client side
    if (typeof window !== 'undefined') {
      console.warn('GEMINI_API_KEY should not be used client-side for security reasons');
    }
  }
  
  return value;
}

/**
 * Checks if all required environment variables are set
 * @returns An array of missing environment variable names
 */
export function validateEnvironment(): string[] {
  const requiredVars = ['GEMINI_API_KEY'];
  const missingVars: string[] = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  return missingVars;
}

/**
 * Gets the configuration for client-side usage
 * This function strips out sensitive information that shouldn't be exposed to the client
 * @returns Client-safe configuration
 */
export function getClientConfig() {
  return CLIENT_CONFIG;
}

/**
 * Initializes environment configuration
 * This should be called at the start of the application
 */
export function initializeEnvironment(): void {
  // Validate environment variables
  const missingVars = validateEnvironment();
  
  if (missingVars.length > 0) {
    console.warn('Missing required environment variables:', missingVars.join(', '));
    console.info('Please set these variables in your environment or .env file');
  }
}

// Call initializeEnvironment when this module is loaded
initializeEnvironment();

export default {
  getEnvVar,
  validateEnvironment,
  getClientConfig,
  initializeEnvironment,
};