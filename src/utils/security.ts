// Security utilities to protect the application

// Disable development tools in production
export const disableDevTools = () => {
  if (import.meta.env.PROD) {
    // Disable right click
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // Disable development keys
    document.addEventListener('keydown', (e) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    });

    // Detect if development tools are open
    let devtools = {
      open: false,
      orientation: null as string | null
    };

    const threshold = 160;

    setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          // Redirect or show warning message
          console.clear();
          document.body.innerHTML = `
            <div style="
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 999999;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
              <div style="
                background: rgba(255, 255, 255, 0.95);
                padding: 3rem;
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                backdrop-filter: blur(10px);
                max-width: 500px;
              ">
                <h1 style="
                  color: #1f2937;
                  font-size: 2rem;
                  font-weight: bold;
                  margin-bottom: 1rem;
                ">🔒 Restricted Access</h1>
                <p style="
                  color: #6b7280;
                  font-size: 1.1rem;
                  line-height: 1.6;
                  margin-bottom: 2rem;
                ">
                  This application is protected. Access to development tools is not permitted.
                </p>
                <button onclick="window.location.reload()" style="
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  padding: 12px 24px;
                  border: none;
                  border-radius: 10px;
                  font-weight: bold;
                  cursor: pointer;
                  font-size: 1rem;
                ">
                  Reload Page
                </button>
              </div>
            </div>
          `;
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  }
};

// Obfuscate critical JavaScript code
export const obfuscateCode = () => {
  // Remove references to source files
  if (import.meta.env.PROD) {
    // Clean stack traces
    Error.stackTraceLimit = 0;
    
    // Override console methods
    const noop = () => {};
    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
  }
};

// Protect against debugging
export const antiDebug = () => {
  if (import.meta.env.PROD) {
    // Detect debugger
    let startTime = performance.now();
    debugger;
    let endTime = performance.now();
    
    if (endTime - startTime > 100) {
      // Debugger detected
      window.location.href = 'about:blank';
    }

    // Execute every 1 second
    setTimeout(antiDebug, 1000);
  }
};

// Protect important global variables
export const protectGlobals = () => {
  if (import.meta.env.PROD) {
    // Protect window object
    Object.defineProperty(window, 'console', {
      get() {
        throw new Error('Access denied');
      },
      set() {
        throw new Error('Access denied');
      }
    });
  }
};

// Detect advanced development tools
export const detectDevTools = () => {
  if (import.meta.env.PROD) {
    let element = new Image();
    let devtools = false;
    
    Object.defineProperty(element, 'id', {
      get: function() {
        devtools = true;
        throw new Error('Developer tools detected');
      }
    });
    
    setInterval(() => {
      devtools = false;
      console.log(element);
      if (devtools) {
        window.location.href = 'about:blank';
      }
    }, 1000);
  }
};

// Clean sensitive data from DOM
export const cleanupDOM = () => {
  if (import.meta.env.PROD) {
    // Remove attributes that might reveal information
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      el.removeAttribute('data-testid');
      el.removeAttribute('data-cy');
      el.removeAttribute('data-qa');
    });

    // Remove HTML comments
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_COMMENT,
      null
    );
    
    const comments = [];
    let node;
    while (node = walker.nextNode()) {
      comments.push(node);
    }
    
    comments.forEach(comment => {
      comment.parentNode?.removeChild(comment);
    });
  }
};

// Main function to initialize all protections
export const initializeSecurity = () => {
  if (import.meta.env.PROD) {
    disableDevTools();
    obfuscateCode();
    antiDebug();
    protectGlobals();
    detectDevTools();
    cleanupDOM();
    
    // Warning message in console
    console.log('%c🔒 PROTECTED SYSTEM', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%cThis application is protected against reverse engineering.', 'color: orange; font-size: 14px;');
    console.log('%cUnauthorized access is prohibited.', 'color: red; font-size: 14px;');
  }
};