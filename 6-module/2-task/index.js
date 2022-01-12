import createElement from '../../assets/lib/create-element.js';


export default class ProductCard {

  constructor(product) {

    this.elem = createElement(`
                                <div class="card">
                                  <div class="card__top">
                                      <img src="" class="card__image" alt="product">
                                      <span class="card__price"></span>
                                  </div>
                                  <div class="card__body">
                                      <div class="card__title"></div>
                                      <button type="button" class="card__button">
                                          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                                      </button>
                                  </div>
                                </div>
                            `);

    this.product = product;
    this.setTitle(this.product.name);
    this.setPrice(this.product.price);
    this.setImg(this.product.image);

    this.button = this.elem.querySelector('.card__button');
    this.button.addEventListener('click', () => this.onClick());

  }

  setPrice(productPrice) {
   const price = this.elem.querySelector('.card__price');
   return price.textContent = `€${productPrice.toFixed(2)}`
  }

  setImg(productImg) {
    const img = this.elem.querySelector('.card__image');
    const imgSource = `/assets/images/products/${productImg}`;
    return img.setAttribute('src', imgSource)
  }

  setTitle(productName) {
    const title = this.elem.querySelector('.card__title');
    return title.textContent = productName;
  }

  onClick(){

    const productAddEvent = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true
    });

    this.button.dispatchEvent(productAddEvent);
  }

}
