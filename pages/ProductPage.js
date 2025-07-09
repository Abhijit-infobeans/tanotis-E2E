

class ProductPage {
    constructor(page) {
      this.page = page;
    }
  
    async selectSortOption(optionLabel) {
      await this.page.locator('select#sorter').selectOption({ label: optionLabel });
      await this.page.waitForLoadState('networkidle');
    }
}  

module.exports = { ProductPage };