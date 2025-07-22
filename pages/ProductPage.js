const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
  }

  
  async sortBy(optionLabel) {
    const sortTrigger = this.page.locator('button', { hasText: 'Sort by' });
    await expect(sortTrigger).toBeVisible({ timeout: 10000 });
    await sortTrigger.click();

    const option = this.page.locator('.value-picker__choice-item', {
      hasText: optionLabel,
    });
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();

    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verifies if the product prices are sorted as expected.
   * @param {'asc' | 'desc'} order
   */
  async verifySortOrder(order = 'asc') {
    const prices = await this.page.$$eval('.product-price', priceEls =>
      priceEls.map(el =>
        parseFloat(el.innerText.replace(/[^0-9.]/g, ''))
      )
    );

    const sorted = [...prices].sort((a, b) =>
      order === 'asc' ? a - b : b - a
    );

    expect(prices).toEqual(sorted);
  }

  /**
   * Adds a specific product to cart using exact selector you provided.
   */
  async addProductToCart() {
    const addToCartButton = this.page
      .locator('#product_form_id_7133148512341_collection-template')
      .getByRole('button', { name: 'Add to cart' });

    await expect(addToCartButton).toBeVisible({ timeout: 10000 });
    await addToCartButton.click();
  }
}

module.exports = { ProductPage };