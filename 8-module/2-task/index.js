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
    } else if(!this.filters.hasOwnProperty('noNuts')){
      this.filters.noNuts = false;
    }

    if(filters.hasOwnProperty('vegeterianOnly')) {
      this.filters.vegeterianOnly = filters.vegeterianOnly;
    } else if(!this.filters.hasOwnProperty('noNuts')){
      this.filters.vegeterianOnly = false;
    }

    if(filters.hasOwnProperty('maxSpiciness')) {
      this.filters.maxSpiciness = filters.maxSpiciness;
    } else if(!this.filters.hasOwnProperty('maxSpiciness')){
      this.filters.maxSpiciness = 4
    }


    const filterSuccess = this.checkFilters(product);
    const categoryMatch = this.categoryFilter(product, filters)

    return filterSuccess && categoryMatch;

  }

  checkFilters(product){

    const activeFilters = {
      spicy : true,
      vegan : true,
      nuts : true,
    };

    if(this.filters.hasOwnProperty('maxSpiciness')) {
      activeFilters.spicy = product.spiciness <= this.filters.maxSpiciness;
    }

    if(this.filters.hasOwnProperty('vegeterianOnly') && this.filters.vegeterianOnly === true) {
      activeFilters.vegan = product.vegeterian === this.filters.vegeterianOnly;
    }

    if(this.filters.hasOwnProperty('noNuts') && this.filters.noNuts === true) {
        activeFilters.nuts = product.nuts !== this.filters.noNuts;
    }

    console.log(this.filters, activeFilters)

    return activeFilters.spicy && activeFilters.vegan && activeFilters.nuts
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
