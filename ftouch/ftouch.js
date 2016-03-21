var score = 0;
var touched = false;
var ltouched = false;
var rtouched = false;
$(document).ready(function() {
  newgame();
  var mButton = document.getElementById("middle-button");
  var lButton = document.getElementById("left-button");
  var rButton = document.getElementById("right-button");
  mButton.addEventListener("touchstart",function(event){
  $("#score-button").css("background-color","grey");
  touched = true;
  })

  mButton.addEventListener("touchend",function(event){
  $("#score-button").css("background-color","red");
  touched = false;
  })

  lButton.addEventListener("touchstart",function(event){
  $("#left-button").css("background-color","blue");
  louched = true;
  score += 1;
  })

  lButton.addEventListener("touchend",function(event){
  $("#left-button").css("background-color","red");
  louched = false;

  })

  rButton.addEventListener("touchstart",function(event){
  $("#right-button").css("background-color","blue");
  rouched = true;
  score += 1;
  })

  rButton.addEventListener("touchend",function(event){
  $("#right-button").css("background-color","red");
  rouched = false;
  })



})

function newgame() {
  $("#score-button").text("score:"+0);
}

document.addEventListener('touchstart', function(event){
  $("#score-button").text("score:"+score);
})
