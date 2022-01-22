
export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {

    if(product) {

      let productInCart = false;
      let productIndex;

      this.cartItems.forEach((cartItem,index) => {

        if(cartItem.product.id === product.id) {

          cartItem.count += 1;
          productInCart = true;
          productIndex = index;

        }

      })

      if(this.cartItems.length === 0 || !productInCart) {
        this.putProductInCart(product)
        productIndex = this.cartItems.length - 1;
      }

     this.onProductUpdate(this.cartItems[productIndex]);

    }

  }

  putProductInCart(product) {

    const productObj = {
      product,
      count : 1,
    }

    this.cartItems.push(productObj);

  }

  updateProductCount(productId, amount) {


    this.cartItems.forEach((cartItem,index) => {

      if(cartItem.product.id === productId) {
        cartItem.count += amount;
        this.onProductUpdate(this.cartItems[index])
      }

      cartItem.count === 0 ? this.cartItems.splice(index, 1) : null;

    })



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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

