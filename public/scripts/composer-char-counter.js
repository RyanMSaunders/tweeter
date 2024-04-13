
$(document).ready(function() {
  // --- our code goes here ---

  $(".text-area").on( "input", function() {
    const $textarea = $(this).find('textarea');
    const textLength = $textarea.val().length

    // console.log(textLength);

    const remainingTextLength = 140 - textLength;
    // console.log(remainingTextLength);

    const $counter = $(this).siblings('.submit-tweet').find('.counter');
    // console.log($textarea);
    // console.log($counter);
    $counter.html(remainingTextLength)

    if (remainingTextLength < 0) {
      $counter.addClass('counter-negative');
    } else {
      $counter.removeClass('counter-negative')
    }

  });

});