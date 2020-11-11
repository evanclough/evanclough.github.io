var h = 500
var w = 800

function Menu() {
  this.level = 1
  this.menustatus = -1
  this.ingamestatus = false
  this.aiUpdater;
  this.fc = 0
  this.fc2 = 0
  this.fc3 = 0
  this.fc4 = 0
  this.fc5 = 0
  this.fc6 = 0
  this.pGoalLight = 0
  this.oppGoalLight = 0
  this.oppAmmo;
  this.hd = 0;
  this.animspeed = 40
  this.oppPoints = 0
  this.oppPoints1 = 0
  this.oppPoints2 = 0
  this.oppPointsArr = [0, 0, 0, 0]
  this.anim = h
  this.anim2 = w
  this.fade1 = 0
  this.fade2 = 0
  this.fade3 = 0
  this.fade4 = 0
  this.fade5 = 0
  this.fade6 = 0
  this.fade7 = 0
  this.fadespeed = 1
  this.hardcoremode = 0
  this.hardcorestatus
  this.muted = 0
  this.mutedstatus = "off"
  this.sfxmuted = 0
  this.sfxmutedstatus = "off"
  this.dmg;
  this.freeze = 0
  this.hp = 0
  this.bolt = 0
  this.devmode = false
  this.poweruprate;
  this.gamemode;
  this.oppnumber;
  this.titletransition = 0
  this.unlockedLevels = [true, false, false, false, false, false, false, false, false, false]
  this.levelintros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  this.levelattempted = [false, false, false, false, false, false, false, false, false, false]
  this.levelintrofade = 0
  this.tip;
  this.show = function() {  
    strokeWeight(5)
    fill(0)
    stroke(this.fade6)
    strokeWeight(5)
    stroke(this.fade5)
    noFill()
    rect(w / 30, h / 18.75, w - (2 * w / 30), h - (2 * h / 18.75), 10)
    strokeWeight(0)
    fill(this.fade1)
    textSize(30)
    text('spherio', w / 2, h / 4)
    textSize(10)
    textSize(15)
    if (Number.isInteger(this.hardcoremode / 2)) {
      this.hardcorestatus = "off"
    } else {
      this.hardcorestatus = "on"
    }
    if(this.muted % 2 === 0){
       this.mutedstatus = "on" 
    }else {
     this.mutedstatus = "off" 
    }
    if(this.sfxmuted % 2 === 0){
       this.sfxmutedstatus = "on" 
    }else {
       this.sfxmutedstatus = "off" 
    }
    fill(100)
    play.show()
    lvl2.show()
    play.update(1)
    lvl2.update(1)
    ttl.show()
    ttl.update(1)
    mutebutton.show()
    mutebutton.update(1)
    sfxmutebutton.show()
    sfxmutebutton.update(1)
    levelSelectorButton.show()
    levelSelectorButton.update(1)
    textSize(10)
    if (mouseX > lvl2.left && mouseX < lvl2.right && mouseY > lvl2.upper && mouseY < lvl2.lower) {
      fill(this.fade1)
      textSize(11)
      text("current level: " + mn.level, w / 2, 5 * h / 8)
      lvl2.txt = "have fun trying"
      lvl2.sz = 15
    } else {
      lvl2.sz = 15
      lvl2.txt = "hardcore mode:"
      textSize(15)
      if(lvl2.mouseIsOn){
      fill(255)
      }else{
       fill(this.fade7)   
      }
      textAlign(CENTER, CENTER)
      text(mn.hardcorestatus, lvl2.left + lvl2.sx / 2, lvl2.upper + 4 * lvl2.sy / 5)
      textSize(11)
      textAlign(CENTER)
      fill(this.fade1)
      text("current level: " + mn.level, w / 2, 5 * h / 8)
    }
    
    textAlign(CENTER, CENTER)
    textSize(11)
    
    if(mutebutton.mouseIsOn ){
       fill(255) 
    }else {
        fill(this.fade7)
    }
    text(this.mutedstatus, mutebutton.right + mutebutton.sx / 10, mutebutton.upper +  mutebutton.sy / 3)
   
    if(sfxmutebutton.mouseIsOn){
       fill(255) 
    }else {
        fill(this.fade7)
    }
      text(this.sfxmutedstatus, sfxmutebutton.right, sfxmutebutton.upper +  sfxmutebutton.sy / 3)
  }
  this.update = function() {
    this.anim -= this.animspeed
    this.anim2 -= this.animspeed * (w / h)
    this.anim = constrain(this.anim, 0, h)
    this.anim2 = constrain(this.anim2, 0, w)
    this.fade1 += 1 * 255 / 200
    this.fade1 = constrain(this.fade1, 0, 255)
    this.fade2 = constrain(this.fade2, 0, 55)
    this.fade3 = constrain(this.fade3, -200, 0)
    this.fade2 += (55 / 200) * this.fadespeed
    this.fade3 -= this.fadespeed
    this.fade4 += 0.5 * this.fadespeed
    this.fade4 = constrain(this.fade4, 0, 100)
    this.fade5 += 3 * this.fadespeed / 20
    this.fade5 = constrain(this.fade5, 0, 30)
    this.fade6 += 30 * this.fadespeed / 200
    this.fade6 = constrain(this.fade6, 0, 16)
    this.fade7 += 155 * this.fadespeed / 200
    this.fade7 = constrain(this.fade7, 0, 155)
    this.titletransition += 0.5
    this.titletransition = constrain(this.titletransition, 0, 30)
  }

}
var mn = new Menu();

function Player(x, y) {
  this.x = x;
  this.y = y;
  this.ix
  this.iy
  this.c = 20 * w / 800
  this.r = this.c / 2
  this.points = 0;
  this.points1 = 0
  this.points2 = 0
  this.pointsarr = [0, 0, 0, 0]
  this.hp = 50
  this.hpbar = this.hp
  this.behindOb = false
  this.xspeed = 0;
  this.yspeed = 0;
  this.speed = 5;
  this.color = 0
  this.upd = 0
  this.lowerconst = 0;
  this.upperconst = 0;
  this.rightconst = 0;
  this.leftconst = 0;
  this.portalstatus = 0; 
  this.fourlinestatus = 0
  this.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
    this.x = constrain(this.x, this.leftconst, this.rightconst)
    this.y = constrain(this.y, this.upperconst, this.lowerconst)
    this.hpbar = constrain(this.hp, 0, 50)
  };
  this.show = function() {
    fill(255, this.color, this.color);
    strokeWeight(0)
    stroke(10)
    ellipse(this.x, this.y, this.c, this.c);
    fill(255, 0, 0)
    strokeWeight(0)
    if (this.y > h - 50) {
      rect(this.x - 10, this.y - 15, this.hpbar / 2.5, 2.5)
    } else {
      rect(this.x - 10, this.y + 12.5, this.hpbar / 2.5, 2.5)
    }
    image(playergradient, this.x - (this.r + 0.2), this.y - (this.r + 0.2), this.c + 0.4, this.c + 0.4)
    
  };
}

function Goal(x, y, s) {
  this.x = x;
  this.y = y
  this.color = 0
  this.lightup = 0
  this.r = 20 * h / 500
  this.show = function() {
    strokeWeight(1)
    if (s == 0) {
      stroke(255, 0, 0)
    } else {
      stroke(0, 0, 255)
    }
    if(frameCount < this.lightup + 10){
       this.color = 100 
    }else {
       this.color = 0 
    }
    fill(100 + this.color)
    
    ellipse(this.x, this.y, this.r * 2, this.r * 2)
    stroke(0)
    
    image(playergradient, this.x - (this.r + 0.2), this.y - (this.r + 0.2), this.r * 2 + 0.4, this.r * 2 + 0.4)
    
  }
}

function midL() {
  this.x = w / 2
  this.show = function() {
    fill(50)
    strokeWeight(2)
    stroke(100)
    line(this.x, 0, this.x, h)
  }
  this.update = function() {
    this.x = w / 2 + p.points - mn.oppPoints
    this.x = constrain(this.x, w / 6, 5 * w / 6)
  }
}

function Midlines() {
  this.x1 = w / 3
  this.x2 = 2 * w / 3
  this.show = function() {
    stroke(100)
    strokeWeight(2)
    line(this.x1, 0, this.x1, h)
    line(this.x2, 0, this.x2, h)
  }
  this.update = function() {
    this.x1 = (w / 3) + mn.oppPoints1 - p.points1
    for (var i = 1; i < opps.length; i += 2) {
      this.x2 = (2 * w / 3) - mn.oppPoints2 + p.points2
    }
    this.x1 = constrain(this.x1, w / 5, w / 2 - 50)
    this.x2 = constrain(this.x2, w / 2 + 50, 4 * w / 4)
  }
}

function Circular() {
  this.x = w / 2
  this.y = h / 2
  this.r = h / 3
  this.show = function() {
    noFill()
    strokeWeight(2)
    stroke(100)
    ellipse(this.x, this.y, this.r * 2, this.r * 2)
    fill(0)
  }
  this.update = function() {
    this.r = (h / 3) - mn.oppPoints + p.points
    this.r = constrain(this.r, h / 6, 4.5 * h / 10)
  }
}

function Portal(x, y, r, a){
    this.x = x
    this.y = y
  this.r = r
    if(a === 0){
       this.portalx = this.x - this.r / 2       
    }else {
       this.portalx = this.x + this.r / 2 
    }
  this.portaly = this.y    
    this.show = function(){
        noFill()
        strokeWeight(2)
        stroke(100)
        ellipse(this.x, this.y, this.r * 2, this.r * 2)                
        ellipse(this.portalx, this.y, w / 32, w / 32)     
    }  
    this.update = function(){
        if(a === 0){
          this.r = r + p.points1 - mn.oppPoints1
          
          
        }else {
           this.r = r + p.points2 - mn.oppPoints2 
        }
      this.r = constrain(this.r, w / 12 , w / 5)
    }
}

function Fourline(){
   this.x1 = w / 6 
   this.x2 = 5 * w / 6 
   this.y1 = (400 / 3) * h / 500 
   this.y2 = h -  (400 / 3) * h / 500 
  this.portalr = w / 80
   this.positions = [this.x1, this.y1, this.x2, this.y2]
  this.portals = []
  
   this.show = function(){
     this.portalxpositions = [this.x1 - this.portalr, this.x2 + this.portalr, this.portalr, this.x1 - this.portalr, this.x2 + this.portalr,  w - this.portalr, this.portalr, this.x1 - this.portalr, this.x2 + this.portalr,  w - this.portalr, this.x1 - this.portalr, this.x2 + this.portalr]
  this.portalypositions = [this.portalr, this.portalr, this.y1 - this.portalr,this.y1 - this.portalr,this.y1 - this.portalr,this.y1 - this.portalr, this.y2 + this.portalr, this.y2 + this.portalr, this.y2 + this.portalr, this.y2 + this.portalr, h - this.portalr, h - this.portalr]
     strokeWeight(2)
     stroke(100)
       line(this.x1, 0, this.x1, h)
       line(this.x2, 0, this.x2, h)
       line(0, this.y1, w, this.y1)
       line(0, this.y2, w, this.y2)
     noFill()
     for(var i = 0; i < this.portalxpositions.length; i++){ 
       quad(this.portalxpositions[i] - this.portalr, this.portalypositions[i] - this.portalr, this.portalxpositions[i] + this.portalr, this.portalypositions[i] - this.portalr, this.portalxpositions[i] + this.portalr, this.portalypositions[i] + this.portalr, this.portalxpositions[i] - this.portalr, this.portalypositions[i] + this.portalr)
       this.portals[i] = {
         x: this.portalxpositions[i], 
         y: this.portalypositions[i],
        bool: p.x > this.portalxpositions[i] - this.portalr && p.x < this.portalxpositions[i] + this.portalr && p.y < this.portalypositions[i] + this.portalr && p.y > this.portalypositions[i] - this.portalr
                         }
       
     }
   }
  this.update = function(){
      
    this.x1 = w / 6 + p.pointsarr[0] + p.pointsarr[2] - mn.oppPointsArr[0] - mn.oppPointsArr[2]
   this.x2 = 5 * w / 6 - p.pointsarr[1] - p.pointsarr[3] + mn.oppPointsArr[1] + mn.oppPointsArr[3]
   this.y1 = (400 / 3) * h / 500  + p.pointsarr[0] + p.pointsarr[1] - mn.oppPointsArr[0] - mn.oppPointsArr[1]
   this.y2 = h -  (400 / 3) * h / 500 - p.pointsarr[2] - p.pointsarr[3] + mn.oppPointsArr[2] + mn.oppPointsArr[3]
        this.x1 = constrain(this.x1, w / 10, (w / 2) - (62.5 * w / 800) - (40 * w / 800))
    this.x2 = constrain(this.x2, w - (w / 2) - (62.5 * w / 800) - (40 * w / 800), w - (w / 10))
    this.y1 = constrain(this.y1, 80 * h / 500, (h / 5) + ((200/3) * h / 500) - (20 * h / 500))
    this.y2 = constrain(this.y2, 0.8 * h - (((200/3) * h / 500)- (20 * h / 500)), h - (80 * h / 500))                
  }
}

function Corner(){
    this.x = w / 2
    this.y = h / 2
    this.show = function(){
        strokeWeight(2)
      stroke(100)      
         line(0, this.y, this.x, this.y)
         line(this.x, 0, this.x, this.y)
    }
  this.update = function(){
     this.x = w / 2 + p.points - mn.oppPoints 
    this.y = h / 2 + p.points - mn.oppPoints
    this.x = constrain(this.x, w / 5, 0.8 * w)
    this.y = constrain(this.y, h / 5, 4 * h / 5)
  }
}

function Diag(x1, y1, x2, y2) {
  this.x1 = x1
  this.x1i = x1
  this.x2 = x2
  this.y1 = y1
  this.y2 = y2
  this.show = function() {
    strokeWeight(2)
    stroke(100)
    line(this.x1,this.y1, this.x2, this.y2)
  }
  this.update = function() {
    this.x1 = p.points - mn.oppPoints
    this.x2 = w - mn.oppPoints + p.points
    this.x1 = constrain(this.x1, w / -2, w / 2)
    this.x2 = constrain(this.x2, w / 2, 3 * w / 2)
  }
}

function Fold(){
   this.theta = 0
   this.yc;
   this.xc;
   this.rx
   this.lx
   this.y
   this.r = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2))
   this.show = function(){
      strokeWeight(2)
    stroke(100)
     line(w / 2, h / 2, this.rx, this.y)
    line(w / 2, h / 2, this.lx,  this.y)
   }
  this.update = function(){
     this.theta = mn.oppPoints / 50 - p.points / 50 
    this.theta = constrain(this.theta, -1 * PI / 3, PI / 3)
    if(this.theta < Math.atan(h / w)){
        this.xc = w / 2
      this.yc = (w / 2) * Math.tan(this.theta)
      
    }else {
        this.xc = (h / 2) / (Math.tan(this.theta))
      this.yc = h / 2
    } 
    this.rx = w / 2 + this.xc
   this.lx = w -(w / 2 +  this.xc)
   this.y = h / 2 + this.yc
  }
}

function Pivot(){
   this.x = w / 2
   this.y = 0
   this.theta = 0
   this.show = function(){
     stroke(100)
     strokeWeight(2)
     line(w / 2, h, this.x, this.y)
     if(this.theta < PI + Math.atan(h / (w / 2))){
         this.x = 0
         this.y = h - (w / 2) * Math.tan(this.theta)
     }else if(this.theta >= PI + Math.atan(h / (w / 2)) && this.theta < (2 * PI) - Math.atan(h / (w / 2))){
         this.y = 0
          this.x = (w / 2) - (h / Math.tan(this.theta))
        
     }else {
         this.x = w
         this.y = h + (w / 2) * Math.tan(this.theta)
     }
   }
  this.update = function(){   
    this.theta = 1.5 * 3.1415 + p.points / 80 - mn.oppPoints / 80 
    this.theta = constrain(this.theta, 1.1 * PI, 1.9 * PI)
       
  }
}

function Opponent(x, y) {
  this.x = x;
  this.y = y;
  this.hp = 25;
  this.xspeed = 0;
  this.yspeed = 0;
  this.orient;
  this.pix = x
  this.piy = y
  this.speed = 4;
  this.r = 20 * w / 800
  this.upDown;
  this.upDiag;
  this.lowerDiag;
  this.horiz;
  this.color = 0;
  this.upd;
  this.rand
  this.rand1
  this.aiupdaterrand = 20
  this.rand2 = Math.random() * 300 + 200
  this.points
  this.lowerconst = h - 10;
  this.upperconst = 10;
  this.leftconst = midLine.x + 10;
  this.rightconst = w - 10;
  this.targetx = p.x
  this.targety = p.y
  this.ai1 = []
  this.ai2 = []
  this.plc;
  
  for (var i = 0; i < projectiles.length; i++) {
    this.ai1[i] = projectiles[i].xspeed > 0 && projectiles[i].x < this.x
    this.ai2[i] = projectiles[i].xspeed < 0 && projectiles[i].x > this.x
  }

  this.movements = [this.upDown, this.upDiag, this.lowerDiag, this.horiz]
  this.show = function() {
    fill(255, 255, this.color)
    strokeWeight(0)
    stroke(10)
    ellipse(this.x, this.y, this.r, this.r)
    fill(255, 0, 0)
    strokeWeight(0)
    fill(255, 255, 0)
    rect(this.x - 10, this.y + 12.5, this.hp / 1.25, 2.5)
    image(opponentgradient, this.x - (this.r / 2 + 0.2), this.y - (this.r / 2 + 0.2), this.r + 0.4, this.r + 0.4)
  }
  this.update = function() {
    this.x += this.xspeed * this.speed
    this.y += this.yspeed * this.speed
    this.x = constrain(this.x, this.leftconst, this.rightconst)
    this.y = constrain(this.y, this.upperconst, this.lowerconst)
    this.rand = Math.random()
  }
}

function Projectile(xi, yi) {
  this.x = p.x;
  this.y = p.y;
  this.xi = xi
  this.yi = yi
  this.hit = [];
  this.hitAng = [];
  this.opptheta = []
  for (var i = 0; i < opps.length; i++) {
    this.opptheta[i] = angleMaker(p.x, p.y, opps[i].x, opps[i].y)
  }
  this.pspeed = 10
  this.theta = angleMaker(p.x, p.y, mouseX, mouseY)
  this.xspeed = this.pspeed * Math.cos(this.theta);
  this.yspeed = this.pspeed * Math.sin(this.theta);
  this.color = 0
  this.update = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  this.show = function() {
    fill(255, 0, this.color)
    strokeWeight(0)
    image(playergradient, this.x - 2.6, this.y - 2.6, 5.2, 5.2)
    ellipse(this.x, this.y, 5, 5)
    strokeWeight(2)
  }
}

function oppProjectile(x, y, targetX, targetY) {
  this.x = x
  this.y = y
  this.pspeed = 8
  this.theta = angleMaker(this.x, this.y, targetX, targetY)
  this.xspeed = this.pspeed * Math.cos(this.theta)
  this.yspeed = this.pspeed * Math.sin(this.theta)
  this.show = function() {
    fill(255, 255, 0)
    strokeWeight(0)
    image(playergradient, this.x - 2.6, this.y - 2.6, 5.2, 5.2)
    ellipse(this.x, this.y, 5, 5)
  }
  this.update = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;

  }
}

function Button(tx, x, y, sx, sy, sz, isToggle, isExtended) {
  this.left = x
  this.right = x + sx
  this.upper = y
  this.lower = y + sy
  this.color = 0
  this.isToggle = isToggle
  this.sz = sz * w / 800  
  this.sx = sx
  this.sy = sy
  this.txt = tx
  this.fadespeed
  this.fade1 = 0
  this.fade2 = 0
  this.fade3 = 0
  this.fontcolor = 0
  this.rand = Math.random()
  this.show = function() {
    if(!isExtended){
    this.mouseIsOn = mouseX > this.left && mouseX < this.right && mouseY > this.upper && mouseY < this.lower
    }else{
      this.mouseIsOn = mouseX > this.left && mouseX < this.right + w / 40 && mouseY > this.upper && mouseY < this.lower
    }
    textFont(goodfont)
    textSize(this.sz)
    stroke(this.fade1)
    strokeWeight(0)
    fill(this.fade1 + this.color, 0, 0)
    if (this.mouseIsOn) {
      if (mouseIsPressed) {
        // rect(this.left + 2, this.upper + 2, sx, sy, 5)
      } else {
        for (var i = 2; i > 0; i -= 0.1) {
          fill(255 * Math.pow(2 - i, 0.5) / 5, 0, 0)
          // rect(this.left + i, this.upper + i, sx + i, sy + i, 5)
        }
        fill(this.fade1 + this.color, 0, 0)
        //  rect(this.left, this.upper, sx, sy, 5)
      }
      this.fontcolor = 100
    } else {
      this.fontcolor = 0
      for (var i = 2; i > 0; i -= 0.1) {
        fill(255 * Math.pow(2 - i, 0.5) / 5, 0, 0)
        // rect(this.left + i, this.upper + i, sx + i, sy + i, 5)
      }
      fill(this.fade1 + this.color, 0, 0)
      // rect(this.left, this.upper, sx, sy, 5)
    }
    textAlign(CENTER)
    fill(this.fade3 + this.fontcolor)
    if(!this.isToggle){
      
      text(this.txt, this.left + (sx / 2), this.upper + (sy / 2) - (sz / 4))
    }else{
      textAlign(CENTER, CENTER)
       text(this.txt, this.left + (sx / 2), this.upper + (sy / 3)) 
    }
  }
  this.update = function(a) {
    this.fadespeed = a
    this.fade1 = constrain(this.fade1, 0, 155)
    this.fade1 += this.fadespeed * 255 / 200
    this.fade2 = constrain(this.fade2, 0, 7)
    this.fade2 += (7 / 200) * this.fadespeed
    this.fade3 = constrain(this.fade3, 0, 155)
    this.fade3 += (255 / 200) * this.fadespeed
    if (this.mouseIsOn) {
      this.color = 50

    } else {
      this.color = 0
    }
  }
}


var tips = ["While sitting in a goal protects you from enemy fire, I wouldn't recommend doing it for too long.", "Grab the freeze powerup to freeze your opponent(s) in place.", "Grab the speed boost to temporarily boost the speed of you and your projectiles", "Grab the health boost to raise your HP"]

function restartMenu() {
  this.show = function() {
    textFont(goodfont)
    image(backgroundgradient, 0, 0, w, h)
    stroke(30)
    strokeWeight(5)
    noFill()
    rect(w / 30, w / 30, w - (2 * w / 30), h - (2 * h / 18.75), 10)
    fill(255)
    textSize(30)
    textAlign(CENTER)
    pa.show(0, 0, 55, -200)
    lvl.show(0, 0, 55, -200)
    pa.update(4)
    lvl.update(4)
    textSize(12)
    fill(255)
    text(mn.tip, w / 2, h / 2)
    textSize(30)
    text("you lost :(", w / 2, h / 3)

  }
}

function winMenu() {
  this.show = function() {
    image(backgroundgradient, 0, 0, w, h)
    strokeWeight(5)
    stroke(30)
    noFill()
    rect(w / 30, w / 30, w - (2 * w / 30), h - (2 * h / 18.75), 10)
    fill(255)
    textSize(30)
    textAlign(CENTER)
    strokeWeight(0)
    text("you won!", w / 2, h / 3)
    textAlign(LEFT)
    nl.show(0, 0, 55, -200)
    nl.update(4)
    lvl.show()
    lvl.update(4)
    strokeWeight(5)

  }
}




function levelmenu(){
   this.show = function(){
      image(backgroundgradient, 0, 0, w, h)
      strokeWeight(5)
      stroke(30)
      noFill()
      rect(w / 30, w / 30, w - (2 * w / 30), h - (2 * h / 18.75), 10)
      fill(255)
      textSize(30)
      textAlign(CENTER)
      strokeWeight(0)
      text("select a level:", w / 2, h / 3)
     for(let i = 0; i < levelButtons.length; i++){
        levelButtons[i].show()
        levelButtons[i].update(4)
       levelSelectorBTM.show()
       levelSelectorBTM.update(4)
       if(!mn.unlockedLevels[i]){
         image(lock, 53.3333 * w / 800 + i * (w / 11.3) + (w / 45.2) , 0.7 * h, w / 40, w / 40)
           
       }
     }
   }
}

function powerup(type, x, y) {
  this.x = x
  this.y = y
  this.r = 3 * h / 50
  this.timer = 0
  this.type = type
  this.show = function() {
    stroke(30)
    if (this.type == "hp") {
      strokeWeight(0)
      fill(255, 0, 0)
      ellipse(this.x, this.y, 3 * h / 50, 3 * h / 50)
      image(heart, this.x - h / 50, this.y - 9 * h / 500, 20 * h / 500, 20 * h / 500)
    } else if (this.type == "freeze") {
      strokeWeight(0)
      fill(165, 242, 243)
      ellipse(this.x, this.y, 3 * h / 50, 3 * h / 50)
      image(icecube, this.x - 12.5 * h / 500, this.y - 12.5 * h / 500, 25 * h / 500, 25 * h / 500)
    } else if (this.type == "bolt") {
      strokeWeight(0)
      fill(254, 191, 16)
      ellipse(this.x, this.y, 3 * h / 50, 3 * h / 50)
      image(bolt, this.x - 10 * h / 500, this.y - 10 * h / 500, 20 * h / 500, 20 * h / 500)
    }
    image(playergradient, this.x - (this.r / 2 + 0.2), this.y - (this.r / 2 + 0.2), this.r + 0.4, this.r + 0.4)
    this.timer++
  }
}

function tutorialmenu() {
  this.show = function() {
    textFont(goodfont)
    
    stroke(30)
    strokeWeight(5)
    noFill()
    rect(w / 30, w / 30, w - (2 * w / 30), h - (2 * h / 18.75), 10) 
    fill(mn.levelintrofade)
  textSize(15)
  textFont(goodfont)
  textAlign(CENTER)
    strokeWeight(0)
    fill(255)
    textAlign(LEFT)
    textSize(15)
    textFont(goodfont)
    textAlign(CENTER, CENTER)
    text("Developed by Evan Clough", w / 2, h / 4)
    text("Initial design by Marius Mazzeo", w / 2, h / 2)
    backtomenu.show()
    backtomenu.update(10)
  }
}


var tp = new Player(w / 4, 0.3 * h)
var tutorial = new tutorialmenu()
var pa = new Button("play again", w / 3 - w / 12, 2 * h / 3, w / 6, h / 10, 20, false, false)
var lvl = new Button("back to menu", 2 * w / 3- w / 12, 2 * h / 3, w / 6, h / 10, 20, false, false)
var nl = new Button("next level", w / 3 - w / 16, 2 * h / 3, w / 8, h / 10, 20, false, false)
var play = new Button("play", w / 2 - (w / 12), h / 2 - h / 20, w / 6, h / 10, 30, false, false)
var lvl2 = new Button("hardcore mode:", w / 2 - w / 16, 2 * h / 3, w / 8, h / 10, 15, false, false)
var pausemenu = new Button("", 0, 0, w / 32, w / 32, 8, false, false)
var pmp = new Button("resume", w / 4, h / 2, w / 8, h / 10, 20, false, false)
var pbm = new Button("back to menu", 5 * w / 8, h / 2, w / 8, h / 10, 15, false, false)
var ttl = new Button("credits", 0.75 * w - w / 16, 2 * h / 3, w / 8, h / 10, 20, false, false)
var backtomenu = new Button("back to menu", (w / 2) - (w / 16), 0.8 * h, w / 8, w / 16, 12, false, false)
var mutebutton = new Button("music volume: ", 53.3333 * w / 800, 2 * h / 18.75, w / 10, h / 15, 11, true, true)
var sfxmutebutton = new Button("sfx volume: ", w - ((w / 10) + (53.3333 * w / 800)), 2 * h / 18.75, w / 10, h / 15, 11, true, true)
var levelSelectorButton = new Button("select a level", w / 4 - w / 12 , 2 * h / 3, w / 6,  h / 10, 15, false, false)
var levelSelectorBTM = new Button("back to menu", w / 2 - w / 16, h / 2, w / 8, h / 10, 20, false, false) 


var levelButtons = []
for(let i = 0; i < 10; i++){
   levelButtons[i] = new Button(i + 1, 53.3333 * w / 800 + i * (w / 11.3), 2 * h / 3 - h / 15, w / 15, h / 15, 20, true)
}

var powerups = []
var poweruptypes = ["freeze", "hp", "bolt"]

var oppgoals = []

var pgoals = []
var movements = [-1, 0, 1]
var projectiles = []
var oppPs = []
var opps = []
var movements = [-1, 0, 1]
var midLine = new midL()
var rm = new restartMenu();
var levelMenu = new levelmenu()
var wm = new winMenu()
var circConst = new Circular()
var midlines = new Midlines()
var diag = new Diag(0, 0, w, h)
var portals = []
var fourline = new Fourline()
var corner = new Corner()
var fold  = new Fold()
var pivot  = new Pivot()

portals[0] = new Portal(w / 4, h / 2, w / 6, 0)
portals[1] = new Portal(3 * w / 4, h / 2, w / 6, 1)
var p = new Player((w / 2) - 50, h / 2)
