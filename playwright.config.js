// playwright.config.js


module.exports = {
    timeout: 60000,
    use: {
      headless: false,
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },
    retries: 0,
  };
  