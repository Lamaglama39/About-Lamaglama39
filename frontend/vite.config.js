import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    // Github Pagesデプロイ用設定
    base: "/About-Lamaglama39",
    plugins: [react()],
    build: {
      rollupOptions: {
        plugins: [visualizer()],
      },
    },
  };
});
