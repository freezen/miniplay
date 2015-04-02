function Enemy1(x)
{
	this.x = 512;//屏幕宽
	this.y = 696;//长
	this.birth_x = x;//出生位置 x
	this.birth_y = 0;//出生位置 y
	this.length_x=98;//图片长度
	this.length_y=75;
	this.change = (this.y)/2;//转向点
	this.isDie=false;
	this.img = "badboy1";
	this.bad=400;
	this.image;
	this.enemy_fire_time=70;//定义每隔多久就fire
	this.enemy_bullet=1;//子弹模型定义
	this.beFired=0;
	this.beFiredImg="beFired1";
}

Enemy1.prototype.draw = function()
{
	this.image = document.getElementById(this.img);
	var image_beFired = document.getElementById(this.beFiredImg);
	if(!this.isDie){
		if(this.beFired==0){
			g.drawImage(this.image,this.birth_x, this.birth_y, this.length_x, this.length_y) ;
		}
		else {
			g.drawImage(image_beFired,this.birth_x, this.birth_y, this.length_x, this.length_y) ;
		}
	}
	else {
		//enemys.pop();
	}
};


Enemy1.prototype.update = function()
{
	var v=3;//移动速度
	if(this.birth_y<this.change){
		this.birth_y+=v;
	}
	else {
		this.birth_x-=v;
	}
	if(this.birth_x<-(this.length_y+20)){
		this.isDie=true;
	}
	if ((time%this.enemy_fire_time==1)&&(!this.isDie))
	{
		this.enemy_fire();//fire !
	}
	this.checkHit();
	if(this.isDie)
	{
		player.fire1Reduce=0;
		player.fire1Start=0;
		addBombs(this.birth_x,this.birth_y,2,1);//爆炸啦
	}
	
};


Enemy1.prototype.checkHit = function()
{
	if(player.fire==3){
		if((player.fireOn==1)&&((((player.birth_x+10)<(this.birth_x+88))&&((this.birth_y+75)>player.fire1Start)&&((this.birth_y)<player.birth_y)&&((player.birth_x+54)>(this.birth_x+88)))||( ((player.birth_x+10)<(this.birth_x+10))&&((this.birth_y+75)>player.fire1Start)&&((this.birth_y)<player.birth_y)&&((player.birth_x+54)>(this.birth_x+10)) )||(( (player.birth_x+54)<(this.birth_x+88) )&&((this.birth_y+75)>player.fire1Start)&&((this.birth_y)<player.birth_y)&&((player.birth_x+10)>(this.birth_x+10)))  ) ){
			this.bad-=10;
			this.beFired=1;
			player.fire1Reduce=this.birth_y+55;
			player.fire1Start=this.birth_y+55;
		}
		else {
			this.beFired=0;
			
		}
	}
	if (this.bad==0)
	{
		this.isDie=true;
		music_j=0;
		if(music_i<7){music_i++;}
		player.score+=100;
	}

};

Enemy1.prototype.enemy_fire = function()
{
	var bullet =new Array();
	var i;
	if(this.enemy_bullet==1){
		for(i=0;i<10;i++){
			bullet[i] = new Enemy_bullet1(this.birth_x + 20, this.birth_y - 6,i);
		}
	}
	else if(this.enemy_bullet==2){
		i=0;
		bullet[i] = new Enemy_bullet2(this.birth_x + 20, this.birth_y - 6,i);
		i=1;
	}
	var j=0;
	for(j=0;j<i;j++){
		enemy_bullets.push(bullet[j]);
	}
};

//第二类坏蛋
function Enemy2(bx,v)
{
	this.x = 512;//屏幕宽
	this.y = 696;//长
	this.birth_x = bx;//出生位置 x
	this.birth_y = 0;//出生位置 y
	this.length_x=83;//图片长度
	this.length_y=57;
	this.isDie=false;
	this.img = "badboy2";
	this.bad=150;
	this.image;
	this.enemy_fire_time=60;//定义每隔多久就fire
	this.enemy_bullet=2;//子弹模型定义
	this.beFired=0;
	this.beFiredImg="beFired2";
	this.v=v;
}

Enemy2.prototype.draw = function()
{
	this.image = document.getElementById(this.img);
	var image_beFired = document.getElementById(this.beFiredImg);
	if(!this.isDie){
		if(this.beFired==0){
			g.drawImage(this.image,this.birth_x, this.birth_y, this.length_x, this.length_y) ;
		}
		else {
			g.drawImage(image_beFired,this.birth_x, this.birth_y, this.length_x, this.length_y) ;
		}
	}
	else {
		//enemys.pop();
	}
};


Enemy2.prototype.update = function()
{
	var v=this.v;//移动速度
	if(this.birth_y<this.y){
		this.birth_y+=v;
	}
	else {
		this.isDie=true;
	}
	if ((time%360==this.enemy_fire_time)&&(!this.isDie))
	{
		this.enemy_fire();//fire !
	}
	this.checkHit();
	if(this.isDie)
	{
		player.fire1Reduce=0;
		player.fire1Start=0;
		addBombs(this.birth_x,this.birth_y,2,1);//爆炸啦
	}
	
};


Enemy2.prototype.checkHit = function()
{
	if(player.fire==3){
		if((player.fireOn==1)&&((((player.birth_x+10)<(this.birth_x+73))&&((this.birth_y+57)>player.fire1Start)&&((this.birth_y)<player.birth_y)&&((player.birth_x+54)>(this.birth_x+73)))||( ((player.birth_x+10)<(this.birth_x+10))&&((this.birth_y+57)>player.fire1Start)&&((this.birth_y)<player.birth_y)&&((player.birth_x+54)>(this.birth_x+10)) )||(( (player.birth_x+54)<(this.birth_x+73) )&&((this.birth_y+57)>player.fire1Start)&&((this.birth_y)<player.birth_y)&&((player.birth_x+10)>(this.birth_x+10)))  ) ){
			this.bad-=10;
			this.beFired=1;
			player.fire1Reduce=this.birth_y+37;
			player.fire1Start=this.birth_y+37;
		}
		else {
			this.beFired=0;
			//player.fire1Reduce=0;
			//player.fire1Start=0;
		}
	}
	if (this.bad==0)
	{
		this.isDie=true;
		music_j=0;
		if(music_i<7){music_i++;}
		player.score+=100;
	}

};

Enemy2.prototype.enemy_fire = function()
{
	var bullet =new Array();
	var i;
	if(this.enemy_bullet==1){
		for(i=0;i<10;i++){
			bullet[i] = new Enemy_bullet1(this.birth_x + 20, this.birth_y - 6,i);
		}
	}
	else if(this.enemy_bullet==2){
		i=0;
		bullet[i] = new Enemy_bullet2(this.birth_x + 20, this.birth_y - 6,i);
		i=1;
	}
	var j=0;
	for(j=0;j<i;j++){
		enemy_bullets.push(bullet[j]);
	}
};

//第三类坏蛋
function Enemy3(bx)
{
	this.x = 512;//屏幕宽
	this.y = 696;//长
	this.birth_x = bx;//出生位置 x
	this.birth_y = 0;//出生位置 y
	this.length_x=162;//图片长度
	this.length_y=162;
	this.isDie=false;
	this.img = "badboy3";
	this.bad=1200;
	this.image;
	this.enemy_fire_time=165;//定义每隔多久就fire
	this.enemy_bullet=3;//子弹模型定义
	this.beFired=0;
	this.beFiredImg="beFired3";
	this.v=2;
}

Enemy3.prototype.draw = function()
{
	this.image = document.getElementById(this.img);
	var image_beFired = document.getElementById(this.beFiredImg);
	if(!this.isDie){
		if(this.beFired==0){
			g.drawImage(this.image,this.birth_x, this.birth_y, this.length_x, this.length_y) ;
		}
		else {
			g.drawImage(image_beFired,this.birth_x, this.birth_y, this.length_x, this.length_y) ;
		}
	}
	else {
		//enemys.pop();
	}
};


Enemy3.prototype.update = function()
{
	var v=this.v;//移动速度
	if(this.birth_y<this.y){
		this.birth_y+=v;
	}
	else {
		this.isDie=true;
	}
	if ((time%this.enemy_fire_time==1)&&(!this.isDie))
	{
		this.enemy_fire();//fire !
	}
	this.checkHit();
	if(this.isDie)
	{
		player.fire1Reduce=0;
		player.fire1Start=0;
		addBombs(this.birth_x,this.birth_y,2,1);//爆炸啦
		zhen();
	}
	
};


Enemy3.prototype.checkHit = function()
{
	if(player.fire==3){
		if((player.fireOn==1)&&((((player.birth_x+10)<(this.birth_x+132))&&((this.birth_y+162)>player.fire1Start)&&((this.birth_y)<player.birth_y)&&((player.birth_x+54)>(this.birth_x+132)))||( ((player.birth_x+10)<(this.birth_x+30))&&((this.birth_y+162)>player.fire1Start)&&((this.birth_y)<player.birth_y)&&((player.birth_x+54)>(this.birth_x+30)) )||(( (player.birth_x+54)<(this.birth_x+132) )&&((this.birth_y+162)>player.fire1Start)&&((this.birth_y)<player.birth_y)&&((player.birth_x+10)>(this.birth_x+30)))  ) ){
			this.bad-=10;
			this.beFired=1;
			player.fire1Reduce=this.birth_y+37;
			player.fire1Start=this.birth_y+37;
		}
		else {
			this.beFired=0;
			//player.fire1Reduce=0;
			//player.fire1Start=0;
		}
	}
	if (this.bad==0)
	{
		this.isDie=true;
		music_j=0;
		if(music_i<7){music_i++;}
		player.score+=100;
	}

};

Enemy3.prototype.enemy_fire = function()
{
	var bullet =new Array();
	var i;
	if(this.enemy_bullet==1){
		for(i=0;i<10;i++){
			bullet[i] = new Enemy_bullet1(this.birth_x + 55, this.birth_y + 36,i);
		}
	}
	else if(this.enemy_bullet==2){
		i=0;
		bullet[i] = new Enemy_bullet2(this.birth_x + 55, this.birth_y + 36,i);
		i=1;
	}
	else if(this.enemy_bullet==3){
		for(i=0;i<20;i++){
			bullet[i] = new Enemy_bullet3(this.birth_x + 61, this.birth_y +81,i);
		}
		
		if (time==1156)
		{
			for(i=i;i<40;i++){
				bullet[i] = new Enemy_bullet4(this.birth_x + 61, this.birth_y +81,i);
			}
		}
	}
	var j=0;
	for(j=0;j<i;j++){
		enemy_bullets.push(bullet[j]);
	}
};

//第一类子弹
function Enemy_bullet1(x,y,i)
{
	this.speed = 1;
	this.isDie = false;
	this.x=x;
	this.y=y;
	this.position=i;
}

Enemy_bullet1.prototype.update = function()
{
	if (this.position<=4)
	{
		this.x-=(this.position+this.speed);
		this.y+=(4-this.position+this.speed);
	}
	else {
		this.x+=(9%this.position+this.speed);
		this.y+=(this.position-5+this.speed);
	}
};

Enemy_bullet1.prototype.draw = function()
{
	var img = document.getElementById("bullet1_enemy");
	g.drawImage(img, this.x, this.y, 44, 44) ;
};

//第二类子弹
function Enemy_bullet2(x,y,i)
{
	this.speed = 5;
	this.isDie = false;
	this.x=x;
	this.y=y;
	this.position=i;
}

Enemy_bullet2.prototype.update = function()
{
	this.y+=(this.speed+1);
};

Enemy_bullet2.prototype.draw = function()
{
	var img = document.getElementById("bullet2_enemy");
	g.drawImage(img, this.x, this.y, 44, 44) ;
};

//第三类子弹
function Enemy_bullet3(x,y,i)
{
	this.speed = 3;
	this.isDie = false;
	this.x=x;
	this.y=y;
	this.position=i;
}

Enemy_bullet3.prototype.update = function()
{
	if (this.position<=4)
	{
		this.x-=(this.position+this.speed-2);
		this.y+=(4-this.position+this.speed);
	}
	else if((this.position>4)&&(this.position<=9)){
		this.x+=(9%this.position+this.speed-2);
		this.y+=(this.position-5+this.speed);
	}
	else if((this.position>9)&&(this.position<=14)){
		this.x+=((this.position-10)+this.speed-2);
		this.y-=(4-(this.position-10)+this.speed);
	}
	else if((this.position>14)&&(this.position<=19)){
		this.x-=(9%(this.position-10)+this.speed-2);
		this.y-=((this.position-10)-5+this.speed);
	}
};

Enemy_bullet3.prototype.draw = function()
{
	var img = document.getElementById("bullet3_enemy");
	g.drawImage(img, this.x, this.y, 44, 44) ;
};

//第四类子弹
function Enemy_bullet4(x,y,i)
{
	this.speed = 3;
	this.isDie = false;
	this.x=x;
	this.y=y;
	this.position=i-20;
}

Enemy_bullet4.prototype.update = function()
{
	if (this.position<=4)
	{
		this.x-=(this.position+this.speed-3);
		this.y+=(4-this.position+this.speed);
	}
	else if((this.position>4)&&(this.position<=9)){
		this.x+=(9%this.position+this.speed-3);
		this.y+=(this.position-5+this.speed);
	}
	else if((this.position>9)&&(this.position<=14)){
		this.x+=((this.position-10)+this.speed-3);
		this.y-=(4-(this.position-10)+this.speed);
	}
	else if((this.position>14)&&(this.position<=19)){
		this.x-=(9%(this.position-10)+this.speed-3);
		this.y-=((this.position-10)-5+this.speed);
	}
};

Enemy_bullet4.prototype.draw = function()
{
	var img = document.getElementById("bullet4_enemy");
	g.drawImage(img, this.x, this.y, 44, 44) ;
};





