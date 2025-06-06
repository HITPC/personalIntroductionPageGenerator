import { defineConfig } from 'vite'
import { resolve } from "path";
import fs from 'fs';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
})
