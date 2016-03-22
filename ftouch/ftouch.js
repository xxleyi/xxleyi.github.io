var score = 0;
var touched = false;
var ltouched = 1;
var rtouched = 2;
$(document).ready(function() {
  newgame();
  var mButton = document.getElementById("middle-button");
  var lButton = document.getElementById("left-button");
  var rButton = document.getElementById("right-button");
  mButton.addEventListener("touchstart",function(event){
    event.preventDefault();
    $("#score-button").css("background-color","grey");
    touched = true;
  })

  mButton.addEventListener("touchend",function(event){
    $("#score-button").css("background-color","red");
    touched = false;
  })

  lButton.addEventListener("touchstart",function(event){
    event.preventDefault();
    if(touched){
      if(ltouched<rtouched){
        $("#left-button").css("background-color","blue");
        score += 1;
        ltouched += 2;
      }
    }
  })

  lButton.addEventListener("touchend",function(event){
    $("#left-button").css("background-color","green");
  })

  rButton.addEventListener("touchstart",function(event){
    event.preventDefault();
    if(touched){
      if(rtouched<ltouched){
        $("#right-button").css("background-color","blue");
        score += 1;
        rtouched += 2;
      }
    }
  })

  rButton.addEventListener("touchend",function(event){
    $("#right-button").css("background-color","green");
  })

})

function newgame() {
  var score = 0;
  var touched = false;
  var ltouched = 1;
  var rtouched = 2;
  $("#score-button").text("score:"+0);
}

document.addEventListener('touchstart', function(event){
  if(touched){
    $("#score-button").text("score:"+score);
  }
})
