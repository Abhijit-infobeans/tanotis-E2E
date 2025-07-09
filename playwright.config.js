const config = {
    use: {
      headless: true,
      viewport: { width: 1280, height: 720 },
      baseURL: 'https://www.tanotis.com',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },
    timeout: 30 * 1000,
    testDir: './tests',
    retries: 0,
    reporter: [
      ['list'],
      ['html', { outputFolder: 'playwright-report', open: 'never' }],
      ['allure-playwright'] 
    ],
  };
  
  module.exports = config;
  