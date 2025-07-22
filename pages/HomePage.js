const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async goToHomePage(url) 
  {
    await this.page.goto(url);
  }

  async verifyTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(new RegExp(expectedTitle, 'i'));
  }

  async navigateToCategory(category, subcategory) {
    // Open category menu
    await this.page.getByRole('link', { name: category }).click();

    // Wait and click subcategory
    await this.page.getByRole('link', { name: subcategory }).click();

    // Optional: wait for the product grid to load
    await this.page.waitForSelector('.product-list');
  }
}

module.exports = { HomePage };