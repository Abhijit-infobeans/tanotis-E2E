const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Sorts the product listing by a given label, e.g., "Price, low to high".
   */
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
   * Selects the number of products to display per page.
   * @param {string} optionLabel e.g., "24 per page"
   */
  async selectDisplayOption(optionLabel) {
    const dropdown = this.page.locator('#products-pagesize');
    await expect(dropdown).toBeVisible({ timeout: 5000 });
    await dropdown.selectOption({ label: optionLabel });
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Verifies the number of displayed products does not exceed the expected count.
   * @param {number} expectedCount
   */
  async verifyItemCount(expectedCount) {
    const items = await this.page.$$('.product-item');
    expect(items.length).toBeLessThanOrEqual(expectedCount);
  }

  

  
  }


module.exports = { ProductPage };
