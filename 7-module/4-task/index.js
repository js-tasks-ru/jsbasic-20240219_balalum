export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
    this.switchThumb();
    this.dragAndDrop();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'slider';

    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps"></div>`;

    this.sliderSteps = this.elem.querySelector('.slider__steps');

    for (let i = 0; i < this.steps; i++) {
      this.sliderSteps.insertAdjacentHTML('beforeend', `<span></span>`)
    }

    this.sliderSteps.children[this.value].className = 'slider__step-active';

    this.sliderValue = this.elem.querySelector('.slider__value');
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');

    return this.elem;
  }

  switchThumb() {
    this.elem.addEventListener('click', event => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);//значение слайдера
      let valuePercents = value / segments * 100;//значение в процентах для перемещения ползунка и закрашивания заполненной области

      this.sliderValue.textContent = value;

      for (let step of this.sliderSteps.children) {
        if (step.classList.contains('slider__step-active')) {
          step.classList.remove('slider__step-active');
        }
      }

      this.sliderSteps.children[value].className = 'slider__step-active';
      this.thumb.style.left = valuePercents + '%';
      this.progress.style.width = valuePercents + '%';

      let sliderEvent = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true,
      });

      this.elem.dispatchEvent(sliderEvent);
    })
  }

  dragAndDrop() {
    this.thumb.ondragstart = () => false;

    this.thumb.onpointerdown = () => {
      this.elem.classList.add('slider_dragging');

      let onPointerMove = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;
        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments;
        this.value = Math.round(approximateValue);

        this.thumb.style.left = `${leftPercents}%`;
        this.progress.style.width = `${leftPercents}%`;
        this.sliderValue.textContent = this.value;
        return this.value;
      }

      document.addEventListener('pointermove', onPointerMove);

      this.thumb.onpointerup = () => {
        document.removeEventListener('pointermove', onPointerMove);
        this.thumb.onpointerup = null;
        this.elem.classList.remove('slider_dragging');

        let sliderChange = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        });

        this.elem.dispatchEvent(sliderChange);
      }
    }
  }
}
