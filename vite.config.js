const { resolve } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('vite');

module.exports = defineConfig({
  root: 'src',
  base: '/table/dist/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
      },
    },
  },
});
