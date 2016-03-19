var board = new Array();
var moved = false;
var lost_game = false;
var score = 0;
var direction = -1;
var num_2048 = 0;
var randomX = 0;
var randomY= 0;
$(document).ready(function(){
  newgame();
});

function newgame(){
  init();
  generateOneNumber();
  generateOneNumber();
  updateBoardView();
}

function again(){
  newgame();
  $(".dialog-fail").css("display","none");
}

function conti() {
  $(".dialog-success").css("display","none");
}

function init(){
  score = 0;
  num_2048 = 0;
  $(".dialog-fail").css("display","none")
  $(".dialog-success").css("display","none")
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var gridCell = $("#grid-cell-"+i+"-"+j);
    }
  }
  for(var i=0;i<4;i++){
    board[i] = new Array();
    for(var j=0;j<4;j++){
      board[i][j] = 0;
    }
  }
  var scoreCell = $("#score");
  scoreCell.text("Score:000"+score);
  updateBoardView();
}

function updateBoardView(){
  $(".grid-cell").remove();
  var scoreCell = $("#score");
  scoreCell.text("Score:"+score);
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      $("#grid-container").append('<div class="grid-cell" id="grid-cell-'+i+'-'+j+'"></div>');
      var theNumberCell = $('#grid-cell-'+i+"-"+j);
      if(board[i][j]==0){
        theNumberCell.text(' ');
      }else {
        theNumberCell.css("background-color", getNumberCellBgColor(board[i][j]));
        theNumberCell.css("color", getNumberCellFontColor(board[i][j]));
        theNumberCell.css("font-size", getNumberCellFontSize(board[i][j]));
        theNumberCell.text(board[i][j]);
      }
    }
  }
  if(moved){
    showNumberWithAnimation(randomX, randomY);
  }
}

function generateOneNumber(){
  var temp = new Array();
  temp = getValidCell();
  tempNum = temp[Math.floor(temp.length * Math.random())];
  randomX = parseInt(tempNum / 4);
  randomY = parseInt(tempNum % 4);
  var randomNumber = Math.random()<0.7?2:4;
  board[randomX][randomY] = randomNumber;
}

function showNumberWithAnimation(randomX, randomY) {
  var theNumberCell = $("#grid-cell-"+randomX+"-"+randomY);
  theNumberCell.animate({
    opacity:'0.4',
    width:"30px",
    marginLeft:"0px",
    marginRight:"90px"
  },100);
  theNumberCell.animate({
    opacity:'1',
    width:"100px",
    marginLeft:"10px",
    marginRight:"10px"
  },200);
}

function stopAnimation(randomx, randomy) {
  var theNumberCell = $("#grid-cell-"+randomX+"-"+randomY);
  theNumberCell.stop();
}

$(document).keydown(function (event) {
  stopAnimation(randomX, randomY);
  move();
  find2048();
  if(moved){
    generateOneNumber();
  }else{
    getValidCell();
    if(lost_game){
      findMerge();
      if(lost_game){
      $(".dialog-fail").css("display","block")
      }
    }
  }
  updateBoardView();
  moved = false;
})

document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
	event.preventDefault();
});

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if(Math.abs(deltax) <0.03*documentWidth&& Math.abs(deltay)<0.01*documentWidth){
		return;
	}

	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax<0){
      //left
      direction = 0;
		}else{
      //right
      direction = 1;
    }
  }else{
    if(deltay<0){
      //up
      direction = 2;
    }else{
      //down
      direction = 3;
    }
  }
  stopAnimation();
  moveMobile();
  find2048();
  if(moved){
    generateOneNumber();
  }else{
    getValidCell();
    if(lost_game){
      findMerge();
      if(lost_game){
      $(".dialog-fail").css("display","block")
      }
    }
  }
  updateBoardView();
  moved = false;
});

function move(){
  rotate();
  remove();
  for(var i=0;i<4;i++){
    for(var j=0;j<3;j++){
        if(board[i][j]==board[i][j+1]){
          board[i][j] *= 2;
          score += board[i][j];
          board[i][j+1] = 0;
        }
    }
  }
  remove();
  if(event.keyCode==40){
    for(var i=0;i<4;i++){
      board[i].reverse();
    }
    transpose();
  }else{
    rotate();
  }
}

function moveMobile(){
  rotateMobile();
  remove();
  for(var i=0;i<4;i++){
    for(var j=0;j<3;j++){
        if(board[i][j]==board[i][j+1]){
          board[i][j] *= 2;
          score += board[i][j];
          board[i][j+1] = 0;
        }
    }
  }
  remove();
  if(direction==3){
    for(var i=0;i<4;i++){
      board[i].reverse();
    }
    transpose();
  }else{
    rotateMobile();
  }
}

function remove() {
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      for(var k=0;k<3-j;k++){
        if(board[i][k]==0){
          board[i][k] = board[i][k+1];
          board[i][k+1] = 0;
          if(board[i][k]>0){
            moved = true;
          }
        }
      }
    }
  }
}


function rotate(){
  switch (event.keyCode) {
    case 37://left
    event.preventDefault();
      break;
    case 38://up
    event.preventDefault();
      transpose();
      break;
    case 39://right
    event.preventDefault();
      for(var i=0;i<4;i++){
        board[i].reverse();
      }
      break;
    case 40://down
    event.preventDefault();
      transpose();
      for(var i=0;i<4;i++){
        board[i].reverse();
      }
    break;

  }
}

function rotateMobile(){
  switch (direction) {
    case 0://left
    event.preventDefault();
      break;
    case 2://up
    event.preventDefault();
      transpose();
      break;
    case 1://right
    event.preventDefault();
      for(var i=0;i<4;i++){
        board[i].reverse();
      }
      break;
    case 3://down
    event.preventDefault();
      transpose();
      for(var i=0;i<4;i++){
        board[i].reverse();
      }
    break;

  }
}
