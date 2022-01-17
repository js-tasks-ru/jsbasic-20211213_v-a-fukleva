import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`<div class="modal">
                                      <div class="modal__overlay"></div>

                                      <div class="modal__inner">
                                        <div class="modal__header">
                                          <button type="button" class="modal__close">
                                            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                                          </button>
                                          <h3 class="modal__title"></h3>
                                        </div>
                                        <div class="modal__body"></div>
                                      </div>

                                    </div>`);

    this._title = this.elem.querySelector('.modal__title');
    this._body = this.elem.querySelector('.modal__body');

    this._closeBtn = this.elem.querySelector('.modal__close');
    this._closeBtn.addEventListener('click', () => this.close());
  }

  setTitle(string) {
    return this._title.textContent = string;
  }

  setBody(elemHTML) {
    return this._body.append(elemHTML);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    this._closeOnEscapePress = (event) => {
      return event.code === 'Escape' ? this.close() : null
    }

    document.body.addEventListener('keydown', this._closeOnEscapePress);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
    document.body.removeEventListener('keydown', this._closeOnEscapePress)
  }

}
