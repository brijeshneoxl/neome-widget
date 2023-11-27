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
      fileName: (format, entryName) =>
      {
        if(format === "es")
        {
          return `${entryName}.js`;
        }
        else if(format === "cjs")
        {
          return `${entryName}.${format}`;
        }
        else
        {
          return entryName;
        }
      },
      formats: ["es", "cjs"]
    }
  },
  plugins: [dts(), preact()]
});
