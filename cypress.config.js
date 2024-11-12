const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: true,
      html: true,
      json: true
    },
    setupNodeEvents(on, config) {
      const env = dotenv.config({ path: '.env' }).parsed;

      if (env) {
        Object.keys(env).forEach((key) => {
          config.env[key] = env[key];
        });
      }

      return config;
    },
  },
});
