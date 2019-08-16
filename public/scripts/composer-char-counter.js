//Checks character count and changes colour to red if 140 characters are exceeded
$(document).ready(function() {
  $("textarea").on("keyup", function() {
    let CharsThatRemain = 140 - ($(this).val()).length;
    let counter = $(this).siblings(".counter");

    if (CharsThatRemain < 0) {
      counter.html(CharsThatRemain).addClass("error");
    } else {
      counter.html(CharsThatRemain).removeClass("error");
    }
  });
});