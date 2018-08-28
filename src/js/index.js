'use strict';
import StickyBtns from './animate-btns';
// import smoothScroll from './smooth-scroll';
import './modal';

!function() {
  var stickyBtns = new StickyBtns({
    selector: 'btn-animated',
    indent: 300,
    stopWidth: 992
  });
  // smoothScroll();
}()