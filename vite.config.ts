
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "bba4458a-e5eb-4cb2-95b6-776d71700dd8.lovableproject.com",
      "bf9a9495-a596-4fc7-84be-11f183d3066c.lovableproject.com",
      "31cbc9b0-f109-404e-9ac7-2395879f615f.lovableproject.com",
      "localhost"
    ],
  },
  // Set the base path for GitHub Pages deployment
  base: mode === 'production' ? '/interactive-resume-laboratory/' : '/',
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Set target to a compatible environment
      target: 'es2020',
    }
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 0, // Ensures all assets are properly handled as external files
  }
}));
