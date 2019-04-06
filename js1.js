window.onload=function(){

	var cvs=document.getElementById("canvas");
	var cxt=cvs.getContext("2d");
	var cvsW=cvs.width;
	var cvsH=cvs.height;
	var snakeW=10;
	var snakeH=10;
   //得分
	var score=4;

	//定义食物
	var food={x:Math.round(Math.random()*(cvsW/snakeW-1)+1),
		      y:Math.round(Math.random()*(cvsH/snakeH-1)+1)};

	//定义默认方向
	var direction="right";


	//获取方向
	document.addEventListener("keydown",getDirection);
	function getDirection(e){
		if(e.keyCode===37&&direction!=="right"){
				direction="left";

		}else if(e.keyCode===38&&direction!=="down"){
				direction="up";
		}else if(e.keyCode===39&&direction!=="left"){
				direction="right";
		}else if(e.keyCode===40&&direction!=="up"){
				direction="down";
		}
     // console.log(e.keyCode);
	}

    //画一个细胞
	function drawSnake(x,y){
		cxt.fillStyle="#fff";
		cxt.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

	
		cxt.strokeStyle="#000";
		cxt.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	
	}
   //画食物
	function drawFood(x,y){
	   cxt.fillStyle="yellow";
		cxt.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

		cxt.fillStyle="#000";

		cxt.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);	
	}

	//绘制文本
	function drawScore(score){
		cxt.strokeStyle="yellow";
		cxt.font="20px simsun";
       cxt.strokeText("score:"+score,5,cvsH-5);
       
	}

	// function drawScore(x){
	//     	cxt.fillStyle="yellow";
	//     	cxt.fillText("score:"+x,5,cvsH-5);
	//     }

	var len=4;
	var snake=[];
	for(var i=len-1;i>=0;i--){
		snake.push({x:i,
			       y:0});
	}

	function draw(){
		//画一条蛇
		cxt.clearRect(0,0,cvsW,cvsH);
		for(var i=0;i<snake.length;i++){
			
			drawSnake(snake[i].x,snake[i].y);
		}

		var snakeX=snake[0].x;
		var snakeY=snake[0].y;
	  //指定方向
		if(direction==="right"){
	          snakeX++;
		}else if(direction==="left"){
	           snakeX--;
		}else if(direction==="up"){
				snakeY--;
		}else if(direction==="down"){
				snakeY++;
		}

		//吃掉蛇
		if(food.x===snakeX&&food.y===snakeY){
             food={x:Math.round(Math.random()*cvsW/snakeW),
		           y:Math.round(Math.random()*cvsW/snakeW)};
		           	score++;

		}else{
						
			snake.pop(); 
		}
		 var newHead={x:snakeX,
		     		y:snakeY};
		     
         snake.unshift(newHead);
		

 		drawFood(food.x,food.y);
 		drawScore(score);
 		// drawScore(score);

 		if(snakeX<0||snakeY<0||snakeX>cvsW/snakeW||snakeY>cvsH/snakeH){
 			location.reload();
 		}

		
	}

	

	setInterval(draw,300);


}