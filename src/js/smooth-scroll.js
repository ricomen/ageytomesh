
function animate({timing, draw, duration}) {
  
  let start = performance.now();
  
  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    
    // calculate the current animation state
    let progress = timing(timeFraction);
    
    draw(progress); // draw it
    
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
    
  });
}

function makeEaseInOut() {
  return function(timeFraction) {
    if (timeFraction < .5)
    return bounce(2 * timeFraction) / 2;
    else
    return (2 - bounce(2 * (1 - timeFraction))) / 2;
  }
}

function bounce(timeFraction) {
  return Math.pow(timeFraction, 2)
}

var easeInOut = makeEaseInOut();



function scrollTo(el) {
  var targetId = el.getAttribute('data-anchor');
  var targetScroll = document.querySelector( '#' + targetId ).getBoundingClientRect().top + window.pageYOffset;
  animate({
    duration: 3000,
    timing: easeInOut,
    draw: function(progress) {
      var diffrence = (targetScroll - window.pageYOffset) * (progress/4);      
      window.scrollTo(0, window.pageYOffset + diffrence)
    }
  })
}

export default function smothScroll() {
  var scrollAnchors = document.querySelectorAll('[data-anchor]');
  for (var i = 0; i < scrollAnchors.length; i++) {
    scrollAnchors[i].addEventListener('click', function(e) {
      e.preventDefault();
      scrollTo(this);
    })
  }
}
