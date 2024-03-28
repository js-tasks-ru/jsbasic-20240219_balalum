import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.open();
    this.setTitle();
    this.setBody();
  }

  render() {
    this.modalElem = createElement(`
    <div class="modal">

      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>
    `)

    this.modalElem.addEventListener('click', (event) => {
      if (event.target.closest('.modal__close')) {
        this.close();
      }
    });
  }

  open() {
    document.body.append(this.modalElem);
    document.body.classList.add('is-modal-open');

    this.modalTitle = document.querySelector('.modal__title');
    this.modalBody = document.querySelector('.modal__body');
    this.closeBtn = document.querySelector('.modal__close');

    const closeModal = (event) => {
      if (event.code === 'Escape') {
        this.close();
        document.removeEventListener('keyup', closeModal);
      }
    }

    document.addEventListener('keydown', closeModal);
  }

  setTitle(title = '') {
    this.modalTitle.textContent = title;
  }

  setBody(node) {
    this.modalBody.innerHTML = '';
    this.modalBody.append(node);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.modalElem.remove();
  }
}
