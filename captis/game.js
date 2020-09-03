function game() {
  switch (mn.level) {
    case 1:

      break;

    case 2:

      break;
    case 3:

      break;
    case 4:

      break;
    case 5:

      break;
    case 6:

      break;
    case 7:

      break;
    case 8:

      break;
    case 9:

      break;
    case 10:

      break;

  }



  if (p.hp <= 0) {
    reset();
    /* p.x = p.ogx
    p.y = p.ogy;
    thieves.forEach((i, idx) => {
      i.x = i.ogx;
      i.y = i.ogy;
    });
    p.hasFlag = false;
    flag.x = sclX(750);
    flag.y = sclY(50);
    p.hp = 1;
    */
    
  }



  var inStartZone = false;
  if (inStartZone && p.hasFlag) {
    reset()
    level++;
    mn.menustatus = 5;
  }
  cannons.forEach(function(i, idx) {
    i.show()
    if (frameCount % i.firerate == 0 && i.on) cannonProjectiles.push(new CannonProjectile(i.xf, i.yf, i.theta, i.type));
  });

  cannonProjectiles.forEach(function(i, idx) {
    if (i.x > w || i.x < 0 || i.y > h || i.y < 0) cannonProjectiles.splice(idx, 1);
  });
  cannonProjectiles.forEach(function(i, idx) {
    if (distance(i.x, i.y, p.x, p.y) < p.r + i.r) {
      p.hp -= i.dmg;
      p.projectileHit = frameCount;
      hitnoise.play();
      cannonProjectiles.splice(idx, 1);
    }
  });
  cells.forEach(function(i, idx) {
    i.show();
  });
  cannonProjectiles.forEach(function(i, idx) {
    i.show()
  });
  


  p.lowerconst = h - p.r;
  p.upperconst = p.r;
  p.leftconst = p.r;
  p.rightconst = w - p.r;
  thieves.forEach((j, jdx) => {

    j.lowerconst = h - j.r;
    j.upperconst = j.r;
    j.leftconst = j.r;
    j.rightconst = w - j.r;
  });
  var xWalls = []
  var yWalls = []
  walls.forEach((i, idx) => {
    if(i.active) i.show();
  });
  walls.forEach((i, idx) => {
    if (i.active) {
      if (i.type == "x") xWalls.push(i);
      if (i.type == "y") yWalls.push(i);
    }
  });
  cannonProjectiles.forEach((i, idx) => {
      xWalls.forEach((j, jdx) =>{
        if(i.x > j.x1 && i.x < j.x2 && i.y < j.y1 + 5 && i.y > j.y1 - 5){
           cannonProjectiles.splice(idx, 1); 
        }
      });
      yWalls.forEach((j, jdx) =>{
        if(i.y > j.y1 && i.y < j.y2 && i.x < j.x1 + 5 && i.x > j.x1 - 5){
           cannonProjectiles.splice(idx, 1); 
        }
      });
  });
  //constraining algo with cells
  yWalls.sort((a, b) => (a.x1 > b.x1) ? 1 : -1);
  for (let i = 0; i < yWalls.length; i++) {
    if (p.y > yWalls[i].y1 && p.y < yWalls[i].y2 && p.x < yWalls[i].x1) {
      p.rightconst = yWalls[i].x1 - p.r;
      break;
    }
  }
  thieves.forEach((j, jdx) => {
    for (let i = 0; i < yWalls.length; i++) {
      if ((j.y > yWalls[i].y1 && j.y < yWalls[i].y2) && j.x < yWalls[i].x1) {
        j.rightconst = yWalls[i].x1 - j.r;
        break;
      }
    }
  });
  yWalls.sort((a, b) => (a.x1 < b.x1) ? 1 : -1);
  for (let i = 0; i < yWalls.length; i++) {
    if (p.y > yWalls[i].y1 && p.y < yWalls[i].y2 && p.x > yWalls[i].x1) {

      p.leftconst = yWalls[i].x1 + p.r;
      break;
    }

  }
  thieves.forEach((j, jdx) => {
    for (let i = 0; i < yWalls.length; i++) {
      if ((j.y > yWalls[i].y1 && j.y < yWalls[i].y2) && j.x > yWalls[i].x1) {
        j.leftconst = yWalls[i].x1 + j.r;
        break;
      }
    }
  });
  xWalls.sort((a, b) => (a.y1 > b.y1) ? 1 : -1);
  for (let i = 0; i < xWalls.length; i++) {
    if (p.x > xWalls[i].x1 && p.x < xWalls[i].x2 && p.y < xWalls[i].y1) {
      p.lowerconst = xWalls[i].y1 - p.r;
      break;
    }
  }
  thieves.forEach((j, jdx) => {
    for (let i = 0; i < xWalls.length; i++) {
      if ((j.x > xWalls[i].x1 && j.x < xWalls[i].x2) && j.y < xWalls[i].y1) {
        j.lowerconst = xWalls[i].y1 - j.r;
        break;
      }
    }
  });
  xWalls.sort((a, b) => (a.y1 < b.y1) ? 1 : -1);
  for (let i = 0; i < xWalls.length; i++) {
    if (p.x > xWalls[i].x1 && p.x < xWalls[i].x2 && p.y > xWalls[i].y1) {
      p.upperconst = xWalls[i].y1 + p.r;
      break;
    }
  }
  thieves.forEach((j, jdx) => {
    for (let i = 0; i < xWalls.length; i++) {
      if ((j.x > xWalls[i].x1 && j.x < xWalls[i].x2) && j.y > xWalls[i].y1) {
        j.upperconst = xWalls[i].y1 + j.r;
        break;
      }
    }
  });

  if (distance(flag.x, flag.y, p.x, p.y) < p.r + flag.r) {
    p.hasFlag = true;
  }
  thieves.forEach((i, idx) => {
    i.show();
    i.update();
    
  });

  thieves.forEach((i, idx) => {
    if (distance(p.x, p.y, i.x, i.y) < p.r + i.r) {
      reset();

    }
    
  });
  if (p.hasFlag) {
    if (p.x < sclX(25) & p.y > sclY(475)) {
      reset();
      mn.unlockedLevels[mn.level] = true;
      mn.level++;

      beatloop.stop();
      mn.menustatus = 4;
    }
    upperLeftLowerWall.active = false;
    upperLeftRightWall.active = false;
    lowerRightLeftWall.active = false;
    lowerRightUpperWall.active = false;
    thieves.forEach((i, idx) => {
      if (frameCount % 1 == 0 && frameCount > i.burstFC + 20) {
        i.xspeed = cos(angleMaker(i.x, i.y, p.x, p.y));
        i.yspeed = sin(angleMaker(i.x, i.y, p.x, p.y));
      }
    });
    
  } else {
    upperLeftLowerWall.active = true;
    upperLeftRightWall.active = true;
    lowerRightLeftWall.active = true;
    lowerRightUpperWall.active = true;
    const movements = [0, -1, 1]
    thieves.forEach((i, idx) => {
      if (frameCount % 10 == 0) {
        i.xspeed = movements[floor(3 * random())];
        i.yspeed = movements[floor(3 * random())];
      }
    });
  }

  p.isSlowed = false;
  slowzones.forEach((i, idx) => {
    i.show();
    if (i.bool) {
      p.isSlowed = true
    }
  })
  
  speedboosts.forEach((i, idx) => {
    i.show()

  });
  speedboosts.forEach((i, idx) => {
    if (distance(p.x, p.y, i.x, i.y) < p.r + i.r) {
      speedboosts.splice(idx, 1);
      p.speedfc = frameCount;
    }

  });
  portals.forEach((i, idx) => {
    i.show();
    i.update();
  });
  
  fill(100, 255, 100);
  strokeWeight(0);
  rect(-1, sclY(475), sclY(25), sclY(26)); 
  
  triangleSlowzones.forEach((i, idx) =>{
     i.show()
    if(i.inSlowzone){
       p.isSlowed = true 
    }
});
  p.show();
  p.update();
  flag.show();
  flag.update();
}


