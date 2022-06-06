const { defineConfig } = require('cypress')

module.exports = defineConfig({
  waitForAnimations: true,
  animationDistanceThreshold: 50,
  env: {
    formNo: 13,
    wpUserName: 'maruf',
    wpPassword: '123',
  },
  viewportWidth: 1366,
  viewportHeight: 786,
  defaultCommandTimeout: 5000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://bitform.mr/wp-admin/admin.php?page=bitform#',
    experimentalSessionAndOrigin: false,
  },
})
