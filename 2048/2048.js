var board = new Array();
var moved = false;
var lost_game = false;
var score = 0;
$(document).ready(function(){
  newgame();
});

function newgame(){
  init();
  generateOneNumber();
  generateOneNumber();
  updateBoardView();
}

function init(){
  score = 0;
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
}

function generateOneNumber(){
  var temp = new Array();
  temp = getValidCell();
  tempNum = temp[Math.floor(temp.length * Math.random())];
  var randomX = parseInt(tempNum / 4);
  var randomY = parseInt(tempNum % 4);
  var randomNumber = Math.random()<0.7?2:4;
  board[randomX][randomY] = randomNumber;
  // showNumberWithAnimation(randomX, randomY, randomNumber);
  return true;
}

$(document).keydown(function (event) {
  move();
  if(moved){
    generateOneNumber();
  }else{
    getValidCell();
    if(lost_game){
      console.log('You are lost!')
    }
  }
  moved = false;
  updateBoardView();
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

	if(Math.abs(deltax) <0.2*documentWidth&& Math.abs(deltay)<0.2*documentWidth){
		return;
	}

	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax > 0){
			//向右
			if(moveRight()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
		}else{
			//向左
			if(moveLeft()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
		}
	}else{
		if(deltay > 0){
			//向下
			if(moveDown()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
		}else{
			//向上
			if(moveUp()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
		}
	}
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
