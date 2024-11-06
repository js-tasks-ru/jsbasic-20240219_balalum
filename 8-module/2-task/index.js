import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class='products-grid'>
        <div class='products-grid__inner'></div>
      </div>
    `);

    this.updateFilter({});
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const productsContainer = this.elem.querySelector('.products-grid__inner');
    productsContainer.innerHTML = '';

    const filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) return false;

      if (this.filters.vegeterianOnly && !product.vegeterian) return false;

      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) return false;

      if (this.filters.category && product.category !== this.filters.category) return false;

      return true;
    });

    filteredProducts.forEach(product => {
      const productCard = new ProductCard(product);
      productsContainer.append(productCard.elem);
    });
  }
}
