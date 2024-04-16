/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

{/* <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script> */}

// Fake data taken from initial-tweets.json

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

 
$(document).ready(function() {

const createTweetElement = function(tweet) {
let $tweet = `

<article class="tweet">
  <header>
    <div class="user-identifier">
      <img src="${tweet.user.avatars}" alt="User Icon Image"> 
      <p>${tweet.user.name}</p> 
    </div>
    <p>${tweet.user.handle}</p>
  </header>
    <p>
      ${tweet.content.text}
    </p>
    <div id="tweet-divider">
      <hr>
    </div>
  <footer class="tweet-footer">
    <p>${tweet.created_at}</p>
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
    $('.tweet-section').append($tweet);
  }

};


renderTweets(data);

});