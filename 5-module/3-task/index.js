function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const arrowRightBtn = document.querySelector('.carousel__arrow_right');
  const arrowLeftBtn = document.querySelector('.carousel__arrow_left');
  const slideBar = document.querySelector('.carousel__inner');
  let counter = 0;
  let totalSlides = slideBar.children.length;
  arrowLeftBtn.style.display = 'none';

  carousel.addEventListener('click', event => {
    let slideWidth = slideBar.offsetWidth;
    let arrowRight = event.target.closest('.carousel__arrow_right');
    let arrowLeft = event.target.closest('.carousel__arrow_left');

    if (arrowRight) {
      counter++;
      slideBar.style.transform = `translateX(-${counter * slideWidth}px)`;
    }

    if (arrowLeft) {
      counter--;
      slideBar.style.transform = `translateX(-${counter * slideWidth}px)`;
    }

    if (counter === 0) {
      arrowLeftBtn.style.display = 'none';
      arrowRightBtn.style.display = '';
    } else {
      arrowLeftBtn.style.display = '';
    }

    if (counter === totalSlides - 1) {
      arrowLeftBtn.style.display = '';
      arrowRightBtn.style.display = 'none';
    } else {
      arrowRightBtn.style.display = '';
    }
  })
}
