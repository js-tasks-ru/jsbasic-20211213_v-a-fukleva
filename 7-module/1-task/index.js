import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(`<div class="ribbon">
                                      <button class="ribbon__arrow ribbon__arrow_left">
                                        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                                      </button>

                                      <nav class="ribbon__inner"></nav>

                                      <button class="ribbon__arrow ribbon__arrow_right">
                                        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                                      </button>
                                    </div>`);

    this._ribbonWrap = this.elem.querySelector('.ribbon__inner');
    this.renderRibbonItems(this.categories);
    this._ribbonWrap.addEventListener('scroll', () => this.hideArrowsOnRibbonEnd());

    this.arrowNext = this.elem.querySelector('.ribbon__arrow_right');
    this.arrowPrev = this.elem.querySelector('.ribbon__arrow_left');
    this.arrowNext.classList.add('ribbon__arrow_visible');

    this.arrowNext.addEventListener('click', () => this.scrollLeft());
    this.arrowPrev.addEventListener('click', () => this.scrollRight());

  }

  renderRibbonItems(categories){

    categories.forEach((category, index) => {
      const ribbonItem = createElement(`<a href="#"
                                                class="ribbon__item"
                                                data-id="${category.id}">${category.name}</a>`)
      index === 0 ? ribbonItem.classList.add('ribbon__item_active') : null;

      ribbonItem.addEventListener('click', (e) => {
        e.preventDefault();
        this.onItemClick(ribbonItem, category.id)
      })

      this._ribbonWrap.append(ribbonItem)
    })
  }

  scrollLeft(){
    this._ribbonWrap.scrollBy(350, 0);
    this.arrowPrev.classList.add('ribbon__arrow_visible');
  }
  scrollRight(){
    this._ribbonWrap.scrollBy(-350, 0);
    this.arrowNext.classList.add('ribbon__arrow_visible');
  }
  hideArrowsOnRibbonEnd(){
    if(this._ribbonWrap.scrollLeft === 0) {
      this.arrowPrev.classList.remove('ribbon__arrow_visible');
    }

    const scrollWidth = this._ribbonWrap.scrollWidth;
    const scrollLeft = this._ribbonWrap.scrollLeft;
    const clientWidth = this._ribbonWrap.clientWidth;

    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if(scrollRight < 1) {
      this.arrowNext.classList.remove('ribbon__arrow_visible');
    }
  }

  onItemClick(item, id) {
    this.resetCategories();
    this.setActiveCategory(item);

    const ribbonSelect = new CustomEvent('ribbon-select', {
      detail: id,
      bubbles: true
    })
    item.dispatchEvent(ribbonSelect)
  }

  resetCategories(){
    const categories = this.elem.querySelectorAll('.ribbon__item');
    return categories.forEach(item => item.classList.remove('ribbon__item_active'));
  }

  setActiveCategory(item){
    return item.classList.add('ribbon__item_active');
  }
}
