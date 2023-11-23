import preact from "@preact/preset-vite";
import {resolve} from "path";
import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(__dirname, "src/index.tsx"),
        resolve(__dirname, "src/cdn.tsx")
      ],
      name: "index",
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ["es"]
    }
  },
  plugins: [dts(), preact()]
});
