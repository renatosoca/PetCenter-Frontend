import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

enum Mode {
  development = "development",
  production = "production",
}

const createAssetsFiles = (chunkInfo: { name?: string }): string => {
  const allowedExtension = /woff|woff2|png|jpe?g|svg|gif|ico/i;
  const extension = chunkInfo?.name?.split(".").pop() || "";
  const outputDir = allowedExtension.test(extension) ? "media" : extension;

  return `static/${outputDir}/[name]-[hash][extname]`;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envs = loadEnv(mode, process.cwd());

  const { VITE_APP_BASENAME, VITE_APP_DEV_SERVER_PORT } = envs;

  return {
    base: VITE_APP_BASENAME,
    server: {
      host: mode === Mode.development,
      port: Number(VITE_APP_DEV_SERVER_PORT),
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "build",
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "react-dom": ["react-dom"],
            "react-router-dom": ["react-router-dom"],
          },

          assetFileNames: createAssetsFiles,
          chunkFileNames: "static/js/[name]-[hash].chunk.js",
          entryFileNames: "static/js/[name]-[hash].js",
        },
        input: {
          main: path.resolve(__dirname, "index.html"),
          //environment: path.resolve(__dirname, 'src', 'environments.ts'),
        },
      },
    },
  };
});
