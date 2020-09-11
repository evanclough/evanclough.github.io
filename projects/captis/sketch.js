var buttonclick;
var hitnoise;
var beatloop;
var goodfont;
var menuloop;
var bolt;
var deathnoise;
var powerupnoise;
var backgroundgradient;
var lock;
var playergradient;
var opponentgradient;
var flagimage;
var portalgradient;
var yellowcirculargradient;
var greencirculargradient;
var circlegradient;
var slowzonegradient;

function preload() {
  powerupnoise = loadSound("captismediafiles/powerupnoise.mp3")
  deathnoise = loadSound("captismediafiles/playerdeathnoise.mp3")
  buttonclick = loadSound("captismediafiles/buttonclick.mp3")
  hitnoise = loadSound("captismediafiles/hitnoise.mp3")
  beatloop = loadSound("captismediafiles/beatloop.mp3")
  menuloop = loadSound("captismediafiles/menuloop.mp3")
  goodfont = loadFont('captismediafiles/RussoOne-Regular.ttf')
  bolt = loadImage("captismediafiles/bolt.svg")
  backgroundgradient = loadImage("captismediafiles/backgroundgradient.jpg")
  lock = loadImage("captismediafiles/lock.png")
  playergradient = loadImage("captismediafiles/playergradient.png")
  opponentgradient = loadImage("captismediafiles/opponentgradient.png")
  flagimage = loadImage("captismediafiles/flag.png");
  portalgradient = loadImage("captismediafiles/portalgradient.png");
  yellowcirculargradient = loadImage("captismediafiles/yellowcirculargradient.png");
  greencirculargradient = loadImage("captismediafiles/greencirclegradient.png");
  circlegradient=  loadImage("captismediafiles/circlegradient.png");
  slowzonegradient = loadImage("captismediafiles/slowzonegradient.png");
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
    buttonclick.setVolume(0)
  }else{
      powerupnoise.setVolume(1)
     deathnoise.setVolume(1)
    hitnoise.setVolume(1)
    buttonclick.setVolume(1)
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
      case 32:
        cells.forEach((i, idx) =>{
            if(i.bottomLeftBool || i.outerTopRightBool){
               i.cellStatus = "LL"; 
              
            }
          if(i.bottomRightBool || i.outerTopLeftBool){
               i.cellStatus = "LR";   
            }
          if(i.topRightBool || i.outerBottomLeftBool){
               i.cellStatus = "UR";   
            }
          if(i.topLeftBool || i.outerBottomRightBool){
               i.cellStatus = "UL";   
            }
        });
      if(mn.level == 8){
         if((p.x > 25 && p.x < 75 && p.y > 125 && p.y < 175) || (p.x > 625 && p.x < 675 && p.y > 425 && p.y < 475)){
          lvl8_1.active = false
          lvl8_2.active = false
      } else if(mn.level == 10){
        if((p.x > 125 && p.x < 175 && p.y > 25 && p.y <75) || (p.x > 725 && p.x < 775 && p.y > 325 && p.y < 375)){
            lvl8_1.active = false
          lvl8_2.active = false
        }
      }
      }
      break;
  }
  if (mn.menustatus === 1) {
    if (keyCode == 27) {
      mn.menustatus = 5
      beatloop.stop()
    }
  }
  //dev mode
  if (mn.menustatus === 0) {
    for (var i = 49; i < 58; i++) {
      if (keyCode === i) {
        mn.level = i - 48
        mn.devmode = true
      }
    }
  }
  if(mn.menustatus === 0){
     if(keyCode === 48){
        mn.level = 10 
     }
  }
  //end dev mode
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

function reset(){

  for(let i = walls.length - 1; i >= 0 ; i--){
          if(walls[i].partOfCell){
             walls.splice(i, 1); 
          }
      }      
         p.x = sclX(50);
         p.y = sclY(450);
      p.ogx = sclX(50);
         p.ogy = sclY(450);
         p.hp = 1;
         p.hasFlag = false;
         p.upperconst = 0; p.lowerconst = h; p.leftconst = 0; p.rightconst = w;
         flag.x =sclX(750);
         flag.y = sclY(50);
  portals = [];
  cannons=  []; 
  slowzones = [];
  switch(mn.level){
    case 1:
      
         thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
          walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
          walls[3] = lowerRightUpperWall;
    
       break;
       
      
       case 2:
       thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
      walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
          walls[3] = lowerRightUpperWall;
      walls[4] = new Wall(600, 30, 600, 200, "y");
      walls[5] = new Wall(600, 200, 770, 200, "x"); 
      walls[6] = new Wall(30, 400, 100, 400, "x");
      walls[7] = new Wall(100, 400, 100, 470, "y");
       break;
       case 3:
       thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
      walls = []
      walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
          walls[3] = lowerRightUpperWall;
      cannons[0] = new Cannon(500, 50, "highdmg");
      cannons[1] = new Cannon(750, 300, "highdmg");
       break;
       case 4:
       thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
      walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
          walls[3] = lowerRightUpperWall;
      cannons = []
       cannons[0] = new Cannon(650, 150, "highdmg");
      
      walls[4] = new Wall(500, 100, 650, 100, "x");
      walls[5] = new Wall(700, 150, 700, 300, "y");
       break;
       case 5:
           thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
      thieves[2] = new Thief(50, 50, "burst");
      thieves[3] = new Thief(750, 450, "burst");
          walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
           walls[3] = lowerRightUpperWall;
          cannons = []
       cannons[0] = new Cannon(300, 250, "highdmg");
      cannons[1] = new Cannon(400, 250, "highdmg");
      cannons[2] = new Cannon(500, 250, "highdmg");
      walls[4] = new Wall(100, 400, 600, 400, "x");
      walls[5] = new Wall(100, 200, 100, 400, "y");
       break;
       case 6:
       thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
      thieves[2] = new Thief(50, 50, "burst");
      thieves[3] = new Thief(750, 450, "burst");
          walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
           walls[3] = lowerRightUpperWall;
          cannons = []
       cannons[0] = new Cannon(300, 250, "highdmg");
      cannons[1] = new Cannon(400, 250, "highdmg");
      cannons[2] = new Cannon(500, 250, "highdmg");
      walls[4] = new Wall(100, 400, 600, 400, "x");
      walls[5] = new Wall(100, 200, 100, 400, "y");
      walls[6] = new Wall(200, 100, 700, 100, "x");
      walls[7] = new Wall(700, 100, 700, 300, "y");
      slowzones[0] = new slowzone(725, 150, 50, 100);
      slowzones[1] = new slowzone(550, 25, 100, 50);
       break;
       case 7:
         thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
      thieves[2] = new Thief(50, 50, "burst");
      thieves[3] = new Thief(750, 450, "burst");
          walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
           walls[3] = lowerRightUpperWall;
          cannons = []
       cannons[0] = new Cannon(50, 150, "highdmg");
      cannons[1] = new Cannon(350, 451, "highdmg");
      cannons[2] = new Cannon(400, 250, "highdmg");
      walls[4] = new Wall(150, 400, 650, 400, "x");
      walls[5] = new Wall(100, 150, 100, 350, "y");
      walls[6] = new Wall(150, 100, 650, 100, "x");
      walls[7] = new Wall(700, 150, 700, 350, "y");
      walls[8] = new Wall(25, 425, 75, 425, "x");
      walls[9] = new Wall(75, 425, 75, 475, "y");
      slowzones[0] = new slowzone(725, 150, 50, 100);
      slowzones[1] = new slowzone(550, 25, 100, 50);
      slowzones[2] = new slowzone(150, 425, 150, 50);
      slowzones[3] = new slowzone(25, 200, 50, 150);
      slowzones[4] = new slowzone(150, 150, 500, 200);
      portals[0] = new Portal(50, 250, 700, 50);
      portals[1] = new Portal(250, 450, 750, 100);
      portals[2] = new Portal(500, 50, 50, 400);
      portals[3] = new Portal(750, 300, 100, 450);
       break;
       case 8:
         thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
      thieves[2] = new Thief(50, 50, "burst");
      thieves[3] = new Thief(750, 450, "burst");
          walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
           walls[3] = lowerRightUpperWall;
          cannons = []
      cannons[0] = new Cannon(400, 250, "highdmg");
      cannons[1] = new Cannon(250, 450, "highdmg");
      cannons[2] = new Cannon(50, 250, "good");
      cannons[3] = new Cannon(300, 250, "highdmg");
      cannons[4] = new Cannon(500, 250, "highdmg");
      cannons[5] = new Cannon(50, 300, "good");
      cannons[6] = new Cannon(500, 450, "highdmg");
      walls[4] = new Wall(150, 400, 700, 400, "x");
      walls[5] = new Wall(100, 100, 100, 350, "y");
      walls[6] = new Wall(100, 100, 650, 100, "x");
      walls[7] = new Wall(700, 150, 700, 400, "y");
      walls[8] = new Wall(25, 425, 75, 425, "x");
      walls[9] = new Wall(75, 425, 75, 475, "y");
      walls[10] = lvl8_1;
      walls[11] = lvl8_2;
      slowzones[0] = new slowzone(725, 150, 50, 100);
      slowzones[1] = new slowzone(550, 25, 100, 50);
      slowzones[2] = new slowzone(150, 425, 450, 50);
      slowzones[3] = new slowzone(25, 200, 50, 150);
      slowzones[4] = new slowzone(150, 150, 500, 200);
       break;
       case 9:
         thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
      thieves[2] = new Thief(50, 50, "burst");
      thieves[3] = new Thief(750, 450, "burst");
          walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
           walls[3] = lowerRightUpperWall;
      
          cannons = []
      cannons[0] = new Cannon(250, 450, "highdmg");
      cannons[1] = new Cannon(50, 250, "good");
      cannons[2] = new Cannon(50, 300, "good");
      cannons[3] = new Cannon(500, 450, "highdmg");
      cannons[4] = new Cannon(750, 200, "good");
      cannons[5] = new Cannon(750, 300, "good");
      cannons[6] = new Cannon(250, 50, "highdmg");
      cannons[7] = new Cannon(500, 50, "highdmg");
      walls[4] = new Wall(100, 400, 700, 400, "x");
      walls[5] = new Wall(100, 100, 100, 400, "y");
      walls[6] = new Wall(100, 100, 700, 100, "x");
      walls[7] = new Wall(700, 100, 700, 400, "y");
      walls[8] = new Wall(25, 425, 75, 425, "x");
      walls[9] = new Wall(75, 425, 75, 475, "y");
      slowzones[0] = new slowzone(725, 150, 50, 200);
      slowzones[1] = new slowzone(150, 25, 450, 50);
      slowzones[2] = new slowzone(150, 425, 450, 50);
      slowzones[3] = new slowzone(25, 200, 50, 150);
      portals[0] = new Portal(650, 450, 750, 100);
      portals[1] = new Portal(50, 150, 700, 50);
      portals[2] = new Portal(125, 50, 50, 400);
      portals[3] = new Portal(750, 375, 100, 450);
       break;
       case 10:
        thieves[0] = new Thief(sclX(50), sclY(50), "speeder");
          thieves[1] = new Thief(sclX(750), sclY(450), "speeder");
      thieves[2] = new Thief(50, 50, "burst");
      thieves[3] = new Thief(750, 450, "burst");
      thieves[4] = new Thief(50, 50, "burst");
      thieves[5] = new Thief(750, 450, "burst");
          walls[0] = upperLeftLowerWall;
          walls[1] = upperLeftRightWall;
          walls[2] = lowerRightLeftWall;
           walls[3] = lowerRightUpperWall;
          cannons = []
      cannons[0] = new Cannon(400, 250, "highdmg");
      cannons[1] = new Cannon(250, 450, "highdmg");
      cannons[2] = new Cannon(50, 250, "good");
      cannons[3] = new Cannon(300, 250, "highdmg");
      cannons[4] = new Cannon(500, 250, "highdmg");
      cannons[5] = new Cannon(50, 300, "good");
      cannons[6] = new Cannon(500, 450, "highdmg");
      cannons[7] = new Cannon(600, 50, "good");
      cannons[8] = new Cannon(750, 200, "good");
      walls[4] = new Wall(150, 400, 700, 400, "x");
      walls[5] = new Wall(100, 100, 100, 350, "y");
      walls[6] = new Wall(100, 100, 650, 100, "x");
      walls[7] = new Wall(700, 150, 700, 400, "y");
      walls[8] = new Wall(25, 425, 75, 425, "x");
      walls[9] = new Wall(75, 425, 75, 475, "y");
      walls[10] = lvl8_1;
      walls[11] = lvl8_2;
      slowzones[0] = new slowzone(725, 150, 50, 100);
      slowzones[1] = new slowzone(550, 25, 100, 50);
      slowzones[2] = new slowzone(150, 425, 450, 50);
      slowzones[3] = new slowzone(25, 200, 50, 150);
      slowzones[4] = new slowzone(150, 150, 500, 200);
      portals[0] = new Portal(650, 450, 750, 100);
      portals[1] = new Portal(50, 150, 700, 50);
       break;
       
  }
  thieves.forEach((i, idx) => {
       i.x = i.ogx;
       i.y = i.ogy;
  });
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
      for(var i = 0; i < colors.length; i++){
          if(colorButtons[i].mouseIsOn){
              p.skin = colors[i];
              buttonclick.play();
          }
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