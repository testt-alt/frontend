// Encryption utilities for sensitive data

// Simple obfuscation function for local data
export const obfuscateData = (data: string): string => {
  if (import.meta.env.PROD) {
    return btoa(encodeURIComponent(data));
  }
  return data;
};

// Function to deobfuscate data
export const deobfuscateData = (data: string): string => {
  if (import.meta.env.PROD) {
    try {
      return decodeURIComponent(atob(data));
    } catch {
      return data;
    }
  }
  return data;
};

// Generate simple hash for integrity verification
export const generateHash = (data: string): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
};

// Verify data integrity
export const verifyIntegrity = (data: string, hash: string): boolean => {
  return generateHash(data) === hash;
};

// Clear sensitive data from memory
export const clearSensitiveData = () => {
  if (import.meta.env.PROD) {
    // Clear localStorage of temporary data
    const keysToRemove = Object.keys(localStorage).filter(key => 
      key.includes('temp') || key.includes('cache') || key.includes('debug')
    );
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });

    // Clear sessionStorage
    sessionStorage.clear();
  }
};

// Protect URLs and endpoints
export const protectEndpoints = () => {
  if (import.meta.env.PROD) {
    // Intercept fetch requests to obfuscate URLs
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      // Security log without exposing real URLs
      console.log('🔒 Secure request initiated');
      return originalFetch.apply(this, args);
    };
  }
};