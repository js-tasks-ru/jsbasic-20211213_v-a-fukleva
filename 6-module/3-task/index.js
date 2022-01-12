import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides

    this.elem = createElement(`<div class="carousel">
                                      <div class="carousel__arrow carousel__arrow_right">
                                        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                                      </div>
                                      <div class="carousel__arrow carousel__arrow_left">
                                        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
                                      </div>
                                      <div class="carousel__inner"></div>
                                    </div>`);

    this._slidesWrapper = this.elem.querySelector('.carousel__inner');
    this._prevArrow = this.elem.querySelector('.carousel__arrow_left');
    this._nextArrow = this.elem.querySelector('.carousel__arrow_right');

    this._transformPx = 0;
    this._lastSlideTranform = 0;
    this._prevArrow.style.display = 'none';

    this.renderSlides(this.slides);

    this._nextArrow.addEventListener('click', () => this._slideForward());
    this._prevArrow.addEventListener('click', () => this._slideBackward());
  }

  _slideForward() {
    this._setSlideWidth();
    this._getLastSlideTransform(this.slides);

    this._transformPx += this._slideWidth;
    this._slidesWrapper.style.transform = `translateX(-${this._transformPx}px)`;
    const isCarouselOnOver = this._slidesWrapper.style.transform === `translateX(-${this._lastSlideTranform}px)`;

    isCarouselOnOver ? this._nextArrow.style.display = 'none' : null;
    this._prevArrow.style.display = '';
  }

  _slideBackward() {
    this._transformPx -= this._slideWidth;
    this._slidesWrapper.style.transform = `translateX(-${this._transformPx}px)`;
    const isCarouselOnStart = this._slidesWrapper.style.transform === 'translateX(0px)';

    isCarouselOnStart ? this._prevArrow.style.display = 'none' : null;
    this._nextArrow.style.display = '';
  }

  renderSlides(slidesData) {

    slidesData.forEach(slideData => {

      const slide = createElement(`<div class="carousel__slide" data-id="penang-shrimp">
                                          <img src="" class="carousel__img" alt="slide">
                                          <div class="carousel__caption">
                                            <span class="carousel__price"></span>
                                            <div class="carousel__title"></div>
                                            <button type="button" class="carousel__button">
                                              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                                            </button>
                                          </div>
                                        </div>`)

      this.setPrice(slideData.price, slide);
      this.setTitle(slideData.name, slide);
      this.setImg(slideData.image, slide);

      const addButton = slide.querySelector('.carousel__button');
      addButton.addEventListener('click', () => this.onButtonClick(addButton, slideData.id))

      this._slidesWrapper.appendChild(slide);
    })
  }

  onButtonClick(button, slideId){
    const productAddEvent = new CustomEvent("product-add", {
      detail: slideId,
      bubbles: true
    });

    button.dispatchEvent(productAddEvent);
  }

  _setSlideWidth() {
    const slide = this.elem.querySelector('.carousel__slide');
    return this._slideWidth = slide.offsetWidth;
  }

  _getLastSlideTransform(slides) {
    const slidesAmount = slides.length;
    return this._lastSlideTranform = (slidesAmount - 1) * this._slideWidth;
  }

  setPrice(itemPrice, slide) {
    const price = slide.querySelector('.carousel__price');
    return price.textContent = `€${itemPrice.toFixed(2)}`
  }

  setTitle(itemTitle, slide) {
    const title = slide.querySelector('.carousel__title');
    return title.textContent = `${itemTitle}`
  }

  setImg(itemImg, slide) {
    const img = slide.querySelector('.carousel__img');
    const imgSource = `/assets/images/carousel/${itemImg}`
    return img.setAttribute('src', imgSource)
  }

}
