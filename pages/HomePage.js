const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(baseUrl) {
    await this.page.goto(baseUrl);
  }

  async verifyTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(new RegExp(expectedTitle, 'i'));
  }
}

module.exports = { HomePage };
