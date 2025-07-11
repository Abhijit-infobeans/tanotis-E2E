const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async verifyCartPopup() {
    await expect(this.page.locator('#flyout-cart')).toBeVisible();
  }

  async openCart() {
    await this.page.locator('a[href="/cart"]').click();
  }

  async verifyCartHasItem() {
    const cartItems = await this.page.$$('.cart-item-row');
    expect(cartItems.length).toBeGreaterThan(0);
  }
}

module.exports = { CartPage };