function Player(){
  this.x;
  this.y;
  this.ogx;
  this.ogy;
  this.hp = 100;
  this.r = 7.5
  this.upperconst = 0;
  this.lowerconst = h;
  this.leftconst = 0;
  this.rightconst = w;
  this.hp;
  this.hasFlag = false;
  this.speed = 1.5;
  this.xspeed = 0;
  this.yspeed = 0;
  this.isSlowed = false;
  this.color;
  this.projectileHit = 0;
  this.speedfc = 0;
  this.show = function(){
    strokeWeight(0)
    fill(this.color, this.color, 255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    image(playergradient, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    this.speed = this.isSlowed ? 1: 1.5;
    if(frameCount < this.speedfc + 180){
       this.speed = 2; 
    }
    
  }
  this.update = function(){
    this.x += this.xspeed * this.speed;
    this.y += this.yspeed * this.speed;
    this.x = constrain(this.x, this.leftconst, this.rightconst);
    this.y = constrain(this.y, this.upperconst, this.lowerconst);
    this.color = (this.projectileHit < frameCount + 5) ? 0 : 50;
  }
}

var p = new Player();

function Flag(){
    this.x = sclX(700);
    this.y = sclY(100);
    this.r = 10;
    this.show = function(){
        fill(50);
        ellipse(this.x, this.y, 20, 20);
        image(flagimage, this.x - 7.5, this.y - 7.5, 15, 15);
    }
    this.update = function(){
      if(p.hasFlag){
         this.x = p.x;
         this.y = p.y;
      }
    }
}  

var flag = new Flag();

function Thief(x, y, type){
  this.x = x;
  this.y = y;
  this.upperconst;
  this.lowerconst;
  this.rightconst;
  this.leftconst;
  this.speed = 1;
  this.ogx = x;
  this.ogy = y;
  this.r = 10;
  this.xspeed = 0;
  this.yspeed = 0;
  this.speed = 0;
  this.frozen = false;
  this.color = 0;
   this.burstFC = 0;
  this.show = function(){
    this.speed = 1;
    noStroke();
    if(type == "burst") fill(this.color);
    if(type == "speeder") fill(this.color, this.color, 255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2)
     
    image(circlegradient, this.x -this.r, this.y - this.r, this.r * 2, this.r * 2);
     
    if(type == "burst"){
       this.color = p.hasFlag ?  255 - 255 * ((frameCount - this.burstFC) / 300) : 0;
       if(frameCount % 300 == 0 && p.hasFlag) this.burstFC = frameCount;
       if(frameCount < this.burstFC + 15) {
           this.speed = 20;
       }else{
          this.speed = 1; 
       }
    }else if(type == "speeder"){
       this.speed = 2.3; 
    }
    
  }
  this.update = function(){
     this.x += this.xspeed * this.speed;
     this.y += this.yspeed * this.speed;
    this.x = constrain(this.x, this.leftconst, this.rightconst);
    this.y = constrain(this.y, this.upperconst, this.lowerconst);
  }
  
}

var thieves = [];

function Slowzone(type, x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.inSlowzone;
    this.show = function(){
      fill(50);
       if(type == "circle"){
          ellipse(x, y, r * 2, r * 2);
          this.inSlowzone = distance(p.x, p.y, x, y) < p.r + r
       }else if(type == "rect"){
          rect(x, y, x + r, y + r);
          this.inSlowzone = p.x > x && p.x < x + r && p.y > y && p.y < y + r
       }
    }
}

var slowzones = [];

function triangleSlowzone(x, y, xs, ys, type){
   
  this.xs = xs;
  this.ys = ys;
  this.type = type;
  this.inSlowzone;
  this.show = function(){
    fill(255, 168, 69)
     if(this.type == "UL"){
       this.cornerx = x;
       this.cornery = y;
         triangle(x, y, x + xs, y, x, y + ys);
       this.inSlowzone = p.x > this.cornerx && p.y > this.cornery && p.x < x + xs - (p.y - y) * (xs / ys) && p.y < y + (ys / xs) * (x + xs - p.x)
       
     }else if(this.type == "UR"){
         triangle(x + xs, y, x, y, x + xs, y + ys);
       this.cornerx = x + xs;
       this.cornery = y;
       this.inSlowzone = p.x < this.cornerx && p.y > this.cornery && p.x > x + (p.y - y) * (xs / ys) && p.y < y + (ys / xs) * (p.x - x);
       
     }else if(this.type == "LL"){
         triangle(x, y + ys, x, y, x + xs, y + ys);
       this.cornerx = x;
       this.cornery = y + ys;
       this.inSlowzone = p.x > this.cornerx && p.y < this.cornery && p.x < x + (p.y - y) * (xs / ys) && p.y > y + (ys / xs) * (p.x - x)
     }else if(this.type == "LR"){
         triangle(x + xs, y + ys, x + xs, y, x, y + ys);
       this.cornerx = x + xs;
       this.cornery = y + ys;
       this.inSlowzone = p.x < this.cornerx && p.y < this.cornery && p.x > x + xs - (p.y - y) * (xs / ys) && p.y > y + (ys / xs) * (x + xs - p.x);
     }
  }
}

var triangleSlowzones = [];

function Cell(x, y, r, initial, type){
    this.x = x;
    this.y = y;
    this.xf = x + r;
    this.yf = y + r;
    this.r = r;
    this.xConstrainingValue;
    this.yConstrainingValue;
    this.xIntBool;
    this.yIntBool;
    this.topLeftColor = 0;
    this.topRightColor = 0;
    this.bottomLeftColor = 0;
    this.bottomRightColor = 0;
    this.outerTopLeftColor = 0;
    this.outerTopRightColor = 0;
    this.outerBottomLeftColor = 0;
    this.outerBottomRightColor = 0;
    this.leftDoorX = this.x - this.r / 2
    this.leftDoorY = this.yf - this.r / 2;
    this.doorR = this.r;
    this.rightDoorX = this.xf - this.r / 2;
    this.rightDoorY = this.y - this.r / 2;
    this.inCell;  
    this.cellStatus = initial;
    this.upperWall = new Wall(this.x, this.y, this.xf , this.y, "x");
    this.lowerWall = new Wall(this.x, this.yf, this.xf, this.yf, "x");
    this.leftWall = new Wall(this.x, this.y, this.x, this.yf, "y");
    this.rightWall= new Wall(this.xf, this.y, this.xf, this.yf, "y");
    this.upperWall.partOfCell = true;
    this.lowerWall.partOfCell = true;
    this.leftWall.partOfCell = true ;
    this.rightWall.partOfCell = true;
    walls.push(this.rightWall);
    walls.push(this.leftWall);
    walls.push(this.upperWall);
    walls.push(this.lowerWall);
    this.show = function(){
      strokeWeight(0)
      noFill()
      rect(x, y, r,r, 1);
      this.inCell = p.x > x && p.x < x + r && p.y > y && p.y < y + r;
      strokeWeight(2);
      stroke(200);
      if(this.cellStatus == "UR"){
        this.upperWall.active = true;
        this.rightWall.active = true;
        this.leftWall.active = false;
        this.lowerWall.active = false;
      }else if(this.cellStatus == "LL"){
        this.upperWall.active = false;
        this.rightWall.active = false;
        this.leftWall.active = true;
        this.lowerWall.active = true;
      }else if(this.cellStatus == "UL"){
         this.upperWall.active = true;
        this.rightWall.active = false;
        this.leftWall.active = true;
        this.lowerWall.active = false;
      }else if(this.cellStatus == "LR"){
         this.upperWall.active = false;
        this.rightWall.active = true;
        this.leftWall.active = false;
        this.lowerWall.active = true;
      }
      stroke(255);
      strokeWeight(0);
      fill(30 + this.topLeftColor);
      rect(this.x + this.r / 4, this.y + this.r / 4, this.r / 4, this.r / 4);
      fill(30 + this.topRightColor);
      rect(this.x + this.r / 2, this.y + this.r / 4, this.r / 4, this.r / 4);
      fill(30 + this.bottomLeftColor);
      rect(this.x + this.r / 4, this.y + this.r / 2, this.r / 4, this.r / 4);
      fill(30 + this.bottomRightColor);
      rect(this.x + this.r / 2, this.y + this.r / 2, this.r / 4, this.r / 4);
      fill(30 + this.outerTopLeftColor);
      rect(this.x - this.r / 2, this.y - this.r / 2, this.r / 4, this.r / 4);
      fill(30 + this.outerTopRightColor);
      rect(this.xf + this.r / 4, this.y - this.r / 2, this.r / 4, this.r / 4);
      fill(30 + this.outerBottomLeftColor);
      rect(this.x - this.r / 2, this.yf + this.r / 4, this.r / 4, this.r / 4);
      fill(30 + this.outerBottomRightColor);
      rect(this.xf + this.r / 4, this.yf + this.r / 4, this.r / 4, this.r / 4);
      this.topLeftBool = p.x > this.x + this.r / 4 && p.x < this.x + this.r / 2 && p.y > this.y + this.r / 4 && p.y < this.y + this.r / 2;
      this.topRightBool = p.x > this.x + this.r / 2 && p.x < this.x + this.r / 2 + this.r / 4 && p.y > this.y + this.r / 4 && p.y < this.y + this.r / 2;
      this.bottomLeftBool = p.x > this.x + this.r / 4 && p.x < this.x + this.r / 2 && p.y > this.y + this.r / 2 && p.y < this.y + this.r / 2 + this.r / 4;
      this.bottomRightBool = p.x > this.x + this.r / 2 && p.x < this.x + this.r / 2 + this.r / 4 && p.y > this.y + this.r / 2 && p.y < this.y + this.r / 2 + this.r / 4;
      this.outerTopLeftBool = p.x > this.x - this.r / 2 && p.x < this.x - this.r / 2+  this.r / 4 && p.y > this.y - this.r / 2 && p.y < this.y - this.r / 2 + this.r / 4;
      this.outerTopRightBool = p.x > this.xf + this.r / 4 && p.x < this.xf + this.r / 4+  this.r / 4 && p.y > this.y - this.r / 2 && p.y < this.y - this.r / 2 + this.r / 4;
      this.outerBottomLeftBool = p.x > this.x - this.r / 2 && p.x < this.x - this.r / 2+  this.r / 4 && p.y > this.yf + this.r / 4 && p.y < this.yf + this.r / 4 + this.r / 4;
      this.outerBottomRightBool = p.x > this.xf + this.r / 4 && p.x < this.xf + this.r / 4+  this.r / 4 && p.y > this.yf + this.r / 4 && p.y < this.yf + this.r / 4 + this.r / 4;
      this.topLeftColor = this.topLeftBool ? 50 : 0;
      this.topRightColor = this.topRightBool ? 50 : 0;
      this.bottomLeftColor = this.bottomLeftBool ? 50 : 0;
      this.bottomRightColor = this.bottomRightBool ? 50 : 0;
      this.outerTopLeftColor = this.outerTopLeftBool ? 50 : 0;
      this.outerTopRightColor = this.outerTopRightBool ? 50 : 0;
      this.outerBottomLeftColor = this.outerBottomLeftBool ? 50 : 0;
      this.outerBottomRightColor = this.outerBottomRightBool ? 50 : 0;
      
    }
}

var cells = [];

function Cannon(x, y, type){
    this.xi = x;
    this.yi = y;
    this.xf = this.xi;
    this.yf = this.yi + 10;
    this.type = type;
    this.r = 15;
    this.on = true;
    this.firerate;
    this.color = 0;
    this.theta = angleMaker(this.xi, this.yi, p.x, p.y)
    this.show = function(){ 
      strokeWeight(0);
      if(type == "lowdmg"){
        this.firerate = 120;
        this.r = 15;
        fill(this.color, 255, this.color);
        ellipse(this.xi, this.yi, this.r * 2, this.r * 2);
        image(playergradient, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        fill(0);
        ellipse(this.xi, this.yi, 3, 3);
        strokeWeight(this.r / 3);
        stroke(0);
        line(this.xi, this.yi, this.xf, this.yf);
      }else if(type == "highdmg"){
        this.firerate = 100;
        this.r = 20;
        fill(this.color, this.color , 255);
        ellipse(this.xi, this.yi, this.r * 2, this.r * 2);
        image(playergradient, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        fill(0);
        ellipse(this.xi, this.yi, 10, 10);
        strokeWeight(10);
        stroke(0);
        line(this.xi, this.yi, this.xf, this.yf);
      }
        this.xf = this.xi + (10 * cos(angleMaker(this.xi, this.yi, p.x, p.y)));
        this.yf = this.yi + (10 * sin(angleMaker(this.xi, this.yi, p.x, p.y)));
    }
}

var cannons = []

function CannonProjectile(x, y, theta, type){
  this.x = x;
  this.y = y;
  this.speed;
  this.dmg;
  this.theta = angleMaker(x, y, p.x, p.y);
  this.r;  
  this.show = function(){    
    if(type == "lowdmg"){
      this.dmg = 5
      this.speed = 3
      this.r = 1.5
      fill(0, 255, 0);
    }else if(type == "highdmg"){
      this.dmg = 10;
      this.speed = 6
      this.r = 2.5
      fill(0, 0, 255);
    } 
      strokeWeight(0);
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
      this.x += this.speed * cos(this.theta);
      this.y += this.speed * sin(this.theta);
  }
  
}

var cannonProjectiles=  []

function slowzone(x, y, xs, ys){
  this.x = x;
  this.y = y;
  this.xs = xs;
  this.ys = ys;
  this.bool;
  this.show = function(){
    fill(255);
    rect(this.x, this.y, this.xs, this.ys);
    this.bool = p.x > this.x && p.x < this.xs + this.x && p.y > this.y && p.y < this.y + this.ys; 
  }
}

var slowzones = [];

function speedBoost(x, y){
   this.x = x;
   this.y = y;
   this.r = 15;
   this.show = function(){
      fill(255, 255, 0);
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
     image(bolt, this.x - this.r / 2, this.y - this.r / 2, this.r, this.r);
   }
}

var speedboosts = [];

function Portal(x1, y1, x2, y2){
   this.x1 = x1;
   this.x2 = x2;
   this.y1 = y1;
   this.y2 = y2;
  this.r = sclX(10);
   this.show = function(){
     noFill()
     strokeWeight(1);
     stroke(100);
     image(portalgradient, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
      ellipse(x1, y1, this.r * 2, this.r * 2);
     fill(100);
     image(opponentgradient, this.x2 - this.r, this.y2 - this.r, this.r * 2, this.r * 2)
     ellipse(x2, y2, this.r * 2, this.r * 2);
   }
  this.update = function(){
     if(distance(p.x, p.y, this.x1, this.y1) < p.r + this.r){
          p.x = this.x2
          p.y = this.y2
     }
  }
}

var portals = [];

function Wall(x1, y1, x2, y2, type){
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
  this.type = type;
  this.active = true;
  this.partOfCell = false;
    this.show = function(){
      if(this.active){
       strokeWeight(1);
      stroke(200);
      line(x1, y1, x2, y2);
      }
    }
}

var walls = []
var upperLeftLowerWall = new Wall(0, 100, 100, 100, "x");
  var upperLeftRightWall = new Wall(100, 0, 100, 100, "y")
  var lowerRightLeftWall = new Wall(700, 400, 700, 500, "y");
  var lowerRightUpperWall = new Wall(700, 400, 800, 400, "x");
  
function Bait(x, y){
   this.x = x;
  this.y = y;
  this.r = 10;
  this.active = false;
  this.show = function(){
    fill(255,69,0);
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
    image(playergradient, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
  }
}

var bait = [];
