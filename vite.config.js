// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // 👈 Add this line

export default defineConfig({
  plugins: [react(), svgr()], // 👈 Include svgr here
});




