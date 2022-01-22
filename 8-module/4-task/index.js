import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {

    if (product) {

      let productInCart = false;
      let productIndex;

      this.cartItems.forEach((cartItem, index) => {

        if (cartItem.product.id === product.id) {

          cartItem.count += 1;
          productInCart = true;
          productIndex = index;

        }

      })

      if (this.cartItems.length === 0 || !productInCart) {
        this.putProductInCart(product)
        productIndex = this.cartItems.length - 1;
      }

      this.onProductUpdate(this.cartItems[productIndex]);

    }

  }

  putProductInCart(product) {

    const productObj = {
      product,
      count: 1,
    }

    this.cartItems.push(productObj);

  }

  updateProductCount(productId, amount) {


    this.cartItems.forEach((cartItem, index) => {

      if (cartItem.product.id === productId) {
        cartItem.count += amount;

        if (cartItem.count === 0) {
          this.cartItems.splice(index, 1);
          this.deleteProduct(productId);
        }

        this.onProductUpdate(this.cartItems[index]);

      }

    })


  }

  deleteProduct(productId) {
    const product = document.querySelector(`[data-product-id="${productId}"]`);
    product.remove();
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalAmount = 0;

    this.cartItems.forEach(cartItem => {
      totalAmount += cartItem.count;
    });

    return totalAmount;
  }

  getTotalPrice() {

    let totalPrice = 0;

    this.cartItems.forEach(cartItem => {
      totalPrice += (cartItem.count * cartItem.product.price);
    });

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {

    this.modal = new Modal();

    this.modal.setTitle('Your order');
    const productsList = this.renderProductsList();
    this.modal.setBody(productsList);
    this.modal.open();

    this.addFormSubmitEventLister();
  }

  addFormSubmitEventLister() {
    const form = document.querySelector('.cart-form');
    form.onsubmit = (event) => this.onSubmit(event);
  }

  renderProductsList() {
    const cartItemsWrap = document.createElement('div');
    const orderForm = this.renderOrderForm();

    this.cartItems.forEach(cartItem => {

      const product = this.renderProduct(cartItem.product, cartItem.count);
      this.changeProductAmountEventListner(product);
      cartItemsWrap.append(product);

    })

    cartItemsWrap.append(orderForm)

    return cartItemsWrap;
  }

  changeProductAmountEventListner(product) {

    const countButtons = product.querySelectorAll('.cart-counter__button');

    countButtons.forEach(countButton => {

      countButton.addEventListener('click', () => this.changeProductAmount(countButton));

    })

  }

  changeProductAmount(countButton) {

    const productCard = countButton.closest('.cart-product');
    const productId = productCard.dataset.productId;

    this.cartItems.forEach(cartItem => {

      if (cartItem.product.id === productId) {

        let amount;
        countButton.classList.contains('cart-counter__button_plus') ? amount = 1 : amount = -1;
        this.updateProductCount(productId, amount)

      }
    })

  }

  onProductUpdate(cartItem) {
    const modalIsOpen = document.body.classList.contains('is-modal-open');

    if (cartItem && modalIsOpen) {
      !this.isEmpty() ? this.updateProductInfo(cartItem) : null;
    }

    if (modalIsOpen) {
      this.isEmpty() ? this.modal.close() : null;
    }


    this.cartIcon.update(this);
  }

  updateProductInfo(cartItem) {
    const productId = cartItem.product.id;

    const modalBody = document.querySelector('.modal__body');
    const productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    const productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    const oneProductPrice = (cartItem.product.price * cartItem.count).toFixed(2);

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${oneProductPrice}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit(event) {
    event.preventDefault();
    const submitButton = document.querySelector('button[type="submit"]');
    const form = document.querySelector('.cart-form');

    submitButton.classList.add('is-loading');

    const request = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    })

    request.then(() => {
      this.modal.setTitle('Success!');

      const modalBody = document.querySelector('.modal__body');
      modalBody.innerHTML = `<div class="modal__body-inner">
                              <p>
                                Order successful! Your order is being cooked :) <br>
                                We’ll notify you about delivery time shortly.<br>
                                <img src="/assets/images/delivery.gif">
                              </p>
                            </div>`
      this.cartItems = [];
    })

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

