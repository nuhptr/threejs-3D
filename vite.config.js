import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   // add this to load .glb files
   assetsInclude: ["**/*.glb"],
})
