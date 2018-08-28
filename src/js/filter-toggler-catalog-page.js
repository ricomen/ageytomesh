var filterToggle = document.querySelector('.catalog__filter-toggler');

filterToggle.addEventListener('click', function(){
  this.classList.toggle('is-active');
})

export default filterToggle
  