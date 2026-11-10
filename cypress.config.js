const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:4174/sample-vue-shop/',
    supportFile: false,
  },
  viewportWidth: 1280,
  viewportHeight: 900,
  video: false,
  screenshotOnRunFailure: false,
});
