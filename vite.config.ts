import { defineConfig } from "vite";
// eslint-disable-next-line @typescript-eslint/no-var-requires

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/variables.scss";
        `,
      },
    },
  },
});
