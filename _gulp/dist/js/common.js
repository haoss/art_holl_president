'use strict';

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  $('.one-carousel').slick({
    mobileFirst: true,
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });

  mobileNav();
  inputFocus();
  scrollAnimation();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };
});

$(window).on('load', function() {
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() {
  var width = $(window).width();
  var btn = $('.header__btn');
  var body = $('body');
  var nav = $('.navigation');

  if (width >= 970) {
    btn.removeClass('is-active');
    nav.removeClass('is-active');
    body.removeClass('is-fixed');
  }
});

function mobileNav() {
  var btn = $('.header__btn');
  var body = $('body');
  var nav = $('.navigation');

  btn.on('click', function(){
    var _this = $(this);
    if (_this.hasClass('is-active')) {
      _this.removeClass('is-active');
      nav.removeClass('is-active');
      body.removeClass('is-fixed');
    } else {
      _this.addClass('is-active');
      nav.addClass('is-active');
      body.addClass('is-fixed');
    }
  });

  $('.navigation li a').on('click', function(){
    $('.navigation li a').removeClass('active');
    btn.removeClass('is-active');
    nav.removeClass('is-active');
    body.removeClass('is-fixed');
    $(this).addClass('active');
  });
}

function inputFocus(){
  var jinput = $(".css-input");

  jinput.each(function(){
    var _this = $(this);
    var val = _this.val();
    var field = _this.parents('.j-field-text');

    if (val.length > 0 && _this.is('input') || val.length > 0 && _this.is('textarea')) {
      field.addClass("active-full");
    } else {
      field.removeClass("active-full");
    }

    // input on focus
    _this.focus(function () {
      field.addClass("active");
    }).blur(function () {
      field.removeClass("active");
    })

    _this.on('change', function () {
      var val = _this.val();

      if (val == '') {
        field.removeClass("active-full");
      } else {
        field.addClass("active-full");
      }
    });
  })
}

function scrollAnimation() {
  var width = $(window).width();
  
  const pages = new Pageable("#pinContainer", {
    pips: true, // display the pips
    animation: 300, // the duration in ms of the scroll animation
    delay: 0, // the delay in ms before the scroll animation starts
    throttle: 50, // the interval in ms that the resize callback is fired
    orientation: "vertical", // or horizontal
    swipeThreshold: 50, // swipe / mouse drag distance (px) before firing the page change event
    freeScroll: false, // allow manual scrolling when dragging instead of automatically moving to next page
    navPrevEl: false, // define an element to use to scroll to the previous page (CSS3 selector string or Element reference)
    navNextEl: false, // define an element to use to scroll to the next page (CSS3 selector string or Element reference)
    infinite: false, // enable infinite scrolling (from 0.4.0)
    events: {
        wheel: true, // enable / disable mousewheel scrolling
        mouse: false, // enable / disable mouse drag scrolling
        touch: false, // enable / disable touch / swipe scrolling
        keydown: true, // enable / disable keyboard navigation
    },
    easing: function(currentTime, startPos, endPos, interval) {
        // the easing function used for the scroll animation
        return -endPos * (currentTime /= interval) * (currentTime - 2) + startPos;
    },
    onInit: function(data) {
      $('.navigation').attr('data-section', data.index + 1);
      $('.navigation li a').removeClass('active');
      $('.navigation li a[href="#page-' + (data.index + 1) + '"]').addClass('active');
      console.log(data.index + 1);
    },
    onUpdate: function(data) {
      
    },    
    onBeforeStart: function(data) {
    },
    onStart: function(data) {
      
    },
    onScroll: function(data) {
      
    },
    onFinish: function(data) {
      $('.navigation').attr('data-section', data.index + 1);
      $('.navigation li a').removeClass('active');
      $('.navigation li a[href="#page-' + (data.index + 1) + '"]').addClass('active');
      console.log(data.index + 1);
    },
  });

  if (width <= 970) {
    pages.destroy();
  } else {
    pages.init();
  }
}