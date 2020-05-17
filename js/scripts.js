(function($) {
  window.onpageshow = function(event) {
    if (event.persisted) {
      window.location.reload();
    }
  };

  $(window).on('load', function() {
    /*
			Preloader
		*/
    const preload = $('.preloader');
    preload.find('.spinner').fadeOut(function() {
      preload.fadeOut();
    });

    /*
			Lines Animations
		*/
    $('.lines').addClass('finish');
    setTimeout(function() {
      $('.lines').addClass('ready');
    }, 2000);

    /*
			Typed Subtitle
		*/
    if ($('.typed-subtitle').length && $('.h-subtitle p').length > 1) {
      $('.typed-subtitle').each(function() {
        $(this).typed({
          stringsElement: $(this).prev('.typing-subtitle'),
          loop: true,
        });
      });
    }

    /*
			Typed Breadcrumbs
		*/
    setTimeout(function() {
      $('.h-subtitles').addClass('ready');
      if ($('.typed-bread').length) {
        $('.typed-bread').typed({
          stringsElement: $('.typing-bread'),
          showCursor: false,
        });
      }
    }, 1000);

    /*
			One Page Nav
		*/
    const url_hash = location.hash;
    const sectionElem = $(url_hash);
    if (url_hash.indexOf('#section-') == 0 && sectionElem.length) {
      $('body, html').animate(
        { scrollTop: $(url_hash).offset().top - 68 },
        400
      );
    }

    /*
			Jarallax
		*/
    if ($('.jarallax').length) {
      $('.jarallax').jarallax();
    }

    /*
			Started Slider
		*/
    if ($('.started-carousel').length) {
      const started_slider = new Swiper('.started-carousel .swiper-container', {
        init: false,
        loop: false,
        spaceBetween: 0,
        effect: 'fade',
        slidesPerView: 1,
        simulateTouch: false,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
          waitForTransition: false,
        },
        navigation: {
          nextEl: '.started .swiper-button-next',
          prevEl: '.started .swiper-button-prev',
        },
      });
      started_slider.on('slideChange', function() {
        const index = started_slider.realIndex;
        const total = started_slider.slides.length;

        $('.started-carousel .swiper-slide').removeClass('first');
        $('.started-carousel .swiper-slide').each(function(i, slide) {
          if (index - 1 >= i) {
            $(slide).addClass('swiper-clip-active');
          } else {
            $(slide).removeClass('swiper-clip-active');
          }
        });
        $('.started-carousel .swiper-slide').each(function(i, slide) {
          $(slide).css({ 'z-index': total - i });
        });
      });
      started_slider.init();
    }

    /*
			Testimonials Slider
		*/
    if ($('.reviews-carousel').length) {
      const rev_slider = new Swiper('.reviews-carousel .swiper-container', {
        loop: true,
        spaceBetween: 70,
        slidesPerView: 2,
        autoplay: {
          delay: 6000,
        },
        navigation: {
          nextEl: '.reviews-carousel .swiper-button-next',
          prevEl: '.reviews-carousel .swiper-button-prev',
        },
        breakpoints: {
          720: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 70,
          },
        },
      });
    }

    /*
			Refresh Scroll
		*/
    function scroll_refresh() {
      $(window).scrollTop($(window).scrollTop() + 1);
    }
    setTimeout(scroll_refresh, 100);
  });

  /*
		Set full height in blocks
	*/
  const width = $(window).width();
  const height = $(window).height();

  /*
		Set Height Started Section
	*/
  $('.section.started').css({ height });
  $('.logged-in .section.started').css({ height: height - 32 });
  if (width < 783) {
    $('.section.started').css({ height });
    $('.logged-in .section.started').css({ height: height - 46 });
  }

  /*
		Grained
	*/
  if (!$('.grained-off').length) {
    const grained_options = {
      animate: true,
      patternWidth: 400,
      patternHeight: 400,
      grainOpacity: 0.15,
      grainDensity: 3,
      grainWidth: 1,
      grainHeight: 1,
    };
    grained('#grained_container', grained_options);
  }

  /*
		Cursor Effects
	*/
  if (width > 1199) {
    $(document).on('mousemove', function(e) {
      const x = e.pageX;
      const y = e.pageY;
      const newposX = x;
      const newposY = y;
      $('.cursor-follower').css(
        'transform',
        `translate3d(${newposX}px,${newposY}px,0px)`
      );
    });
    $('a, .btn-group').on({
      mouseenter(e) {
        cursor_over();
      },
      mouseleave(e) {
        cursor_out();
      },
    });
  }
  function cursor_over() {
    $('.cursor-follower')
      .stop()
      .animate(
        { width: 86, height: 86, opacity: 0.1, margin: '-43px 0 0 -43px' },
        500
      );
  }
  function cursor_out() {
    $('.cursor-follower')
      .stop()
      .animate(
        { width: 26, height: 26, opacity: 0.4, margin: '-13px 0 0 -13px' },
        500
      );
  }

  /*
		Hover Masks
	*/
  $('.hover-masks a').each(function() {
    const mask_val = $(this).html();
    $(this).wrapInner('<span class="mask-lnk"></span>');
    $(this).append(`<span class="mask-lnk mask-lnk-hover">${mask_val}</span>`);
  });

  /*
		Hover Button Effect
	*/
  $('.hover-animated .circle').on({
    mouseenter(e) {
      if ($(this).find('.ink').length === 0) {
        $(this).prepend("<span class='ink'></span>");
      }
      const ink = $(this).find('.ink');
      ink.removeClass('animate');
      if (!ink.height() && !ink.width()) {
        const d = Math.max($(this).outerWidth(), $(this).outerHeight());
        ink.css({
          height: d,
          width: d,
        });
      }
      const x = e.pageX - $(this).offset().left - ink.width() / 2;
      const y = e.pageY - $(this).offset().top - ink.height() / 2;
      ink
        .css({
          top: `${y}px`,
          left: `${x}px`,
        })
        .addClass('ink-animate');
      $('.cursor-follower').addClass('hide');
    },
    mouseleave(e) {
      const ink = $(this).find('.ink');
      const x = e.pageX - $(this).offset().left - ink.width() / 2;
      const y = e.pageY - $(this).offset().top - ink.height() / 2;
      ink
        .css({
          top: `${y}px`,
          left: `${x}px`,
        })
        .removeClass('ink-animate');
      $('.cursor-follower').removeClass('hide');
    },
  });

  /*
		Animation Between Pages
	*/
  $('header .top-menu, .typed-bread, .popup-box .bts, .animate-to-page').on(
    'click',
    'a',
    function() {
      const link = $(this).attr('href');
      if (link.indexOf('#section-') == 0) {
        if (!$('body').hasClass('home')) {
          location.href = `/${link}`;
        }

        $('body, html').animate({ scrollTop: $(link).offset().top - 68 }, 400);
        if ($('header').hasClass('active')) {
          $('.menu-btn').trigger('click');
        }
      } else {
        $('.lines').removeClass('finish');
        $('.lines').removeClass('ready');
        $('.lines').addClass('no-lines');
        setTimeout(function() {
          location.href = `${link}`;
        }, 2500);
      }
      return false;
    }
  );

  /*
		On Scroll
	*/
  $(window).on('scroll', function() {
    /* add/remove background-enabled class */
    if ($(this).scrollTop() >= $('.section.started').height()) {
      $('body').removeClass('background-enabled');
    } else if (!$('header').hasClass('active') && $('.video-bg').length) {
      $('body').addClass('background-enabled');
    }

    /* add/remove header/footer fixed class */
    if ($(this).scrollTop() >= 100 && $('.section').length > 1) {
      $('.header').addClass('fixed');
      $('.footer').addClass('fixed');
      $('.mouse_btn').fadeOut();
    }
    if ($(this).scrollTop() <= 100 && $('.section').length > 1) {
      $('.header').removeClass('fixed');
      $('.footer').removeClass('fixed');
      $('.mouse_btn').fadeIn();
    }
  });

  /*
		Menu on Mobile
	*/
  $('header').on('click', '.menu-btn', function() {
    if ($('header').hasClass('active')) {
      $('header').removeClass('active');
      $('.footer .soc').fadeIn();
      $('body').addClass('loaded');
      if ($('.video-bg').length) {
        $('body').addClass('background-enabled');
      }
    } else {
      $('header').addClass('active');
      $('.footer .soc').hide();
      $('body').removeClass('loaded');
      $('body').removeClass('background-enabled');
    }

    return false;
  });

  /*
		Download CV on Mobile
	*/
  $('.section.about').on('click touchstart', '.btn', function() {
    location.href = $(this).attr('href');
  });

  /*
		Mouse Button Scroll
	*/
  $('.section').on('click', '.mouse_btn', function() {
    $('body, html').animate(
      {
        scrollTop: height - 150,
      },
      800
    );
  });
  if ($('.section').length > 1) {
    $('.mouse_btn').show();
  }

  /*
		Initialize Portfolio
	*/
  const $container = $('.portfolio-items');
  $container.imagesLoaded(function() {
    $container.isotope({
      percentPosition: true,
      itemSelector: '.box-item',
    });

    /*
			Portfolio items parallax
		*/
    if ($('.portfolio-items').length) {
      const s_parallax = document.getElementsByClassName('wp-post-image');
      new simpleParallax(s_parallax, { scale: 1.1 });
    }
  });

  /*
		Filter items on button click
	*/
  $('.filters').on('click', '.btn-group', function() {
    const filterValue = $(this)
      .find('input')
      .val();
    $container.isotope({ filter: filterValue });
    $('.filters .btn-group label').removeClass('glitch-effect');
    $(this)
      .find('label')
      .addClass('glitch-effect');
  });

  /*
		Gallery popup
	*/
  if (
    /\.(?:jpg|jpeg|gif|png)$/i.test($('.gallery-item:first a').attr('href'))
  ) {
    $('.gallery-item a').magnificPopup({
      gallery: {
        enabled: true,
      },
      type: 'image',
      closeBtnInside: false,
      mainClass: 'mfp-fade',
    });
  }

  /*
		Media popup
	*/
  $('.has-popup-media').magnificPopup({
    type: 'inline',
    overflowY: 'auto',
    closeBtnInside: true,
    mainClass: 'mfp-fade',
  });

  /*
		Image popup
	*/
  $('.has-popup-image').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-fade',
    image: {
      verticalFit: true,
    },
  });

  /*
		Video popup
	*/
  $('.has-popup-video').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    iframe: {
      patterns: {
        youtube_short: {
          index: 'youtu.be/',
          id: 'youtu.be/',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1',
        },
      },
    },
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    mainClass: 'mfp-fade',
    callbacks: {
      markupParse(template, values, item) {
        template.find('iframe').attr('allow', 'autoplay');
      },
    },
  });

  /*
		Music popup
	*/
  $('.has-popup-music').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    mainClass: 'mfp-fade',
  });

  /*
		Gallery popup
	*/
  $('.has-popup-gallery').on('click', function() {
    const gallery = $(this).attr('href');

    $(gallery)
      .magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        mainClass: 'mfp-fade',
        removalDelay: 160,
        fixedContentPos: false,
        gallery: {
          enabled: true,
        },
      })
      .magnificPopup('open');

    return false;
  });

  /*
		Background enabled
	*/
  const video_unmuted_length = $('.video-unmuted-bg').length;
  const is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  let isMobile = false; // initiate as false
  // device detection
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    )
  ) {
    isMobile = true;
  }

  if ($('.video-bg').length) {
    $('body').addClass('background-enabled');
    if (!isMobile) {
      if ($('.jarallax-video').length) {
        $('.jarallax-video').each(function() {
          const volume = $(this).data('volume');
          if (!is_safari) {
            $(this).jarallax({
              videoVolume: volume,
            });
          }
          if (is_safari) {
            $(this).jarallax();
          }
        });
      }
    } else {
      $('.video-mobile-bg').each(function() {
        $(this).css(
          'background-image',
          `url(${$(this).data('mobile-preview')})`
        );
      });
    }
  }

  /*
		One Page Menu Nav
	*/
  if ($('.section').length && $('.top-menu li a').length) {
    $(window).on('scroll', function() {
      const scrollPos = $(window).scrollTop();
      $('.top-menu ul li a').each(function() {
        if (
          $(this)
            .attr('href')
            .indexOf('#section-') == 0
        ) {
          const currLink = $(this);
          const refElement = $(currLink.attr('href'));
          if (refElement.length) {
            if (refElement.offset().top <= scrollPos + 70) {
              $('.top-menu ul li').removeClass('current-menu-item');
              currLink.closest('li').addClass('current-menu-item');
            }
          }
          if (scrollPos == 0) {
            $('.top-menu ul li').removeClass('current-menu-item');
          }
        }
      });
    });
  }

  /*
		Iframe margins
	*/
  $('.single-post-text').each(function() {
    $(this)
      .find('iframe')
      .wrap('<div class="embed-container"></div>');
  });

  /*
		Dotted Skills Line
	*/
  function skills() {
    const skills_dotted = $('.skills.dotted .progress');
    const skills_dotted_w = skills_dotted.width();
    if (skills_dotted.length) {
      skills_dotted.append(
        '<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>'
      );
      skills_dotted
        .find('.percentage')
        .append(
          '<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>'
        );
      skills_dotted.find('.percentage .da').css({ width: skills_dotted_w });
    }
  }
  setTimeout(skills, 1000);

  /*
		Circle Skills Line
	*/
  const skills_circles = $('.skills.circles .progress');
  if (skills_circles.length) {
    skills_circles.append(
      '<div class="slice"><div class="bar"></div><div class="fill"></div></div>'
    );
  }

  /*
		Resize
	*/
  $(window).resize(function() {
    /* Set full height in blocks */
    const width = $(window).width();
    const height = $(window).height();

    /* Set full height in started blocks */
    $('.section.started').css({ height });
    if (width < 783) {
      $('.section.started').css({ height });
    }

    /* Dotted skills line on resize */
    const skills_dotted = $('.skills-list.dotted .progress');
    const skills_dotted_w = skills_dotted.width();
    if (skills_dotted.length) {
      skills_dotted.find('.percentage .da').css({ width: skills_dotted_w + 1 });
    }
  });

  /*
		Validate Contact Form
	*/
  $('#cform').validate({
    rules: {
      name: {
        required: true,
      },
      message: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
    },
    success: 'valid',
    submitHandler() {
      $.ajax({
        url: 'mailer/feedback.php',
        type: 'post',
        dataType: 'json',
        data: `name=${$('#cform')
          .find('input[name="name"]')
          .val()}&email=${$('#cform')
          .find('input[name="email"]')
          .val()}&message=${$('#cform')
          .find('textarea[name="message"]')
          .val()}`,
        beforeSend() {},
        complete() {},
        success(data) {
          $('#cform').fadeOut();
          $('.alert-success')
            .delay(1000)
            .fadeIn();
        },
      });
    },
  });

  /*
		Google Maps
	*/
  if ($('#map').length) {
    initMap();
  }
})(jQuery);

/*
	Google Map Options
*/
function initMap() {
  const myLatlng = new google.maps.LatLng(50.563499, 4.4522253); // <- Your latitude and longitude
  const styles = [
    {
      stylers: [
        {
          hue: '#ff1a00',
        },
        {
          invert_lightness: true,
        },
        {
          saturation: -100,
        },
        {
          lightness: 33,
        },
        {
          gamma: 0.5,
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2D333C',
        },
      ],
    },
    {
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];

  const mapOptions = {
    zoom: 8.12,
    center: myLatlng,
    mapTypeControl: false,
    disableDefaultUI: true,
    zoomControl: false,
    scrollwheel: false,
    styles,
  };

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  /* var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'We are here!'
	}); */
}
