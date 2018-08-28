import Swiper from 'swiper';

var bookSlider = new Swiper('.book__slider-wrap', {
  slidesPerView: 2,
  spaceBetween: 2,
  slidesPerGroup: 2,
    navigation: {
    nextEl: '.book__slider-next',
    prevEl: '.book__slider-prev',
    disabledClass: 'book__slider-disabled'
  },
  pagination: {
    el: '.swiper-pagination',    
    clickable: true,    
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
  },
  breakpoints: {
    992: {
      slidesPerView: 2,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    },
    576: {      
      spaceBetween: 2
    }
  },

});

export default bookSlider;