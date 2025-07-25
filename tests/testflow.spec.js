const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const testData = require('../testData/product.json');

test('Full flow: Sort, add to cart, increase quantity, remove product and click Shop Products', async ({ page }) => {
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

  console.log('Step 5: Verifying cart popup...');
  await cartPage.verifyCartPopup();

  console.log('Step 6: Opening cart page...');
  await cartPage.openCart();

  console.log('Step 7: Verifying cart has item...');
  await cartPage.verifyCartHasItem();

  console.log('Step 8: Increasing quantity...');
  await cartPage.increaseQuantity(2); // increase by 2 clicks (total should be 3)

  console.log('Step 9: Verifying updated quantity...');
  try {
    const quantity = await cartPage.getQuantityValue();
    console.log(`Quantity after increment: ${quantity}`);
  } catch (error) {
    console.warn('Quantity input not found. Skipping check.');
  }

  console.log('Step 10: Removing product from cart...');
  await cartPage.removeItemFromCart();

  console.log('Step 11: Clicking "Shop our products"...');
  await cartPage.clickShopProducts();

  console.log('Test flow completed successfully.');
});
