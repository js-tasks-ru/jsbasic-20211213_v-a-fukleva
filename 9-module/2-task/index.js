import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();
    this.renderCart();

    await this.renderProductsList();

  }

  renderCarousel() {

    this.carousel = new Carousel(slides);
    const containerElement = document.body.querySelector('.container[data-carousel-holder]');
    containerElement.append(this.carousel.elem);

  }

  renderRibbonMenu() {

    this.ribbonMenu = new RibbonMenu(categories);
    const container = document.querySelector('[data-ribbon-holder]');
    container.append(this.ribbonMenu.elem);

  }

  renderStepSlider() {

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    const container = document.querySelector('[data-slider-holder]');
    container.append(this.stepSlider.elem);

  }

  renderCartIcon() {

    this.cartIcon = new CartIcon();
    const cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);

  }

  renderCart() {

    this.cart = new Cart(this.cartIcon);

  }

  async getProductsList(){

    const request = await fetch('products.json')
    return await request.json();

  }

  async renderProductsList(){

    this.products = await this.getProductsList();
    this.productsGrid = new ProductsGrid(this.products);

    const container = document.querySelector('[data-products-grid-holder]');
    container.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
    });

    this.addEventListeners();

  }

  addEventListeners(){
    document.body.addEventListener('product-add', (e) => this.addProduct(e));
    this.stepSlider.elem.addEventListener('slider-change', (e) => this.updateSpicyFilter(e))
    this.ribbonMenu.elem.addEventListener('ribbon-select', (e) => this.changeCategory(e));

    this.nutsCheckbox = document.querySelector('#nuts-checkbox');
    this.veganCheckbox = document.querySelector('#vegeterian-checkbox');

    this.nutsCheckbox.addEventListener('change', () => {this.changeCheckboxFilter('noNuts', this.nutsCheckbox)});
    this.veganCheckbox.addEventListener('change', () => this.changeCheckboxFilter('vegeterianOnly', this.veganCheckbox));
  }

  changeCheckboxFilter(filterName, elem){
    this.productsGrid.updateFilter({
      [filterName]: elem.checked,
    });
  }

  changeCategory(event){
    const category = event.detail;
    this.productsGrid.updateFilter({
      category: category,
    });
  }

  updateSpicyFilter(event){
    const spicyValue = event.detail;
    this.productsGrid.updateFilter({
      maxSpiciness: spicyValue,
    });
  }

  addProduct(event){
    const productId = event.detail;

    this.products.forEach(product => {
      if(product.id === productId) {
        this.cart.addProduct(product)
      }
    })
  }
}
