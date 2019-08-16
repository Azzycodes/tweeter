/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  let time;
  let today = new Date();
  let postAge = (Math.floor(today - tweet.created_at) / 1000 / 60 / 60 / 24);

  if (postAge > 365 && postAge % 365 !== 0) {
    time = (postAge / 365).toFixed(0) + "years" + (postAge % 365).toFixed(0) + " days ago";
  } else if (postAge > 365 && postAge % 365 === 0) {
    time = (postAge / 365).toFixed(0) + " years ago";
  } else {
    time = (postAge).toFixed(0) + " days ago";
  }

  //template for container
  let $tweet = `
  <article class="tweets">
  <header>
  <img src=${tweet.user.avatars}>
  <h4 class="user">${tweet.user.name}</h4>
  <h4 class="handle">${tweet.user.handle}</h4>
  </header>
  
  <section class="tweet-text">
  <p>${escape(tweet.content.text)}</p>   </section>
  
  <footer>
  <hr>
  <time>${time}</time>
  <div class="action-buttons">
  <i class="far fa-flag"></i>
  <i class="far fa-retweet"></i>
  <i class="far fa-heart"></i> 
  </div>
  </footer>
  </article> `;

  return $tweet;
};


//Creates tweets to designated container
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $(".container-of-posts").prepend(createTweetElement(tweet));
  }
};

 
$(document).ready(function() {
  $("#create-tweet").submit(function(event) {
    event.preventDefault();
    //error alerts for not meeting character requirments
    if (($("textarea").val()).length === 0) {
      $(".error-msg-span").text("<p>Need some text to fire this tweet!</p>");
      $(".error-msg").slideDown();
    } else if (($("textarea").val()).length > 140) {
      $(".error-msg-span").text("<p>Too long of a tweet!</p>");
      $(".error-msg").slideDown();
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize()
      })
        .then(function(data) {
          $(".error-msg").slideUp();
          $("textarea").val("");
          $(".counter").text(140);
          loadtweets(renderTweets);
        });
    }
    
  });
});

const loadtweets = function(cb) {
  $(document).ready(function() {
    $.ajax("/tweets", {
      method: "GET"
    })
      .then(function(data) {
        $(".container-of-posts").html("");
        cb(data);
      });
  });
};

$(document).ready(function() {
  loadtweets(renderTweets);
});




