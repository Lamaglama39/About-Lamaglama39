import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from 'fs-extra';
import path from 'path';

// ビルド前にDracoファイルをコピーする処理
const copyDracoFiles = () => {
  return {
    name: 'copy-draco-files',
    buildStart() {
      const srcDir = path.resolve(__dirname, 'node_modules/three/examples/jsm/libs/draco');
      const destDir = path.resolve(__dirname, 'public/draco');
      
      if (fs.existsSync(srcDir)) {
        fs.ensureDirSync(destDir);
        fs.copySync(srcDir, destDir, { overwrite: true });
        console.log('Dracoファイルを public/draco にコピーしました');
      } else {
        console.warn('Dracoファイルのソースディレクトリが見つかりません:', srcDir);
      }
    }
  };
};

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    copyDracoFiles()
  ],
});
