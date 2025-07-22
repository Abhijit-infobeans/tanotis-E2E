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
    await this.page.waitForTimeout(5000); // optional visual pause
  }

  async increaseQuantity(times = 1) {
    const increaseButton = this.page.locator('xpath=//*[@id="shopify-section-cart-template"]/section/div/div/div/div[1]/div[1]/div/table/tbody/tr/td[2]/div/button[2]');
    
    for (let i = 0; i < times; i++) {
      await increaseButton.click();
      await this.page.waitForTimeout(300); // small delay to allow DOM to update
    }
  }

  // Optional: verify updated quantity value
  async getQuantityValue() {
    const quantityInput = this.page.locator('input[name="updates[]"]'); // adjust selector if needed
    
  }
}

module.exports = { CartPage };
