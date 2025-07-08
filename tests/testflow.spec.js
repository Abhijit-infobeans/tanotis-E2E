

const { test, expect } = require('@playwright/test');
const testData = require('../testData/products.json');



test('Verify title for the  Tanotis website', async ({ page }) => {

  await page.goto(testData.baseUrl);
  await expect(page).toHaveTitle(new RegExp(testData.expectedTitle, 'i'));
  
});
