import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@', replacement: '/src' },
      { find: '~slick-carousel', replacement: '/node_modules/slick-carousel' }, // 추가
    ],
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false, // inport swiper 오류 방지
      },
    },
  },
});
