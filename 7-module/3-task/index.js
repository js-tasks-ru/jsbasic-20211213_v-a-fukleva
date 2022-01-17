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
    this._renderSteps();
    this.elem.addEventListener('click', (e) => this.onClick(e));
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
    const activeStep = this.elem.querySelectorAll('.slider__steps span')[this.value];
    const progressValue = this.elem.querySelector('.slider__value');

    activeStep.classList.add('slider__step-active');
    progressValue.textContent = String(this.value);

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    const oneStep = 100 / this._segments;
    const leftPercents = this.value * oneStep;


    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }
}
