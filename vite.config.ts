import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
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
}));

<!-- Update 2024-11-25T13:35:17+05:30 -->
<!-- Update 2024-12-28T15:59:24+05:30 -->
<!-- Update 2025-03-14T13:17:36+05:30 -->
<!-- Update 2025-05-20T13:53:54+05:30 -->
<!-- Update 2025-07-15T05:38:05+05:30 -->
<!-- Update 2025-10-04T07:51:24+05:30 -->
<!-- Update 2025-01-08T12:10:44+05:30 -->
<!-- Update 2025-02-09T10:22:04+05:30 -->
<!-- Update 2025-04-02T18:05:35+05:30 -->
<!-- Update 2025-06-26T11:30:13+05:30 -->
<!-- Update 2025-07-26T16:48:30+05:30 -->
<!-- Update 2025-07-26T18:38:30+05:30 -->
<!-- Update 2025-08-04T14:34:36+05:30 -->