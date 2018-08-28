'use strict';
import './closest-polyfill';

export default function StickyBtns(prop) {
  //выбираем все кнопки с заданным атрибутом
  var btns = document.querySelectorAll('.' + prop.selector);
  
  //Задаем отступ от верха страницы
  this.indent = prop.indent || 100; 
  
  //задаем активность приложения
  this.active = false;

  var stopWidth = prop.stopWidth || 0;  

  // контекст в переменную
 var self = this;
 
  for (var i = 0; i < btns.length; i++) { 
    btns[i].setAttribute('data-indent', getCoords(btns[i]).top - getCoords(btns[i].closest('[data-sticky-btn]')).top); 
  } 
 
  function getCoords(elem) { 
    // (1) 
    var box = elem.getBoundingClientRect(); 
 
    var body = document.body; 
    var docEl = document.documentElement; 
 
    // (2) 
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop; 
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft; 
 
    // (3) 
    var clientTop = docEl.clientTop || body.clientTop || 0; 
    var clientLeft = docEl.clientLeft || body.clientLeft || 0; 
 
    // (4) 
    var top = box.top + scrollTop - clientTop; 
    var left = box.left + scrollLeft - clientLeft; 
 
    return { 
      top: top, 
      left: left 
    }; 
  } 

  //инициализация
  function init() {
    if(!checkResol()) {
      self.active = true;  

      self.scrollLoop();

      self.render();

      //Задаем свойства элементам задействованным в отрисовке
      for (var i = 0; i < btns.length; i++) {
        btns[i].closest('[data-sticky-btn]').style.position = 'relative';
        btns[i].closest('[data-sticky-btn]').style.overflow = 'hidden';
        btns[i].style.position = 'relative';
        btns[i].style.transition = '0.25s linear';
        btns[i].style.right = '0';
        btns[i].style.zIndex = '10';
      }      
    }
  };

  //просчет позиций элементов
  self.render = function() {
    for (var i = 0; i < btns.length; i++) {
      var parentBtnPos = btns[i].closest('[data-sticky-btn]').getBoundingClientRect().top; 
      var indent = btns[i].getAttribute('data-indent'); 
      btns[i].style.top = - parentBtnPos - indent + self.indent + 'px';
    }
  };

  // выключаем
  self.stop = function(){
    self.active = false;
    for (var i = 0; i < btns.length; i++) {
      btns[i].removeAttribute('style');
    }
  };

  // цикл на отрисовку  
  this.scrollLoop = function(e) {    
    if(self.active) {
      self.render();
      requestAnimationFrame(self.scrollLoop);
    };
  }

  //Проверка ширины экрана
  function checkResol() {
    return window.innerWidth <= stopWidth;
  }
  // на каком разрешении сбрасываем
  window.onresize = function() {
    if(checkResol()){
      self.stop();
    } else {
      if(!self.active) init();
    }
  }
  init();
};

