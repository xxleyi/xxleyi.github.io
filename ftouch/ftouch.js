var score = 0;
var touched = 0;
var ltouched = 0;
var rtouched = 0;
$(document).ready(function() {
  newgame();
  var mButton = document.getElementById("middle-button");
  var lButton = document.getElementById("left-button");
  var rButton = document.getElementById("right-button");
  mButton.addEventListener("touchstart",function(event){
  $("#score-button").css("background-color","grey");
  touched = 0;
  })

  mButton.addEventListener("touchend",function(event){
  $("#score-button").css("background-color","red");
  touched = 1;
  })

  lButton.addEventListener("touchstart",function(event){
  $("#left-button").css("background-color","blue");
  louched = 1;
  })

  lButton.addEventListener("touchend",function(event){
  $("#left-button").css("background-color","green");
  louched = 0;

  })

  rButton.addEventListener("touchstart",function(event){
  $("#right-button").css("background-color","blue");
  rouched = 1;
  })

  rButton.addEventListener("touchend",function(event){
  $("#right-button").css("background-color","green");
  rouched = 0;
  })

})

function newgame() {
  $("#score-button").text("score:"+0);
}

document.addEventListener('touchstart', function(event){
  if(touched==1){
    newgame();
  }
  if(ltouched + rtouched == 1){
    score += 1;
    $("#score-button").text("score:"+score);
  }

})
