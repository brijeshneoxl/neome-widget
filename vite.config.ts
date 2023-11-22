import { defineConfig } from 'vite'
import dts from "vite-plugin-dts";
import preact from '@preact/preset-vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'src/index.tsx'),
      ],
      name: "index",
      fileName: "index"
    },
  },
  plugins: [dts(),preact()],
})


