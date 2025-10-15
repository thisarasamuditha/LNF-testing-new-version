import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  server: {
    // Bind to IPv4 localhost and a non-conflicting port to avoid EACCES on ::1:5173
    host: "127.0.0.1",
    port: 3000,
    strictPort: false,
    hmr: {
      protocol: "ws",
      host: "127.0.0.1",
      port: 3000,
    },
    fs: {
      allow: ["./client", "./shared"],
      deny: ["*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));
