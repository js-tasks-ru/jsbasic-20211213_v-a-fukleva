import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this._segments = this.steps - 1;
    this.elem = createElement(`<div class="slider">

                                      <div class="slider__thumb">
                                        <span class="slider__value">0</span>
                                      </div>
                                      <div class="slider__progress"></div>
                                      <div class="slider__steps"></div>

                                    </div>`);

    this._stepsWrap = this.elem.querySelector('.slider__steps');
    this.thumb = this.elem.querySelector('.slider__thumb');


    this._renderSteps();
    this._setActiveStepValue();
    this.elem.addEventListener('click', (e) => this.onClick(e));
    this.thumb.addEventListener('pointerdown', () => this.onDragStart());
    this.thumb.ondragstart = () => false;
    this.thumb.onpointerdown = () => false;
    this.thumb.onpointermove = () => false;
  }

  _renderSteps() {

    for (let i = 0; i < this.steps; i++) {

      const step = document.createElement('span');
      i === this.value ? step.classList.add('slider__step-active') : null;
      this._stepsWrap.append(step);

    }
  }

  _resetActiveSteps() {
    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach(step => {
      step.classList.remove('slider__step-active');
    })
  }

  onDragStart() {

    this.elem.classList.add('slider_dragging');

    this._onDrag = (event) => {

      const cursorCoords = event.clientX - this.elem.getBoundingClientRect().left;
      let progress = this.elem.querySelector('.slider__progress');
      let leftRelative = cursorCoords / this.elem.offsetWidth;

      this.value = Math.round(this._segments * leftRelative);
      this._setActiveStep();

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;
      this.thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

    };

    document.body.addEventListener('pointermove', this._onDrag);
    document.body.onpointerup = () => this.onDragOver();

  }

  onDragOver() {

    this.elem.classList.remove('slider_dragging');
    document.body.removeEventListener('pointermove', this._onDrag);
    document.body.onpointerup = null;
    this._setActiveStep();

    const sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(sliderChange);
  }

  onClick(event) {
    this._resetActiveSteps();

    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    this.value = Math.round(this._segments * leftRelative);
    this._setActiveStep();

    const sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(sliderChange);
  }

  _setActiveStep() {
    this._resetActiveSteps();
    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach((step, index) => index === this.value ? step.classList.add('slider__step-active') : null)
    this._setActiveStepValue();
  }

  _setActiveStepValue() {
    const progressValue = this.elem.querySelector('.slider__value');
    const progress = this.elem.querySelector('.slider__progress');

    progressValue.textContent = String(this.value);

    const oneStep = 100 / this._segments;
    const leftPercents = this.value * oneStep;

    this.thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }
}
