﻿var ground = 
{
	draw:function()
	{
		var img = document.getElementById("background");
		var img1 = document.getElementById("background1");
		var img2 = document.getElementById("background2");
		var img3 = document.getElementById("background3");
		var img4 = document.getElementById("background4");
		var img5 = document.getElementById("background5");
		var img6 = document.getElementById("background6");
		var img7 = document.getElementById("background7");
		
		if((time*2)<2888){
			g.drawImage(img,0, 2888-time*2 , 512, 696,0,0,512,696) ;
		}
		else {
			g.drawImage(img,0,353 , 512, 343,0,353,512,343) ;
			if((time>=1450)&&(time<1480)){g.drawImage(img1,0,0 , 512, 353,0,0,512,353) ;}
			else if((time>=1480)&&(time<1510)){g.drawImage(img2,0,0 , 512, 353,0,0,512,353) ;}
			else if((time>=1510)&&(time<1540)){g.drawImage(img3,0,0 , 512, 353,0,0,512,353) ;}
			else if((time>=1540)&&(time<1570)){g.drawImage(img4,0,0 , 512, 353,0,0,512,353) ;}
			else if((time>=1570)&&(time<1600)){g.drawImage(img5,0,0 , 512, 353,0,0,512,353) ;}
			else if((time>=1600)&&(time<1630)){g.drawImage(img6,0,0 , 512, 353,0,0,512,353) ;}
			else if(time>=1630){g.drawImage(img7,0,0 , 512, 353,0,0,512,353) ;}
			else g.drawImage(img,0,0 , 512, 353,0,0,512,353) ;

			if(time==1631){
				objs=[enemy_bullets];
			}
			if(time==1641){
				//boss();
				//boss
				var a,b;
				var bullet =new Array();
				for(a=0;a<10;a++){
					bullet[a] = new Enemy_bullet1(250,85,a);
				}
				for(a=a;a<30;a++){
					bullet[a] = new Enemy_bullet3(200,80,a-10);
				}
				
				for(a=a;a<50;a++){
					bullet[a] = new Enemy_bullet4(300,80,a-10);
				}
				//alert("1");
				//enemy_bullets=new Array();
				//alert("2");
				for(b=0;b<a;b++){
					enemy_bullets.push(bullet[b]);
				}
				//alert("3");
				//objs=[enemy_bullets];
				//alert("4");
			}

			if((player.birth_y<510)&&(player.life!=0)&&(time>=1895)){
				//alert(time);
				player.life+=1;
				var winner=document.getElementById("fightNext");
				g.drawImage(winner, player.birth_x-2,player.birth_y+79, 82, 696-player.birth_y-79) ;
				player.birth_y-=15;
				player.birth_x+=5;
				m_win.play();
				setTimeout("win()",7000);
			}
		}
	}
}

function win(){
	location.href=window.location;
}

function boss(){
	
	
}


