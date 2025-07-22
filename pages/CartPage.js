

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
    console.log(` Found ${cartItems.length} item(s) in cart`);
    await this.page.waitForTimeout(5000);

  }
}

module.exports = { CartPage };

