function initCarousel() {

  const nextArrow = document.querySelector('.carousel__arrow_right');
  const prevArrow = document.querySelector('.carousel__arrow_left');
  prevArrow.style.display = 'none';

  const slidesWrap = document.querySelector('.carousel__inner');
  const slide = document.querySelector('.carousel__slide');
  const slideWidth = slide.offsetWidth;

  let transformPx = 0

  nextArrow.addEventListener('click', () => {

    transformPx += slideWidth;
    slidesWrap.style.transform = `translateX(-${transformPx}px)`;

    const lastSlideTransform = getLastSlideTransform(slideWidth);
    const isCarouselOnOver = slidesWrap.style.transform === `translateX(-${lastSlideTransform}px)`;

    isCarouselOnOver ? nextArrow.style.display = 'none' : null;
    prevArrow.style.display = '';

  })

  prevArrow.addEventListener('click', () => {

    transformPx -= slideWidth
    slidesWrap.style.transform = `translateX(-${transformPx}px)`;

    const isCarouselOnStart = slidesWrap.style.transform === 'translateX(0px)';
    isCarouselOnStart ? prevArrow.style.display = 'none' : null;

    nextArrow.style.display = '';
  })

}

function getLastSlideTransform(slideWidth) {

  const slides = document.querySelectorAll('.carousel__slide');
  const slidesAmount =  slides.length;

  return (slidesAmount - 1) * slideWidth
}
