window.onload=function(){
	var cvs=document.getElementById("canvas");
	var cxt=cvs.getContext("2d");
	var cvsW=cvs.width;
	var cvsH=cvs.height;

	var snakeW=10;
	var snakeH=10;

	//fenshu
	var score=4;

	//default direction
	var direction="down";

	//得到用户输入的方向
	document.addEventListener("keydown",getDirection);

	function getDirection(e){
		if(e.keyCode===37&&direction!=="right"){
				direction="left"

		}else if(e.keyCode===38&&direction!=="down"){
				direction="up"
		}else if(e.keyCode===39&&direction!=="left"){
				direction="right"
		}else if(e.keyCode===40&&direction!=="up"){
				direction="down"
		}

	}
	

	function drawSnake(x,y){
		cxt.fillStyle="#fff";
		cxt.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

		cxt.fillStyle="#000";
		cxt.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	
	}

	// drawSnake(4,4);

	var len=4;
	var snake=[];

	for(var i=len-1;i>=0;i--){
		snake.push({x:i,
		            y:0});
	}

		//画食物
		var food={x:Math.round(Math.random()*(cvsW/snakeW-1)+1),
				  y:Math.round(Math.random()*(cvsH/snakeH-1)+1)};
	    function drawFood(x,y){
	    	cxt.fillStyle="yellow";
			cxt.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

			cxt.fillStyle="#000";
			cxt.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	    }

	    function drawScore(x){
	    	cxt.fillStyle="yellow";
	    	cxt.fillText("score:"+x,5,cvsH-5);
	    }

		function draw(){
			cxt.clearRect(0,0,cvsW,cvsH);
			for(var i=0;i<snake.length;i++){
				var x=snake[i].x;
				var y=snake[i].y;
				drawSnake(x,y);
		}

		//画食物
		drawFood(food.x,food.y);


		var snakeX=snake[0].x;
		var snakeY=snake[0].y;
		
		 // snakeX++;
		 if(direction==="right"){
              snakeX++;
		 }else if(direction==="left"){
                snakeX--;
		 }else if(direction==="up"){
            snakeY--;
		 }else{
            snakeY++;
		 }

          if(snakeX<0||snakeY<0||snakeX>cvsW/snakeW||snakeY>cvsH/snakeH)
          {
          	location.reload();
          }

         if(snakeX===food.x&&snakeY===food.y){
         	food={x:Math.round(Math.random()*(cvsW/snakeW-1)+1),
				  y:Math.round(Math.random()*(cvsH/snakeH-1)+1)};
				   var newHead={
				 	x:snakeX,
				 	y:snakeY
		 			};
		 			score++;
         } else{
 				snake.pop();
 				var newHead={
				 	x:snakeX,
				 	y:snakeY
		 			};
         }
         
        drawScore(score);
		
		 snake.unshift(newHead);
	}

	setInterval(draw,300);

	// draw();

}