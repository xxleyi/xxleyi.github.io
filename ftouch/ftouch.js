

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

$("#middle-button").addEventListener("touch",function(){
  $("#score-button").css("background-color","grey")
})
