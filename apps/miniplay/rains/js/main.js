﻿//引入游戏，画面初始化，logo
function main(){
	m_init.play();
    init();
}
function moveCloudsblack(yy){
	setTimeout("moveCloudsblackHelp("+yy+");",70);
}

function moveCloudsblackHelp(yy){
	if (yy<60)
	{
		g.drawImage(menubg,0,0, 512, 696) ;
		if (yy<25)
		{
			g.drawImage(logo,0, yy*6 , 512, 167) ;
		}
		else {
			g.drawImage(logo,0,160 , 512, 167) ;
			
		}
		g.drawImage(cloudsblack,0, yy , 512, 563) ;
		yy+=1;
		moveCloudsblack(yy);
	}
	else {
		g.fillStyle = "white";
		g.font = '20px Helvetica';
		g.fillText("          Press     [SPACE]     to     go              ", 100, 650);	
		gameStart=setInterval("sleep()",200);//判断 x 键是否按动，是的话，运行
	}
}

//深化logo颜色
function setBlacker1(){
	g.drawImage(logo2,150, 200 , 194, 226) ;
	setTimeout("setBlacker2()",400);
}
function setBlacker2(){
	g.drawImage(logo3,150, 200 , 194, 226) ;
	setTimeout("setBlacker3()",400);
}
function setBlacker3(){
	g.fillStyle ="red";
	g.fillRect(0,0,512,696);

	//画初始动画
	g.drawImage(menubg,0,0, 512, 696) ;
	var yy=0;
	moveCloudsblack(yy);
}

//主调方法
function sleep(){
	if (key[32])
	{
		m_init.pause();
		m_back.play();//背景音乐

		objs = [enemys,bullets,enemy_bullets];//对象集初始化

		setInterval("drawAll()", 40 );
		setInterval("updateAll()", 30);
		clearInterval(gameStart);
	}
}

function init(){
	var logo1 = document.getElementById("logo1");
	var logo2 = document.getElementById("logo2");
	var logo3 = document.getElementById("logo3");
	var logo = document.getElementById("logo");
	var menubg = document.getElementById("menubg");

	var cloudsblack=document.getElementById("cloudsblack");

	//画移动的logo（1）和 黑色背景
	g.fillRect(0,0,512,696);
	g.drawImage(logo1,150, 200 , 194, 226) ;
	setTimeout("setBlacker1()",400);

}

//画分数
function drawScore(){
   
    g.fillStyle = "white";
	g.font = '20px Helvetica';
	if((music_i==2)&&(music_j==0)){m_first.play();music_j=1;}
	if((music_i==3)&&(music_j==0)){m_double.play();music_j=1;}
	if((music_i==4)&&(music_j==0)){m_three.play();music_j=1;}
	if((music_i==5)&&(music_j==0)){m_four.play();music_j=1;}
	if((music_i==6)&&(music_j==0)){m_five.play();music_j=1;}
	if((music_i==7)&&(music_j==0)){m_six.play();music_j=1;}
    g.fillText("LIFE:"+player.life+"                                       SCORE: " + player.score, 40, 30);
    
}

function updateAll(){
	time++;
	player.update();
	if(time%260==1){
		addEnemy3((time*2)%300);
	}
    if(time%110==1){
		addEnemy1((time*2)%100+100);
	}
	if (time%360==1)
	{
		var j=1;
		var i=1;
		while(i<10)
		{
			addEnemy2(j*10,(i+4)/2);
			j+=9;
			i++;
		}
	}
	updateObjs();
}

function drawAll(){
 	ground.draw();
	player.draw();//画自己
	drawObjs();//划 敌人
    drawScore();
}


function updateObjs() {
    var i, j, obj;
    for (i = 0; i < objs.length; i++) 
	{
        obj = objs[i]; 
		for (j = 0; j < obj.length; j++)
		{
			if (time==1652)
			{
				//alert(time+"obj.length"+obg[obj.length-1].x);
			}
			obj[j].update();
			if (obj[j].isDie) 
			{
				obj[j] = null;
				obj.splice(j, 1);
				j--;
			}
		}
      
    }
	
}

function drawObjs() 
{
    var i, j, obj;
    for (i = 0; i < objs.length; i++) 
	{
        obj = objs[i]; 
		for (j = 0; j < obj.length; j++) 
		{
			
			obj[j].draw();
		}
        
    }
}

function addEnemy1(x){
    var enemy = new Enemy1(x); 
    enemys.push(enemy);
    
}
function addEnemy2(i,v){
    var enemy = new Enemy2(i,v); 
    enemys.push(enemy);
    
}
function addEnemy3(i){
    var enemy = new Enemy3(i); 
    enemys.push(enemy);
    
}


function addBombs(x,y,i,bomb)
{
	img_bomb="explode"+String(bomb);
	image_bomb = document.getElementById(img_bomb);

	if(i==1){
		g.drawImage(image_bomb,(x-58), (y-58), 192, 192) ;
	}
	else if(i==2){
		g.drawImage(image_bomb,(x-30), (y-30), 192, 192) ;
	}
	else if(i==3){
		g.drawImage(image_bomb,(x+30), (y+30), 81, 28) ;
	}
	addBombsHelp(x,y,i,bomb);
};

function  addBombsHelp(x,y,i,bomb){
	if(bomb<20){
		bomb++;
		if(bomb==8){
			if(i!=1){
				i=3;
				setTimeout("addBombs("+x+","+y+","+i+","+bomb+");",35);
			}
		}
		else {
			if(i!=1){
				setTimeout("addBombs("+x+","+y+","+i+","+bomb+");",35);
			}
			else if(bomb<8){
				setTimeout("addBombs("+x+","+y+","+i+","+bomb+");",35);
			}
		}
	}
	else {
		//bomb=8;
	}
}

function zhen(){
	zhen_my=setInterval("zhen_Help()",80);
}

function zhen_Help(){
	if(zhen_trigg==0){
		myCanvas.style.left=390+"px";
		zhen_trigg=1;
	}
	else {
		myCanvas.style.left=410+"px";
		zhen_trigg=0;
	}
	zhen_time++;
	if (zhen_time>=8)
	{
		myCanvas.style.left=400+"px";
		zhen_time=1;
		clearInterval(zhen_my);
	}
}



document.onkeydown = function(e){
    e.preventDefault();
	key[e.keyCode] = true;
	//alert(e.keyCode);
};

document.onkeyup = function(e){
    e.preventDefault();
	key[e.keyCode] = false;
};

document.ontouchstart = function(e){
	e.preventDefault();
};




