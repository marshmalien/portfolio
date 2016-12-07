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
