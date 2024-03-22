import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.render();
    this.addEventListener();
  }

  render() {
    let slidesHTML= '';
    slidesHTML += this.slides
      .map(({ name, price, image, id }) => `
        <div class="carousel__slide" data-id="${id}">
          <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${price.toFixed(2)}</span>
            <div class="carousel__title">${name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `)
      .join('');

    this.elem = createElement(`
      <div class="carousel">

        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${slidesHTML}
        </div>
      </div >
    `);

    this.arrowRightBtn = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeftBtn = this.elem.querySelector('.carousel__arrow_left');
    this.slideBar = this.elem.querySelector('.carousel__inner');
  }

  addEventListener() {
    let counter = 0;
    this.arrowLeftBtn.style.display = 'none';

    this.elem.addEventListener('click', event => {
      let slideWidth = this.slideBar.offsetWidth;
      let arrowRight = event.target.closest('.carousel__arrow_right');
      let arrowLeft = event.target.closest('.carousel__arrow_left');
      let addBtn = event.target.closest('.carousel__button');
      let currentSlide = event.target.closest('.carousel__slide');

      if (arrowRight) {
        counter++;
        this.slideBar.style.transform = `translateX(-${counter * slideWidth}px)`;
      }

      if (arrowLeft) {
        counter--;
        this.slideBar.style.transform = `translateX(-${counter * slideWidth}px)`;
      }

      if (counter === 0) {
        this.arrowLeftBtn.style.display = 'none';
        this.arrowRightBtn.style.display = '';
      } else {
        this.arrowLeftBtn.style.display = '';
      }

      if (counter === this.slides.length - 1) {
        this.arrowLeftBtn.style.display = '';
        this.arrowRightBtn.style.display = 'none';
      } else {
        this.arrowRightBtn.style.display = '';
      }

      if (addBtn) {
        let cartEvent = new CustomEvent('product-add', {
          detail: currentSlide.dataset.id,
          bubbles: true,
        });
        this.elem.dispatchEvent(cartEvent);
      }
    })
  }
}
