

$(document).ready(function() {
  init();
  // newgame();
  // var mButton = document.getElementById("middle-button");
  // $(mButton).css("background-color","grey");
  var mButton = document.getElementById("middle-button");
  // $(mButton).css("background-color","grey");
  console.log("ready")
  mButton.addEventListener("touchend",function(event){
    $("#score-button").css("background-color","grey");
    console.log("shit")
  })

})

function init() {
  $("#score-button").text("score:"+100);
}

// function newgame() {
//
// }
