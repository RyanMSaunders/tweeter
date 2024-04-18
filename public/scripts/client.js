/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

{/* <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script> */}

// Fake data taken from initial-tweets.json

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

 
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
    .then(function (tweets) {
      // const tweetsParsed = JSON.parse(tweets)
      console.log('Success: ', tweets);
      $('.tweet-section').empty()
      renderTweets(tweets)
    });
}

console.log(loadTweets());


// renderTweets(data);

$(".tweet-form").submit(function(event) {
  event.preventDefault();
  let $textFromUser = $('#tweet-text').val().trim();
  let $newTweet = $("<div>").text($textFromUser).text();

  let $newTweetLength = $newTweet.length;
  console.log($newTweet);
  console.log($newTweetLength);

  if ($newTweetLength === 0) {
    // alert('Please enter a tweet before submitting.');
    $( ".error-message" ).addClass( "show" );
    $('.error-message').html(`<i class="fa-solid fa-triangle-exclamation "></i> Please enter a tweet before submitting. <i class="fa-solid fa-triangle-exclamation"></i> `);
    $('.error-message').hide().slideDown(400, 'swing');
    event.preventDefault();

  } else if ($newTweetLength > 140) {
    // alert('Your tweet has exceeded the maximum 140 characters.');
    $( ".error-message" ).addClass( "show" );
    $('.error-message').html(`<i class="fa-solid fa-triangle-exclamation "></i> Your tweet has exceeded the maximum 140 characters. <i class="fa-solid fa-triangle-exclamation "></i>`);
    $('.error-message').hide().slideDown(400, 'swing');
    event.preventDefault();
  } else {
    let newTweetSerialized = $( this ).serialize()
    console.log('Test', newTweetSerialized)
    $.ajax({
      type: "POST", // Specifies the method type
      url: "/tweets", // The endpoint where the data should be submitted
      data: newTweetSerialized, // Your serialized form data variable
      success: function(response) {
      // Code to execute if the request is successful
      console.log("Data sent successfully!");
      $('#tweet-text').val('')
      loadTweets()
      // $('.tweet-section').prepend(renderTweets());
      },
      error: function(xhr, status, error) {
      // Code to execute if the request fails
      console.error("Error sending data: ", error);
      }
    });
  }
})




});


// $( ".tweet-form" ).on( "submit", function( event ) {
//   console.log('Form submitted, performing ajax call...');
//   $.post('index.html', function (data));
//   event.preventDefault();
// });

// });

// const $button = $('#load-more-posts');
//   $button.on('click', function () {
//     console.log('Button clicked, performing ajax call...');
//     $.ajax('more-posts.html', { method: 'GET' })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });
//   });