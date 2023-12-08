import { defineConfig } from 'vite'
import viteServer from './vite-plugin-server';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteServer()],
})
