

$(document).ready(function() {
  init();
  // newgame();

})

function init() {
  $("#score-button").text("score:"+100);
}

// function newgame() {
//
// }

document.addEventListener("touchend",function(){
  $("#score-button").css("background-color","grey");
  console.log("shit")
})
