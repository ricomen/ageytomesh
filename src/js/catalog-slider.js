import Swiper from 'swiper';

var catalogSlider = new Swiper('.catalog__slider-container', {
  init: false,
  slidesPerView: 4,
  spaceBetween: 30,
  breakpoints: {
    992: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    576: {
      initialSlide: 1,
      slidesPerView: 'auto',
      spaceBetween: 30,
      centeredSlides: true
    }
  },
    navigation: {
    nextEl: '.catalog__slider-next',
    prevEl: '.catalog__slider-prev',
    disabledClass: 'catalog__slider-disabled'
  }
});

catalogSlider.on('init', function() {
  setEvent();
});

catalogSlider.on('resize', function() {
  setEvent();
})

catalogSlider.on('slideChangeTransitionEnd', function() {
  setEvent();
})

function checkWindowWidth() {
  return document.documentElement.clientWidth
}

function setEvent() {
  if(checkWindowWidth() <= 576) {    
    let items = document.querySelectorAll('.catalog__item.swiper-slide');
    
    for( let i = 0; i < items.length; i++) {
      items[i].removeEventListener('click', nextSlide);
      items[i].removeEventListener('click', prevSlide);
    }
    let nextBtn = document.querySelector('.catalog__item.swiper-slide-next');
    let prevBtn = document.querySelector('.catalog__item.swiper-slide-prev');
    prevBtn != null ? prevBtn.addEventListener('click', prevSlide) : '';
    nextBtn != null ? nextBtn.addEventListener('click', nextSlide) : '';
  }
}

function nextSlide(diredtion) {
  catalogSlider.slideNext();
}
function prevSlide(diredtion) {
  catalogSlider.slidePrev();
}

catalogSlider.init();

export default catalogSlider;
