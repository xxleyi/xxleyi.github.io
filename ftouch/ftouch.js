var score = 0;
$(document).ready(function() {
  init();
  var mButton = document.getElementById("middle-button");

  mButton.addEventListener("touchstart",function(event){
  $("#score-button").css("background-color","grey");
  })
  mButton.addEventListener("touchend",function(event){
  $("#score-button").css("background-color","red");
  })
})

function init() {
  $("#score-button").text("score:"+0);
}


// function newgame() {
//
// }
