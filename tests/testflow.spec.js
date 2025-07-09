const { test, expect } = require('@playwright/test');
const testData = require('../testData/products.json');
const { HomePage } = require('../pages/HomePage');

test('Navigate to Headphones category on Tanotis', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigate(testData.baseUrl);
  await homePage.verifyTitle(testData.expectedTitle);

  await homePage.clickCategory(testData.category);       // e.g., "TV & Mobile"
  await homePage.clickSubcategory(testData.subcategory); // e.g., "Headphones"

  await expect(page).toHaveURL(/.*headphones.*/i);
});
