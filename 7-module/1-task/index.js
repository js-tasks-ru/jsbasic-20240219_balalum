import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render();
    this.scrollRibbon();
  }

  render() {
    let ribbonItem = '';
    for (let i = 0; i < this.categories.length; i++) {
      ribbonItem += `
      <a href="#" class="ribbon__item" data-id="${this.categories[i].id}">${this.categories[i].name}</a>
    `}

    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${ribbonItem}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `)

    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
  }

  scrollRibbon() {
    this.elem.addEventListener('click', event => {
      let arrowRight = event.target.closest('.ribbon__arrow_right');
      let arrowLeft = event.target.closest('.ribbon__arrow_left');
      let ribbonItem = event.target.closest('.ribbon__item');

      if (arrowRight) {
        this.ribbonInner.scrollBy(350, 0);
      }

      if (arrowLeft) {
        this.ribbonInner.scrollBy(-350, 0);
      }

      if (ribbonItem) {
        for (let ribbonItemElem of this.ribbonInner.children) {
          if (ribbonItemElem.classList.contains('ribbon__item_active')) {
            ribbonItemElem.classList.remove('ribbon__item_active');
          }
        }

        ribbonItem.classList.add('ribbon__item_active');

        let ribbonEvent = new CustomEvent('ribbon-select', {
          detail: ribbonItem.dataset.id,
          bubbles: true,
        });

        this.elem.dispatchEvent(ribbonEvent);
      }
    })

    this.ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = this.ribbonInner.scrollLeft;
      let scrollWidth = this.ribbonInner.scrollWidth;
      let clientWidth = this.ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      (scrollLeft === 0) ?
        this.arrowLeft.classList.remove('ribbon__arrow_visible') :
        this.arrowLeft.classList.add('ribbon__arrow_visible');

      (scrollRight < 1) ?
        this.arrowRight.classList.remove('ribbon__arrow_visible') :
        this.arrowRight.classList.add('ribbon__arrow_visible');
    })
  }
}
