var score = 0;
var touched = false;
var ltouched = 1;
var rtouched = 2;
var intervalTimecount;
$(document).ready(function() {
  newgame();
  // $("#game-over").show();
  var bButton = document.getElementById("game-begin");
  var mButton = document.getElementById("middle-button")
  var lButton = document.getElementById("left-button");
  var rButton = document.getElementById("right-button");
  bButton.addEventListener("touchstart",function(event){
    if(!touched){
      event.preventDefault();
      $("#score-button").css("background-color","red");
      $("#game-begin").css("box-shadow","0rem 0.3rem 0.3rem #737373")
      touched = true;
      t = setTimeout('gameOver()',13000);
      intervalTimecount = setInterval("timeCount()",1000);
    }
  })
  mButton.addEventListener("touchstart",function(event){
    $("#score-button").css("background-color","red");
    // touched = false;
  })
  mButton.addEventListener("touchend",function(event){
    $("#score-button").css("background-color","grey");
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
  $("#score-button").text("点击次数:"+0);
  $("#time").text("倒计时:"+12+'s');
  $("#game-begin").css("box-shadow","0rem 0rem 0rem #737373")
  $("#score-button").css("background-color","red");
  $("#game-over").css("display","none");//css("display","none");
}

function gameOver() {
  clearInterval(intervalTimecount);
  $("#score-end").text("点击次数:"+score)
  $("#game-over").css("display","block")//show();
}

var timeNum = 0;
function timeCount() {
  $("#time").text("倒计时:"+addZero(11-timeNum)+'s');
  timeNum += 1;
}

function addZero(vNumber) {
  return ((vNumber<10)?"0":"")+vNumber;
}

document.addEventListener('touchstart', function(event){
  if(touched){
    $("#score-button").text("点击次数:"+score);
  }
})
