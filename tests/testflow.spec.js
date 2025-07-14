const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const testData = require('../testData/product.json');

test('Full flow: Sort, and add to cart verification on Tanotis', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  console.log('Step 1: Navigating to home page...');
  await homePage.goToHomePage(testData.baseUrl);
  await homePage.verifyTitle(testData.expectedTitle);

  console.log(`Step 2: Navigating to ${testData.category} > ${testData.subcategory}`);
  await homePage.navigateToCategory(testData.category, testData.subcategory);

  for (const sortOption of testData.sortOptions) {
    console.log(`Step 3: Sorting by "${sortOption.label}"`);
    await productPage.sortBy(sortOption.label);
    await productPage.verifySortOrder(sortOption.order);
  }

  console.log('Step 4: Adding product to cart...');
  await productPage.addProductToCart();

  console.log('Step 5: Verifying cart popup and content...');
  await cartPage.verifyCartPopup();
 
  await cartPage.verifyCartHasItem();
});
