import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tagger from "@dhiwise/component-tagger";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [react(), tagger(), tsconfigPaths()],
  server: {
    port: 4028,
    host: true,
    origin: "http://localhost:4028",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  }
})
