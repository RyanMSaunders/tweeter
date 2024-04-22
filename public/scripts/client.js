/*
 * Client-side JS logic 
 */

$(document).ready(function() {

  // createTweetElement function that creates a formatted HTML article for new tweets submitted.
  const createTweetElement = function(tweet) {
    const encodedUserName = $('<div>').text(tweet.user.name).html();
    const encodedTweetText = $('<div>').text(tweet.content.text).html();
    const encodedUserHandle = $('<div>').text(tweet.user.handle).html();

  let $tweet = `

  <article class="tweet">
    <header>
      <div class="user-identifier">
        <img src="${tweet.user.avatars}" alt="User Icon Image"> 
        <p>${encodedUserName}</p> 
      </div>
      <p>${encodedUserHandle}</p>
    </header>
      <p>
        ${encodedTweetText}
      </p>
      <div id="tweet-divider">
        <hr>
      </div>
    <footer class="tweet-footer">
      <p>${timeago.format(tweet.created_at)}</p>
      <div class="footer-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-arrows-rotate"></i>
        <i class="fa-solid fa-heart"></i>
        </div>
    </footer>
  </article>
  `;
  return $tweet;
  };

 // renderTweets function that prepends tweets to beginning of tweet section
  const renderTweets = function(tweets) {
  
    for (let val of tweets) {
      const $tweet = createTweetElement(val);
      $('.tweet-section').prepend($tweet);
    }

  };

  // loadTweets function that performs ajax request to render tweets
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        console.log('Success: ', tweets);
        $('.tweet-section').empty();
        renderTweets(tweets);
      });
  };

  loadTweets();

  // clearErrorMessage function that slides up the error message when user begins to input in text area
  const clearErrorMessage = function() {
    $('.text-area').on('input', function() {
      $('.error-message').slideUp();
    });
  };

  // Handling submit event by calling loadTweets() and returning counter number to 140.
  // If tweet length is 0, returning error
  // If tweet length is above 140, returning error
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    let $textFromUser = $('#tweet-text').val().trim();
    let $newTweet = $("<div>").text($textFromUser).text();

    let $newTweetLength = $newTweet.length;
    console.log($newTweet);
    console.log($newTweetLength);

    if ($newTweetLength === 0) {
      $(".error-message").addClass("show");
      $('.error-message').html(`<i class="fa-solid fa-triangle-exclamation "></i> Please enter a tweet before submitting. <i class="fa-solid fa-triangle-exclamation"></i> `);
      $('.error-message').hide().slideDown(400, 'swing');
      clearErrorMessage()
      event.preventDefault();

    } else if ($newTweetLength > 140) {
      $(".error-message").addClass("show");
      $('.error-message').html(`<i class="fa-solid fa-triangle-exclamation "></i> Your tweet has exceeded the maximum 140 characters. <i class="fa-solid fa-triangle-exclamation "></i>`);
      $('.error-message').hide().slideDown(400, 'swing');
      clearErrorMessage();
      event.preventDefault();
    } else { 
      let newTweetSerialized = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: newTweetSerialized, 
        success: function(response) {
        console.log("Data sent successfully!");
        $('#tweet-text').val('');
        loadTweets()
        $('.counter').val(140);
        },
        error: function(xhr, status, error) {
        console.error("Error sending data: ", error);
        }
      });
    }
  });

});
