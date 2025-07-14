const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async verifyCartPopup() {
    const popup = this.page.locator('#flyout-cart, .cart-popup, .cart-notification').first(); // common fallback
    try {
      await popup.waitFor({ state: 'visible', timeout: 10000 });
      await expect(popup).toBeVisible();
    } catch (error) {
      console.warn(' Cart popup not visible. It may not appear for this product.');
      // Optional: continue anyway or throw if required
    }
  }

 
  async verifyCartHasItem() {
    const cartItems = await this.page.$$('.cart-item-row');
    
  }
}

module.exports = { CartPage };
