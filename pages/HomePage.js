const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to the base URL
  async navigate(baseUrl) {
    await this.page.goto(baseUrl);
  }

  // Verify the page title
  async verifyTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(new RegExp(expectedTitle, 'i'));
  }

  // Click on top-level category like "TV & Mobile"
  async clickCategory(category) {
    const categoryLink = this.page.getByRole('link', { name: category, exact: true });
    await categoryLink.waitFor({ state: 'visible', timeout: 5000 });
    await categoryLink.click();
  }

  // Click on a subcategory like "Headphones"
  async clickSubcategory(subcategory) {
    const subcategoryLink = this.page.getByRole('link', { name: subcategory, exact: true });
    await subcategoryLink.waitFor({ state: 'visible', timeout: 5000 });
    await subcategoryLink.click();
  }
}

module.exports = { HomePage };

