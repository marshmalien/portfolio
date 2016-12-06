$(document).ready(function() {
  $('#contact-form').submit(function(event) {
      var subject = $('#subject');
      var name = $('#name');
      var email = $('#email');
      var message = $('#message');

      $('#email').on('input', function() {
        subject.val("Portfolio Contact Form (" + $(this).val() + ")");
      });

      if(name.val() == "" || email.val() == "" || message.val() == "") {
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
      }
    });
  $('.submit-fail, .submit-success').click(function() {
    $(this).hide();
  });
});
