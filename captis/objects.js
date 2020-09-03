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
    // rect(w / 30, h / 18.75, w - (2 * w / 30), h - (2 * h / 18.75), 10)
    strokeWeight(0)
    fill(this.fade1)
    textSize(40)
    text('Captis', w / 4, h / 2)
    textSize(10)
    //devmode
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
    play.update(1)
    mutebutton.show()
    mutebutton.update(1)
    sfxmutebutton.show()
    sfxmutebutton.update(1)
    levelSelectorButton.show()
    levelSelectorButton.update(1)
    textSize(10)
      textSize(15)
       fill(this.fade7)         
      textAlign(CENTER, CENTER)
      textSize(11)
      textAlign(CENTER)
      fill(this.fade1)
      text("current level: " + mn.level, 3 * w / 4, h / 2 + h / 30)
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
    this.fade1 += 1 * 155 / 200
    this.fade1 = constrain(this.fade1, 0, 155)
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

var tips = []

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

var pa = new Button("play again", w / 3 - w / 12, 2 * h / 3, w / 6, h / 10, 20, false, false)
var lvl = new Button("back to menu", 2 * w / 3- w / 12, 2 * h / 3, w / 6, h / 10, 20, false, false)
var nl = new Button("next level", w / 3 - w / 16, 2 * h / 3, w / 8, h / 10, 20, false, false)
var play = new Button("play", 3 * w / 4 - w / 12, h / 4 - h / 20, w / 6, h / 10, 30, false, false)
var pausemenu = new Button("", 0, 0, w / 32, w / 32, 8, false, false)
var pmp = new Button("resume", w / 4, h / 2, w / 8, h / 10, 20, false, false)
var pbm = new Button("back to menu", 5 * w / 8, h / 2, w / 8, h / 10, 15, false, false)

var backtomenu = new Button("back to menu", (w / 2) - (w / 16), 0.8 * h, w / 8, w / 16, 12, false, false)
var mutebutton = new Button("music volume: ", 3 * w / 4 - w / 20, 7 * h / 8, w / 10, h / 20, 11, true, true)
var sfxmutebutton = new Button("sfx volume: ", 3 * w / 4 - w / 20, 7 * h / 8 + sclY(20), w / 10, h / 20, 11, true, true)
var levelSelectorButton = new Button("select a level", 3 * w / 4 - w / 12 , h / 2 - h / 20, w / 6,  h / 10, 15, false, false)
var levelSelectorBTM = new Button("back to menu", w / 2 - w / 16, h / 2, w / 8, h / 10, 20, false, false) 
var rm = new restartMenu();
var levelMenu = new levelmenu()
var wm = new winMenu()

var levelButtons = []
for(let i = 0; i < 10; i++){
   levelButtons[i] = new Button(i + 1, 53.3333 * w / 800 + i * (w / 11.3), 2 * h / 3 - h / 15, w / 15, h / 15, 20, true)
}