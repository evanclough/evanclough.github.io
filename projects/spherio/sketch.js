var buttonclick;
var hitnoise;
var beatloop;
var goalhitnoise;
var goodfont;
var heart;
var icecube;
var menuloop;
var bolt;

var deathnoise
var powerupnoise
var opponentdeathnoise
var backgroundgradient
var lock
var playergradient
var opponentgradient

function preload() {
  opponentdeathnoise = loadSound("spheriomediafiles/opponentdeathnoise.mp3")
  powerupnoise = loadSound("spheriomediafiles/powerupnoise.mp3")
  deathnoise = loadSound("spheriomediafiles/playerdeathnoise.mp3")
  buttonclick = loadSound("spheriomediafiles/buttonclick.mp3")
  hitnoise = loadSound("spheriomediafiles/hitnoise.mp3")
  beatloop = loadSound("spheriomediafiles/beatloop.mp3")
  menuloop = loadSound("spheriomediafiles/menuloop.mp3")
  goalhitnoise = loadSound("spheriomediafiles/goalhitnoise.mp3")
  goodfont = loadFont('spheriomediafiles/Monda-Regular.ttf')
  heart = loadImage("spheriomediafiles/heart.png")
  icecube = loadImage("spheriomediafiles/iceblock.png")
  bolt = loadImage("spheriomediafiles/bolt.svg")
  backgroundgradient = loadImage("spheriomediafiles/backgroundgradient.jpg")
  lock = loadImage("spheriomediafiles/lock.png")
  playergradient = loadImage("spheriomediafiles/playergradient.png")
  opponentgradient = loadImage("spheriomediafiles/opponentgradient.png")
}




function setup() {
  createCanvas(w, h)

}

function draw() {
  image(backgroundgradient, 0, 0, w, h)
  
  if(mn.mutedstatus === "off"){
     menuloop.setVolume(0) 
    beatloop.setVolume(0)
  }
  if(mn.sfxmutedstatus === "off"){
     powerupnoise.setVolume(0)
     deathnoise.setVolume(0)
    hitnoise.setVolume(0)
    goalhitnoise.setVolume(0)
    buttonclick.setVolume(0)
    opponentdeathnoise.setVolume(0)
  }else{
      powerupnoise.setVolume(1)
     deathnoise.setVolume(1)
    hitnoise.setVolume(1)
    goalhitnoise.setVolume(1)
    buttonclick.setVolume(1)
     opponentdeathnoise.setVolume(1)
  }
  switch (mn.menustatus) {
    case -1:
      fill(255)
      textAlign(CENTER)
      textSize(25 * w / 800)
      textFont(goodfont)
      text("click anywhere to start", w / 2, h / 2)
      break;
    case 0:
      mn.show()
      mn.update()
      mn.fc = frameCount
      if (frameCount === mn.fc6 + 1 && frameCount != 1) {
        mn.fc5 = frameCount
      }
      if(mn.mutedstatus === "on"){
        if (frameCount < mn.fc6 + 120) {
          menuloop.setVolume((frameCount - mn.fc6) / 120)
        } else {
          menuloop.setVolume(1)
        }
      }
      break;
    case 1:
      deathnoise.setVolume(0.5)
      if (mn.level < 11) {
        game();
        fill(0)
        if(mn.mutedstatus === "on"){
        if (frameCount < mn.fc2 + 60) {
          beatloop.setVolume((frameCount - mn.fc2) / 60)
        } else {
          beatloop.setVolume(1)
        }
        }
      } else {
        image(backgroundgradient, 0, 0, w, h)
        textSize(15)
        textFont(goodfont)
        fill(255)
        text("Good job, I guess. If you want a real challenge, feel free to go play hardcore.", w / 2, h / 3)
        backtomenu.show()
        backtomenu.update(10)
      }
      break;
    case 2:
      strokeWeight(5)
      stroke(15)
      fill(0)
      rect(w / 30, w / 30, w - (2 * w / 30), h - (2 * h / 18.75), 10)
      rm.show()
      break;
    case 3:
      levelmenu.show()
      break;
    case 4:
      strokeWeight(5)
      stroke(15)
      fill(0)
      rect(w / 30, w / 30, w - (2 * w / 30), h - (2 * h / 18.75), 10)
      wm.show()
      break;
    case 5:
      strokeWeight(5)
      stroke(15)
      noFill()
      rect(w / 30, w / 30, w - (2 * w / 30), h - (2 * h / 18.75), 10)
      pmp.show()
      pmp.update(10)
      pbm.show()
      pbm.update(10)
      mutebutton.show()
      mutebutton.update(10)
      sfxmutebutton.show()
      sfxmutebutton.update(10)
      if(mn.muted % 2 === 0){
       mn.mutedstatus = "on" 
    }else {
     mn.mutedstatus = "off" 
    }
      if(mn.sfxmuted % 2 === 0){
       mn.sfxmutedstatus = "on" 
    }else {
     mn.sfxmutedstatus = "off" 
    }
      textAlign(CENTER, CENTER)
    textSize(11)
    
    if(mutebutton.mouseIsOn ){
       fill(255) 
    }else {
        fill(200)
    }
    text(mn.mutedstatus, mutebutton.right + mutebutton.sx / 10, mutebutton.upper +  mutebutton.sy / 3)
   
    if(sfxmutebutton.mouseIsOn){
       fill(255) 
    }else {
        fill(200)
    }
      text(mn.sfxmutedstatus, sfxmutebutton.right, sfxmutebutton.upper +  sfxmutebutton.sy / 3)
      break;
    case 6:
      
      tutorial.show()
      break;
    case 7:
      levelMenu.show()    
    break;

  }
  switch (mn.level) {
    case 1:
      mn.oppAmmo = 200
      mn.gamemode = "og"
      mn.poweruprate = 600
      break;
    case 2:
      mn.gamemode = "corner"
      mn.oppAmmo = 200
      mn.poweruprate = 600
      break;
    case 5:
      mn.gamemode = "pivot"
      mn.oppAmmo = 200
      mn.poweruprate = 500
      break;
    case 6:
      mn.gamemode = "twoside"
      mn.oppAmmo = 80
      mn.poweruprate = 300
      break;
    case 4:
      mn.gamemode = "ffa"
      mn.oppAmmo = 200
      mn.poweruprate = 600
      break;
    case 10:
      mn.gamemode = "claus"
      mn.oppAmmo = 100
      mn.poweruprate = 250
      break;
    case 3:
      mn.gamemode = "diag"
      mn.oppAmmo = 250
      mn.poweruprate = 600
      break;
    case 9:
      mn.gamemode = "fourline"
      mn.oppAmmo = 100
      mn.poweruprate = 300
      break;
    case 7:
      mn.gamemode = "portal"
      mn.oppAmmo = 100
      mn.poweruprate = 300
      break;
    case 8:
      mn.gamemode = "fold"
      mn.oppAmmo = 100
      mn.poweruprate = 400
      break;
  }
}

function keyPressed() {
  switch (key) {
    case 'a': case 'A':
      p.xspeed = -1 * p.speed
      break;
    case 's': case 'S':
      p.yspeed = 1 * p.speed
      break;
    case 'd': case 'D':
      p.xspeed = 1 * p.speed
      break;
    case 'w': case 'W':
      p.yspeed = -1 * p.speed
      break;
  }
  switch(keyCode) {
    case 37:
      p.xspeed = -1 * p.speed
    break;
    case 40:
      p.yspeed = 1 * p.speed
      break;
      case 39:
      p.xspeed = 1 * p.speed
      break;
      case 38:
      p.yspeed = -1 * p.speed
      break
  }
  if (mn.menustatus === 1) {
    if (keyCode == 27) {
      mn.menustatus = 5
      beatloop.stop()
    }
  }
}

function keyReleased() {
  if (key == 'a' && p.xspeed < 0) {
    p.xspeed = 0
  } else if (key == 's' && p.yspeed > 0) {
    p.yspeed = 0;
  } else if (key == 'd' && p.xspeed > 0) {
    p.xspeed = 0
  } else if (key == 'w' && p.yspeed < 0) {
    p.yspeed = 0
  }
  if (key == 'A' && p.xspeed < 0) {
    p.xspeed = 0
  } else if (key == 'S' && p.yspeed > 0) {
    p.yspeed = 0;
  } else if (key == 'D' && p.xspeed > 0) {
    p.xspeed = 0
  } else if (key == 'W' && p.yspeed < 0) {
    p.yspeed = 0
  }
  if (keyCode == 37 && p.xspeed < 0) {
    p.xspeed = 0
  } else if (keyCode == 40 && p.yspeed > 0) {
    p.yspeed = 0;
  } else if (keyCode == 39 && p.xspeed > 0) {
    p.xspeed = 0
  } else if (keyCode == 38 && p.yspeed < 0) {
    p.yspeed = 0
  }
}



var reset = function() {
  mn.levelintros[mn.level - 1] = frameCount
  mn.levelintrofade = 0
  mn.tip = tips[Math.floor(Math.random() * tips.length)]
  for(var i = 0; i < oppgoals.length; i++){
    p.pointsarr[i] = 0
    mn.oppPointsArr[i] = 0
  }
  p.hp = 50
  projectiles = []
  oppPs = []
  powerups = []
  mn.oppPoints = 0
  p.points = 0
  p.points1 = 0
  p.points2 = 0
  mn.oppPoints1 = 0
  mn.oppPoints2 = 0
  
  switch (mn.level) {
    case 1:
      p.x = w / 4
      p.y = h / 2
      p.ix = w / 4
      p.iy = h / 2
      opps = []
      opps[0] = new Opponent(3 * w / 4, h / 2)
      break;
    case 2:
      p.x = w / 4
      p.y = h / 4
      p.ix = w / 4
      p.iy = h / 4
      opps = []
      opps[0] = new Opponent(3 * w / 4, 3 * h / 4)
      
      break;
    case 5:
      p.x = w / 4
      p.y = h / 2
      p.ix = w / 4
      p.iy = h / 2
      opps = []
      opps[0] = new Opponent(3 * w / 4, 0.75 * h)
      opps[1] = new Opponent(3 * w / 4, 0.25 * h)     
      break;
    case 6:
      p.x = w / 2
      p.y = h / 2
      p.ix = w / 2
      p.iy = h / 2
      opps = []
      opps[0] = new Opponent(w / 4, h / 3)
      opps[1] = new Opponent(3 * w / 4, h / 3)      
      break;
    case 4:
      p.x = w / 2
      p.y = h / 2 - 35
      p.ix = w / 2
      p.iy = h / 2 - 35
      opps = []
      opps[0] = new Opponent(w / 4, h / 2)
      opps[1] = new Opponent(3 * w / 4, h / 2)
      break;
    case 10:
      p.x = w / 2
      p.y = h / 2 - 35
      p.ix = w / 2
      p.iy = h / 2 - 35
      opps = []
      opps[0] = new Opponent(w / 4, h / 4)
      opps[1] = new Opponent(3 * w / 4, 3 * h / 4)
      opps[2] = new Opponent(w / 4, 3 * h / 4)
      opps[3] = new Opponent(3 * w / 4,  h / 4)
      break;
    case 3:
      p.x = w / 4
      p.y = 3 * h / 4
      p.ix = w / 4
      p.iy = 3 * h / 4
      opps = []
      opps[0] = new Opponent(10 * w / 12, h / 10)
      opps[1] = new Opponent(11 * w / 12, h / 5)
      break;
    case 9:
      p.x = w / 16
      p.y = h / 10
      p.ix = w / 16
      p.iy = h / 10
      opps = []
      opps[0] = new Opponent(w / 4, h / 2)
      opps[1] = new Opponent(w / 2, h / 2)
      opps[2] = new Opponent(0.75 * w, h / 2)
      
      break;
    case 7:
      p.x = w / 4
      p.y = h / 2
      p.ix = w / 4
      p.iy = h / 2
      opps = []
      opps[0] = new Opponent(w / 2, h / 3)
      opps[1] = new Opponent(w / 6, 4 * h / 5)
      opps[2] = new Opponent(5 * w / 6, 4 * h / 5)
      break;
    case 8:
      p.x = w / 2
      p.y = 2 * h / 3
      p.ix = w / 2
      p.iy = 2 * h / 3
      opps = []
      opps[0] = new Opponent(w / 2,  h / 3)
      opps[1] = new Opponent(w / 4, h / 3)
      opps[2] = new Opponent(0.75 * w, h / 3)
      
      break;
  }
}

function mouseClicked() {
  switch (mn.menustatus) {
    case 0:
      if (play.mouseIsOn) {
        reset()
        mn.menustatus = 1
        buttonclick.play()
        beatloop.loop()
        menuloop.stop()
        mn.fc2 = frameCount
      } else if (lvl2.mouseIsOn) {
        mn.hardcoremode++
        buttonclick.play()
      } else if (ttl.mouseIsOn) {
        mn.menustatus = 6
        buttonclick.play()
        
      }else if(mutebutton.mouseIsOn) {
         mn.muted++
         buttonclick.play()
      }else if(sfxmutebutton.mouseIsOn){
         mn.sfxmuted++
         buttonclick.play()
      }else if(levelSelectorButton.mouseIsOn){
         mn.menustatus = 7 
        buttonclick.play()
      }
      break;
    case 1:
      projectiles.push(new Projectile(p.x, p.y))
      if (pausemenu.mouseIsOn && frameCount > mn.levelintros[0] + 180) {
        mn.menustatus = 5
        beatloop.stop()
        console.log(1)
      }
      if (mn.level > 10) {
        if (backtomenu.mouseIsOn) {
          mn.menustatus = 0
          mn.level = 1
          beatloop.stop()
          buttonclick.play()
          menuloop.loop()
          mn.fc5 = frameCount
      mn.fc6 = frameCount
          
        }
      }
      break;
    case 2:
      if (pa.mouseIsOn) {
        reset()
        mn.menustatus = 1;
        beatloop.loop()
        mn.fc2 = frameCount
        buttonclick.play()
        mn.levelattempted[mn.level - 1] = true

      }
      if (lvl.mouseIsOn) {
        reset()
        mn.menustatus = 0
        menuloop.loop()
        mn.fc5 = frameCount
      mn.fc6 = frameCount
        
        buttonclick.play()
      }
      break;
    case 3:
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].mouseIsOn) {
          mn.level = i + 1
          buttonclick.play()
          if (mn.ingamestatus === false) {
            mn.menustatus = 0
          } else {
            mn.menustatus = 1
          }
        }
      }
      break;
    case 4:
      if (mouseX > nl.left && mouseX < nl.right && mouseY > pa.upper && mouseY < pa.lower) {
        reset()
        buttonclick.play()
        beatloop.loop()
        mn.fc2 = frameCount
        mn.menustatus = 1
        menuloop.stop()
      }
      if (lvl.mouseIsOn) {
        mn.menustatus = 0
        buttonclick.play()
        mn.fc5 = frameCount
      mn.fc6 = frameCount
        
      }
      break;
    case 5:
      if (pmp.mouseIsOn) {
        mn.menustatus = 1
        beatloop.loop()
        mn.fc2 = frameCount

      } else if (pbm.mouseIsOn) {
        mn.menustatus = 0
        reset()
        menuloop.loop()
        mn.fc5 = frameCount
      mn.fc6 = frameCount
        
      }else if(mutebutton.mouseIsOn){
        mn.muted++
        buttonclick.play()
      }else if(sfxmutebutton.mouseIsOn){
        
         mn.sfxmuted++
         buttonclick.play()
      }
      break;
    case 6:
      if (backtomenu.mouseIsOn) {
        mn.menustatus = 0
        buttonclick.play()
        
        mn.fc5 = frameCount
     
        
      }
      break;
    case -1:
      mn.menustatus = 0
      menuloop.loop()
      mn.fc6 = frameCount
      break;
      
    case 7:
      for(let i = 0; i < mn.unlockedLevels.length; i++){
         if(levelButtons[i].mouseIsOn && mn.unlockedLevels[i]){
             mn.level = i + 1
           mn.menustatus = 0
           buttonclick.play()
           
         }
      }
      if(levelSelectorBTM.mouseIsOn){
         mn.menustatus = 0
        buttonclick.play()
      }
      break;
  }
}
