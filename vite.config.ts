
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
      "localhost"
    ],
  },
  base: "/interactive-resume-laboratory/", // Base path for GitHub Pages
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
  }
}));
