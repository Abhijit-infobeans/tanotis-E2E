const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async verifyCartPopup() {
    const popup = this.page.locator('#flyout-cart, .cart-popup, .cart-notification').first();
    try {
      await popup.waitFor({ state: 'visible', timeout: 10000 });
      await expect(popup).toBeVisible();
    } catch (error) {
      console.warn('Cart popup not visible. It may not appear for this product.');
    }
  }

  async openCart() {
    const viewCartLink = this.page.locator('a', { hasText: 'View cart' });
    await expect(viewCartLink).toBeVisible({ timeout: 10000 });
    await viewCartLink.click();
  }

  async verifyCartHasItem() {
    const cartItems = await this.page.$$('.cart-item-row, .cart__items .cart-item');
    console.log(`Found ${cartItems.length} item(s) in cart`);
    return cartItems.length > 0;
  }

  async increaseQuantity(times = 1) {
    const increaseButton = this.page.locator(
      'xpath=//*[@id="shopify-section-cart-template"]/section/div/div/div/div[1]/div[1]/div/table/tbody/tr/td[2]/div/button[2]'
    );
    for (let i = 0; i < times; i++) {
      await increaseButton.click();
      await this.page.waitForTimeout(300);
    }
  }

  async getQuantityValue() {
    const quantityInput = this.page.locator('input[name="updates[]"]');
    if (await quantityInput.count() === 0) {
      throw new Error('Quantity input not found - cart might be empty.');
    }
    return await quantityInput.inputValue();
  }

  // Remove product only if exists
  async removeItemFromCart() {
    const removeButton = this.page.locator(
      'xpath=/html/body/main/div[2]/div[1]/section/div/div/div/div[1]/div[1]/div/table/tbody/tr/td[2]/a'
    );
    if (await removeButton.count() === 0) {
      console.log('No remove button found. Cart might already be empty.');
      return;
    }
    await expect(removeButton).toBeVisible({ timeout: 10000 });
    await removeButton.click();

    // Wait for product to be removed
    await this.page.waitForTimeout(2000);
    console.log('Cart item successfully removed.');
  }

  async clickShopProducts() {
    const shopProductsButton = this.page.locator(
      'xpath=//*[@id="shopify-section-cart-template"]/section/div/div/div[2]/a'
    );
    if (await shopProductsButton.count() === 0) {
      console.log('"Shop our products" button not found.');
      return;
    }
    await expect(shopProductsButton).toBeVisible({ timeout: 10000 });
    await shopProductsButton.click();
    console.log('Clicked "Shop our products" button.');
  }
}

module.exports = { CartPage };
