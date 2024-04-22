
$(document).ready(function() {
  

  $(".text-area").on("input", function() {
    const $textarea = $(this).find('textarea');
    const textLength = $textarea.val().length;
    const remainingTextLength = 140 - textLength;
    const $counter = $(this).siblings('.submit-tweet').find('.counter');
    $counter.html(remainingTextLength);

    if (remainingTextLength < 0) {
      $counter.addClass('counter-negative');
    } else {
      $counter.removeClass('counter-negative');
    }

  });

});