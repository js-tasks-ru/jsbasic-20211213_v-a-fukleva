import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`<div class="products-grid">
                                      <div class="products-grid__inner">
                                      </div>
                                    </div>`);

    this.gridWrap = this.elem.querySelector('.products-grid__inner');
    this.renderProductCards();
  }

  renderProductCards(){

    this.products.forEach(product => {
      const card = new ProductCard(product);
      this.gridWrap.append(card.elem);
    })

  }

  updateFilter(filters){

    this.gridWrap.innerHTML = '';

    const filteredProducts = this.products.filter(product => this.filterProducts(product, filters))

    filteredProducts.forEach(product => {
      const card = new ProductCard(product);
      this.gridWrap.append(card.elem);
    })

  }

  filterProducts(product, filters) {

    if(filters.hasOwnProperty('noNuts')) {
      this.filters.noNuts = filters.noNuts;
    }
    if(filters.hasOwnProperty('vegeterianOnly')) {
      this.filters.vegeterianOnly = filters.vegeterianOnly;
    }
    if(filters.hasOwnProperty('maxSpiciness')) {
      this.filters.maxSpiciness = filters.maxSpiciness;
    }

    const filterSuccess = this.checkFilters(product);
    const categoryMatch = this.categoryFilter(product, filters)

    return filterSuccess && categoryMatch;

  }

  checkFilters(product){

    const activeFilters = {};

    let filterSuccess = true;

    if(this.filters.hasOwnProperty('noNuts')) {
      activeFilters.nuts = product.nuts !== this.filters.noNuts;
    }
    if(this.filters.hasOwnProperty('vegeterianOnly')) {
      activeFilters.vegan = product.vegeterian === this.filters.vegeterianOnly;
    }
    if(this.filters.hasOwnProperty('maxSpiciness')) {
      activeFilters.spicy = product.spiciness <= this.filters.maxSpiciness;
    }

    for(let key in activeFilters) {
      activeFilters[key] ? filterSuccess = true : filterSuccess = false
    }

    return filterSuccess
  }

  categoryFilter(product, filters){

    let filterSuccess = false;

    filters.hasOwnProperty('category') ? this.filters.category = filters.category : null;

    if(this.filters.category === '' || !this.filters.hasOwnProperty('category')) {

      filterSuccess = true;
    }

    product.category === this.filters.category ? filterSuccess = true : false;


    return filterSuccess
  }
}
