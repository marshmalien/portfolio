$(document).ready(function() {

  $('.submit-fail, .submit-success').hide();

  function resizeInput() {
    var input = $(this);
    if (input.val().length === 0) {
      input.attr('size', input.attr('placeholder').length);
    } else {
      input.attr('size', input.val().length + 1);
    }
  }

  function setInputSize() {
    var inputList = document.querySelectorAll('input');
    inputList.forEach(function(input) {
      input.setAttribute('size', input.getAttribute('placeholder').length);
    });
  }

  function autoGrow () {
    var t = $(this)[0];
    console.log('S '+t.scrollHeight);
    console.log('C '+t.clientHeight);

    if ($(this).val().length === 0) {
      t.style.height = '76px';
    } else if (t.scrollHeight > t.clientHeight) {
      t.style.height = t.scrollHeight + "px";
    }
    if (t.scrollHeight >= 150) {
      t.style.height = '150px';
      t.style.overflow = "auto";
    }
  }

  $('input[type="text"], input[type="email"]')
  .keyup(resizeInput).each(setInputSize);

  $('textarea').keydown(autoGrow);

  $('#contact-form').submit(function(event) {
      var subject = $('#subject');
      var name = $('#name');
      var email = $('#email');
      var message = $('#message');

      $('#email').on('input', function() {
        subject.val("Portfolio Contact Form (" + $(this).val() + ")");
      });

      if(name.val() === "" || email.val() === "" || message.val() === "") {
        $('.submit-fail').fadeToggle(400);
        return false;
      }
      else {
        $.ajax({
          method: 'POST',
          url: '//formspree.io/marliana.lara@gmail.com',
          data: $('#contact-form').serialize(),
          datatype: 'json'
        });
        event.preventDefault();
        $(this).get(0).reset();
        $('.submit-success').fadeToggle(400);
        $('textarea')[0].style.height = '76px';
      }
    });

  $('.submit-fail, .submit-success').click(function() {
    $(this).hide();
  });
});
;$(document).ready(function() {
  'use strict';
  $('.egg').hide();

  $('svg').click(function() {
    if($(this).attr("class") === "") {
      $(this).attr("class", "gold");
    } else {
      $(this).attr("class", "");
    }


    $('.nav').toggle();
    $('.egg').toggle();
  });

  // Init controller
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      duration: $('section').height(),
      triggerHook: 0.025,
      reverse: true
    }
  });


  /*
  object to hold href values of links inside our nav with
  the class '.anchor-nav'

  scene_object = {
    '[scene-name]' : {
      '[target-scene-id]' : '[anchor-href-value]'
    }
  }
  */

  var scenes = {
    'intro': {
      'intro': 'intro-anchor'
    },
    'scene2': {
      'portfolio': 'anchor1'
    },
    'scene3': {
      'contact': 'anchor2'
    }
  };

  for(var key in scenes) {
    // skip loop if the property is from prototype
    if (!scenes.hasOwnProperty(key)) continue;

    var obj = scenes[key];

    for (var prop in obj) {
      // skip loop if the property is from prototype
      if(!obj.hasOwnProperty(prop)) continue;

      new ScrollMagic.Scene({ triggerElement: '#' + prop })
          .setClassToggle('#' + obj[prop], 'active')
          .addTo(controller);
    }
  }


  // Change behaviour of controller
  // to animate scroll instead of jump
  controller.scrollTo(function(target) {

    TweenMax.to(window, 0.5, {
      scrollTo : {
        y : target - 130,
        autoKill : true // Allow scroll position to change outside itself
      },
      ease : Cubic.easeInOut
    });

  });


  //  Bind scroll to anchor links using Vanilla JavaScript
  var anchor_nav = document.querySelector('.anchor-nav');

  anchor_nav.addEventListener('click', function(e) {
    var target = e.target,
        id     = target.getAttribute('href');

    if(id !== null) {
      if(id.length > 0) {
        e.preventDefault();
        controller.scrollTo(id);

        if(window.history && window.history.pushState) {
          history.pushState("", document.title, id);
        }
      }
    }
  });

  $('#shortcut').click(function() {
    $('html, body').animate({
    scrollTop: $("#contact").offset().top - 130
    }, 2000);
  })

});
