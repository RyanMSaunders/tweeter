/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 
$(document).ready(function() {

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


  const renderTweets = function(tweets) {
  
    for (let val of tweets) {
      const $tweet = createTweetElement(val);
      $('.tweet-section').prepend($tweet);
    }

  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        console.log('Success: ', tweets);
        $('.tweet-section').empty();
        renderTweets(tweets);
      });
  };

  console.log(loadTweets());

  const clearErrorMessage = function() {
    $('.text-area').on('input', function() {
      $('.error-message').slideUp();
    });
  };


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
      console.log('Test', newTweetSerialized);
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: newTweetSerialized, 
        success: function(response) {
        console.log("Data sent successfully!");
        $('#tweet-text').val('');
        loadTweets()
        },
        error: function(xhr, status, error) {
        console.error("Error sending data: ", error);
        }
      });
    }
  });

});
