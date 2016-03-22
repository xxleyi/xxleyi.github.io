var score = 0;
var touched = false;
var ltouched = 1;
var rtouched = 2;
var intervalTimecount;
$(document).ready(function() {
  newgame();
  $("#game-over").show();
  var mButton = document.getElementById("middle-button");
  var lButton = document.getElementById("left-button");
  var rButton = document.getElementById("right-button");
  mButton.addEventListener("touchstart",function(event){
    event.preventDefault();
    $("#score-button").css("background-color","grey");
    touched = true;
    t = setTimeout('gameOver()',13000);
    intervalTimecount = setInterval("timeCount()",1000);
  })

  mButton.addEventListener("touchend",function(event){
    $("#score-button").css("background-color","red");
    // touched = false;
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
  timeNum = 0;
  score = 0;
  touched = false;
  ltouched = 1;
  rtouched = 2;
  $("#score-button").text("score:"+0);
  $("#time").text("Time:"+13+'s');
  $("#score-button").css("background-color","red");
  $("#game-over").hide();//css("display","none");
}

function gameOver() {
  clearInterval(intervalTimecount);
  $("#score-end").text("score:"+score)
  $("#game-over").show();
}

var timeNum = 0;
function timeCount() {
  $("#time").text("Time:"+(12-timeNum)+'s');
  timeNum += 1;
}

document.addEventListener('touchstart', function(event){
  if(touched){
    $("#score-button").text("score:"+score);
  }
})
