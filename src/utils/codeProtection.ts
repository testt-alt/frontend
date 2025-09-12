// Additional source code protection

// Obfuscate important strings
export const obfuscateString = (str: string): string => {
  if (import.meta.env.PROD) {
    return str.split('').map(char => 
      String.fromCharCode(char.charCodeAt(0) + 1)
    ).join('');
  }
  return str;
};

// Deobfuscate strings
export const deobfuscateString = (str: string): string => {
  if (import.meta.env.PROD) {
    return str.split('').map(char => 
      String.fromCharCode(char.charCodeAt(0) - 1)
    ).join('');
  }
  return str;
};

// Protect critical functions
export const protectFunction = (fn: Function): Function => {
  if (import.meta.env.PROD) {
    return function(...args: any[]) {
      try {
        // Verify we're not in debugging
        let start = performance.now();
        debugger;
        let end = performance.now();
        
        if (end - start > 100) {
          throw new Error('Debugging detected');
        }
        
        return fn.apply(this, args);
      } catch (error) {
        // Fail silently or redirect
        window.location.href = 'about:blank';
        return null;
      }
    };
  }
  return fn;
};

// Create proxy for sensitive objects
export const createSecureProxy = <T extends object>(obj: T): T => {
  if (import.meta.env.PROD) {
    return new Proxy(obj, {
      get(target, prop) {
        // Verificar acceso autorizado
        if (typeof prop === 'string' && prop.startsWith('_')) {
          throw new Error('Access denied to private properties');
        }
        return target[prop as keyof T];
      },
      set(target, prop, value) {
        // Verificar modificaciones autorizadas
        if (typeof prop === 'string' && prop.startsWith('_')) {
          throw new Error('Modification denied for private properties');
        }
        target[prop as keyof T] = value;
        return true;
      }
    });
  }
  return obj;
};

// Verify DOM integrity
export const verifyDOMIntegrity = () => {
  if (import.meta.env.PROD) {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      if (script.src && !script.src.includes(window.location.origin)) {
        // External script detected
        script.remove();
        console.warn('External script removed for security');
      }
    });
  }
};

// Protect against code injection
export const sanitizeInput = (input: string): string => {
  if (import.meta.env.PROD) {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/eval\s*\(/gi, '')
      .replace(/Function\s*\(/gi, '');
  }
  return input;
};

// Initialize all code protections
export const initializeCodeProtection = () => {
  if (import.meta.env.PROD) {
    // Verify DOM integrity every 5 seconds
    setInterval(verifyDOMIntegrity, 5000);
    
    // Protect endpoints
    // protectEndpoints(); // Commented to avoid interfering with normal functionality
    
    // Clean sensitive data on close
    window.addEventListener('beforeunload', clearSensitiveData);
    
    // Protect against DOM modifications
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'SCRIPT' && element.getAttribute('src')) {
                const src = element.getAttribute('src');
                if (src && !src.includes(window.location.origin)) {
                  element.remove();
                }
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
};