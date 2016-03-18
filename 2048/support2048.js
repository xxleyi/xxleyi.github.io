/*
name:support2048
原作者:cqc
改编：刘西民
*/
documentWidth = window.screen.width;
documentHeight = window.screen.height;

function getNumberCellBgColor(number){

	switch(number){
		case 2:return "#eee4da"; break;
		case 4:return "#ede0c8"; break;
		case 8:return "#f2b179"; break;
		case 16:return "#f59563"; break;
		case 32:return "#f67c5f"; break;
		case 64:return "#ec6544"; break;
		case 128:return "#e44d29"; break;
		case 256:return "#edcf72"; break;
		case 512:return "#c8a145"; break;
		case 1024:return "#a8832b"; break;
		case 2048:return "#86aa9c"; break;
		case 4096:return "#a6c"; break;
		case 8192:return "#791e6f"; break;
	}
	return "grey";

}

function isPC() {
    var system = {
        win : false,
        mac : false,
        xll : false
    };
    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    //跳转语句
    if (system.win || system.mac || system.xll) { //转向电脑端
        return true; //是电脑
    } else {
        return false; //是手机
    }
}

function isMobile() {
	var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
	var u = navigator.userAgent;
	if (null == u) {
		return true;
	}
	var result = regex_match.exec(u);
	if (null == result) {
		return false
	} else {
		return true
	}
}

function getNumberCellFontSize(number){
	if(number <= 64){
		return "3em";
	}else if(number <= 512){
		return "2.5em";
	}else if(number <=99999){
		return "2em";
	}else {
		return "1.5em";
	}
return "1em";
}

function getNumberCellFontColor(number){
	if(number <= 4){
		return "#776e65";
	}
	return "white";
}

function getValidCell() {
	var valid_list = new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				valid_list.push(4*i + j);
			}
		}
	}
	if(valid_list.length==0){
		lost_game = true;
	}
	return valid_list;
}

function transpose(){
  var temp_transpose = new Array();
	for(var i=0;i<4;i++){
		temp_transpose[i] = new Array();
	    for(var j=0;j<4;j++){
				temp_transpose[i][j] = board[j][i];
	      }
	}
	for(var i=0;i<4;i++){
	    for(var j=0;j<4;j++){
				board[i][j] = temp_transpose[i][j];
	      }
	}
}

function find2048() {
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]>0){
				if(num_2048==0){
					if(board[i][j]%2048==0){
						num_2048 += 1;
						$(".dialog-success").css("display","block");
						$("#conti").text("Good! Try "+4096);
					}
				}else if(num_2048==1){
					if(board[i][j]%4096==0){
						num_2048 += 1;
						$(".dialog-success").css("display","block");
						$("#conti").text("Better! Try "+8192);
					}else if(num_2048==2){
						if(board[i][j]%8192==0){
							num_2048 += 1;
							$(".dialog-success").css("display","block");
							$("#conti").text("You are the Best, Try "+16384)
						}else if (num_2048==3){
							if(board[i][j]%16384==0){
								num_2048 += 1;
								$(".dialog-success").css("display","block");
								$("#conti").text("You Win!")
							}
						}
					}
				}
				// else{
				// 	return false;
				// }
			}

		}
	}
	console.log("num_2048:"+num_2048)
}
