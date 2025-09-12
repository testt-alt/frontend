import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Minify and obfuscate code
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific functions
      },
      mangle: {
        // Obfuscate variable and function names
        toplevel: true,
        safari10: true,
      },
      format: {
        comments: false, // Remove comments
      },
    },
    // Configure chunks to obfuscate structure
    rollupOptions: {
      output: {
        // Obfuscate file names
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
        // Split into smaller chunks to obfuscate
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['date-fns', 'lucide-react'],
        },
      },
    },
    // Additional security configurations
    sourcemap: false, // Don't generate source maps in production
    cssCodeSplit: true, // Split CSS to obfuscate
  },
  // Development configuration
  server: {
    // Disable error overlay that might expose code
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
