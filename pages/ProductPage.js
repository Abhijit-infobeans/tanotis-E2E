
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

  /**
   * Adds an item to the cart by index from the product list.
   * @param {number} index
   */
  async addItemToCartByIndex(index = 0) {
    const items = await this.page.$$('.product-item');
    if (items.length > index) {
      const addButton = items[index].locator('button:has-text("Add to Cart")');
      await expect(addButton).toBeVisible({ timeout: 5000 });
      await addButton.click();
    } else {
      throw new Error('No product at specified index');
    }
  }

  /**
   * Verifies display options (e.g., 24, 48, 96 per page) using dropdown button.
   * Uses XPath to click dropdown and test each value.
   */
  async verifyAllDisplayOptions(expectedCounts = [24, 48, 96]) {
    for (const count of expectedCounts) {
      const displayButton = this.page.locator('xpath=/html/body/main/div[2]/div[1]/section/div[1]/div[2]/div/div/div/div/div[1]/div[1]/div/button');
      await expect(displayButton).toBeVisible({ timeout: 5000 });
      await displayButton.click();

      const option = this.page.locator('.value-picker__choice-item', {
        hasText: `${count} per page`,
      });
      await expect(option).toBeVisible({ timeout: 5000 });
      await option.click();

      await this.page.waitForLoadState('networkidle');

      const items = await this.page.$$('.product-item');
      expect(items.length).toBeLessThanOrEqual(count);
    }
  }
}

module.exports = { ProductPage };
