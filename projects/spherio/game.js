function game() {
    function frameRect(){
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
    }
    mn.levelintrofade = constrain(mn.levelintrofade, 0, 255)
    mn.levelintrofade += 5
    fill(mn.levelintrofade)
    textSize(15)
    textFont(goodfont)
    textAlign(CENTER)
    for (var i = 0; i < mn.levelintros.length; i++) {
      if (frameCount < mn.levelintros[i] + 200) {
        oppPs = []
      }
    }
    if (frameCount < mn.levelintros[0] + 180 && mn.levelattempted[0] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("Alright, first level. This should be easy.", w / 2, h / 3)
      
      projectiles = []
    } else if (frameCount < mn.levelintros[1] + 180 && mn.levelattempted[1] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("Good job. Let's spice things up a bit.", w / 2, h / 3)
      projectiles = []
    } else if (frameCount < mn.levelintros[2] + 180 && mn.levelattempted[2] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("Now that you're getting a hang of it, let's throw another enemy in there.", w / 2, h / 3)
      projectiles = []
    } else if (frameCount < mn.levelintros[3] + 180 && mn.levelattempted[3] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("Let's switch things up a bit here. Free for all.", w / 2, h / 3)
      projectiles = []
    } else if (frameCount < mn.levelintros[4] + 180 && mn.levelattempted[4] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("Be careful this round. You might get swept away...", w / 2, h / 3)
      projectiles = []
    } else if (frameCount < mn.levelintros[5] + 180 && mn.levelattempted[5] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("Are you afraid of Santa Claus?", w / 2, h / 3)
      projectiles = []
    } else if (frameCount < mn.levelintros[6] + 180 && mn.levelattempted[6] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("Portals.", w / 2, h / 3)
      projectiles = []
    } else if (frameCount < mn.levelintros[7] + 180 && mn.levelattempted[7] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("One more enemy this time.", w / 2, h / 3)
      projectiles = []
    } else if (frameCount < mn.levelintros[8] + 180 && mn.levelattempted[8] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("More portals.", w / 2, h / 3)
      projectiles = []
    } else if (frameCount < mn.levelintros[9] + 180 && mn.levelattempted[9] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("Alright, final level.", w / 2, h / 3)
      projectiles = []
    } else if (frameCount < mn.levelintros[10] + 180 && mn.levelattempted[10] != true && mn.hardcorestatus === "off"&& !mn.devmode) {
      frameRect()
      text("<leveltext>", w / 2, h / 3)
      projectiles = []
    } else {
      mn.ingamestatus = true
      var startingColorBool = frameCount < p.upd + 5
      if(!startingColorBool){
      p.color = 0
      }
      for (var i = 0; i < opps.length; i++) {
        if (mn.gamemode === "og") {
          opps[i].lowerconst = h - p.r
          opps[i].upperconst = p.r
          opps[i].rightconst = w - p.r
          opps[i].leftconst = midLine.x + p.r
        } else if (mn.gamemode === "twoside") {
          opps[i].lowerconst = h - p.r
          opps[i].upperconst = p.r
          if (opps[i].orient == "left") {
            opps[i].rightconst = midlines.x1 - p.r
            opps[i].leftconst = p.r
          } else if (opps[i].orient == "right") {
            opps[i].rightconst = w - p.r
            opps[i].leftconst = midlines.x2 + p.r
          }
        } else if (mn.gamemode === "claus") {
          if (opps[i].x < circConst.x + (circConst.r + p.r) && opps[i].x > circConst.x - (circConst.r + p.r)) {
            if (opps[i].y > circConst.y) {
              opps[i].lowerconst = h - p.r
            } else {
              opps[i].lowerconst = circConst.y + -1 * Math.abs((circConst.r + p.r) * Math.sin(Math.acos(Math.abs(opps[i].x - circConst.x) / (circConst.r + p.r))))
            }
          } else {
            opps[i].lowerconst = h - p.r
          }
          if (opps[i].x < circConst.x + (circConst.r + p.r) && opps[i].x > circConst.x - (circConst.r + p.r)) {
            if (opps[i].y < circConst.y) {
              opps[i].upperconst = p.r
            } else {
              opps[i].upperconst = circConst.y + Math.abs((circConst.r + p.r) * Math.sin(Math.acos(Math.abs(opps[i].x - circConst.x) / (circConst.r + p.r))))
            }
          } else {
            opps[i].upperconst = p.r
          }
          if (opps[i].y < circConst.y + (circConst.r + p.r) && opps[i].y > circConst.y - (circConst.r + p.r)) {
            if (opps[i].x > circConst.x) {
              opps[i].rightconst = w - p.r
            } else {
              opps[i].rightconst = circConst.x + -1 * Math.abs((circConst.r + p.r) * Math.cos(Math.asin(Math.abs(opps[i].y - circConst.y) / (circConst.r + p.r))))
            }
          } else {
            opps[i].rightconst = w - p.r
          }
          if (opps[i].y < circConst.y + (circConst.r + p.r) && opps[i].y > circConst.y - (circConst.r + p.r)) {
            if (opps[i].x < circConst.x) {
              opps[i].leftconst = p.r
            } else {
              opps[i].leftconst = circConst.x + Math.abs((circConst.r + p.r) * Math.cos(Math.asin(Math.abs(opps[i].y - circConst.y) / (circConst.r + p.r))))
            }
          } else {
            opps[i].leftconst = p.r
          }
        } else if (mn.gamemode === "diag") {
          opps[i].upperconst = (opps[i].r / 2)
          opps[i].rightconst = w - (opps[i].r / 2)
          if (opps[i].x - diag.x2 > 0) {
            opps[i].lowerconst = h - (opps[i].r / 2)
          } else {
            opps[i].lowerconst = (((opps[i].x - diag.x1) * (h / w)) - (opps[i].r / 2))
          }
          opps[i].plc = ((w - opps[i].x) - (opps[i].y - (((opps[i].x - diag.x1) * (h / w)) - (opps[i].r / 2))) / (h / w)) - (opps[i].r / 2)
          if (opps[i].plc > 0) {
            opps[i].leftconst = opps[i].plc
          } else {
            opps[i].leftconst = opps[i].r / 2
          }
        } else if (mn.gamemode === "portal") {
          var condition1 = opps[i].x > portals[0].x - portals[0].r && opps[i].x < portals[0].x + portals[0].r
          var condition2 = opps[i].x > portals[1].x - portals[1].r && opps[i].x < portals[1].x + portals[1].r
          if (condition1 || condition2) {
            if (condition1) {
              if (opps[i].y > portals[0].y) {
                opps[i].upperconst = portals[0].y + -1 * Math.abs((portals[0].r + p.r) * Math.sin(Math.acos(Math.abs(opps[i].x - portals[0].x) / (portals[0].r + p.r))))
                opps[i].lowerconst = h - (opps[i].r / 2)
              } else {
                opps[i].upperconst = opps[i].r / 2
                opps[i].lowerconst = portals[0].y + Math.abs((portals[0].r + p.r) * Math.sin(Math.acos(Math.abs(opps[i].x - portals[0].x) / (portals[0].r + p.r))))
              }
            } else if (condition2) {
              if (opps[i].y > portals[1].y) {
                opps[i].upperconst = portals[1].y + -1 * Math.abs((portals[1].r + p.r) * Math.sin(Math.acos(Math.abs(opps[i].x - portals[1].x) / (portals[1].r + p.r))))
                opps[i].lowerconst = h - (opps[i].r / 2)
              } else {
                opps[i].upperconst = opps[i].r / 2
                opps[i].lowerconst = portals[1].y + Math.abs((portals[1].r + p.r) * Math.sin(Math.acos(Math.abs(opps[i].x - portals[1].x) / (portals[1].r + p.r))))
              }
            }
          } else {
            opps[i].upperconst = opps[i].r / 2
            opps[i].lowerconst = h - opps[i].r / 2
          }
  
          if (opps[i].y > portals[0].y - portals[0].r && opps[i].y < portals[0].y + portals[0].r) {
            if (opps[i].x < portals[0].x) {
              opps[i].leftconst = opps[i].r / 2
              opps[i].rightconst = portals[0].x + -1 * Math.abs((portals[0].r + p.r) * Math.cos(Math.asin(Math.abs(opps[i].y - portals[0].y) / (portals[0].r + p.r))))
            } else if (opps[i].x > portals[0].x && opps[i].x < portals[1].x) {
              opps[i].leftconst = portals[0].x + Math.abs((portals[0].r + p.r) * Math.cos(Math.asin(Math.abs(opps[i].y - portals[0].y) / (portals[0].r + p.r))))
              opps[i].rightconst = portals[1].x + -1 * Math.abs((portals[1].r + p.r) * Math.cos(Math.asin(Math.abs(opps[i].y - portals[1].y) / (portals[1].r + p.r))))
            } else {
              opps[i].leftconst = portals[1].x + Math.abs((portals[1].r + p.r) * Math.cos(Math.asin(Math.abs(opps[i].y - portals[1].y) / (portals[1].r + p.r))))
              opps[i].rightconst = w - opps[i].r / 2
            }
          } else {
            opps[i].leftconst = opps[i].r / 2
            opps[i].rightconst = w - opps[i].r / 2
          }
          if(isNaN(opps[i].lowerconst) || isNaN(opps[i].upperconst) || isNaN(opps[i].leftconst) || isNaN(opps[i].rightconst)){
              opps[i].lowerconst = h - p.r
              opps[i].upperconst = p.r
              opps[i].leftconst = p.r
              opps[i].rightconst = w - p.r
          }
        } else if (mn.gamemode === "fourline") {
          opps[i].leftconst = fourline.x1 + p.r
          opps[i].rightconst = fourline.x2 - p.r
          opps[i].upperconst = fourline.y1 + p.r
          opps[i].lowerconst = fourline.y2 - p.r
        } else if (mn.gamemode === "corner") {
          if (opps[i].y > corner.y) {
            opps[i].leftconst = p.r
            opps[i].rightconst = w - p.r
          } else {
            opps[i].leftconst = corner.x + p.r
            opps[i].rightconst = w - p.r
          }
          if (opps[i].x > corner.x) {
            opps[i].upperconst = p.r
            opps[i].lowerconst = h - p.r
          } else {
            opps[i].upperconst = corner.y + p.r
            opps[i].lowerconst = h - p.r
          }
        } else if (mn.gamemode === "ffa") {
          opps[i].upperconst = p.r
          opps[i].lowerconst = h - p.r
          opps[i].rightconst = w - p.r
          opps[i].leftconst = p.r
        } else if (mn.gamemode === "fold") {
          
          opps[i].upperconst = p.r
          if (fold.y >= h / 2 && fold.rx <= w) {
            
            if (opps[i].x > fold.rx || opps[i].x < fold.lx) {
              opps[i].lowerconst = h - p.r
            } else {
              opps[i].lowerconst = h / 2 + Math.abs(opps[i].x - w / 2) * Math.tan(Math.abs(fold.theta)) - p.r
            }
          }
          if (fold.y < h / 2) {
            
            opps[i].lowerconst = h / 2 - Math.abs(opps[i].x - w / 2) * Math.tan(Math.abs(fold.theta)) - p.r
          }
          if (fold.y < h / 2) {
            if (opps[i].y < fold.y) {
              opps[i].rightconst = w - p.r
              opps[i].leftconst = p.r
            } else {
              opps[i].rightconst = (w / 2) - Math.abs(opps[i].y - h / 2) / Math.tan(fold.theta) - p.r
              opps[i].leftconst = (w / 2) + Math.abs(p.y - h / 2) / Math.tan(fold.theta) + p.r
            }
          } else {
            
            if (opps[i].y <= h / 2) {
              
              opps[i].leftconst = p.r
              opps[i].rightconst = w - p.r
            } else {
              if (opps[i].x < w / 2) {
                opps[i].leftconst = p.r
                opps[i].rightconst = (w / 2) - Math.abs(opps[i].y - h / 2) / Math.tan(fold.theta) - p.r
              } else {
                opps[i].rightconst = w - p.r
                opps[i].leftconst = (w / 2) + Math.abs(opps[i].y - h / 2) / Math.tan(fold.theta) + p.r
              }
            }
          }
          
          
        } else if (mn.gamemode === "pivot") {
            if(pivot.theta >= 3 * PI / 2){
                 opps[i].rightconst = w - p.r 
                 opps[i].lowerconst = h - p.r
                 opps[i].leftconst = (w / 2) + (h - opps[i].y) * Math.tan(pivot.theta - 1.5 * PI) + p.r
                 if(opps[i].x > pivot.x){
                    opps[i].upperconst = p.r 
                 }else {
                    opps[i].upperconst = h - (opps[i].x - (w / 2)) / (Math.tan(pivot.theta - (3 * PI / 2))) + p.r
                 }
            }else {
                opps[i].rightconst = w - p.r
                opps[i].upperconst = p.r
                if(opps[i].y > pivot.y){
                  opps[i].leftconst = (w / 2) - (h - opps[i].y) * Math.tan(1.5 * PI - pivot.theta) + p.r
                }else{
                  opps[i].leftconst = p.r  
                }
                if(opps[i].x > w / 2){
                  opps[i].lowerconst = h - p.r
                }else {
                  opps[i].lowerconst = h - ((w / 2) - opps[i].x) / Math.tan(1.5 * PI - pivot.theta) - p.r
                }
            }
          
        }
      }
  
  
  
      if (mn.gamemode === "og") {
  
        p.lowerconst = h - p.r
        p.upperconst = p.r
        p.rightconst = midLine.x - p.r
        p.leftconst = p.r
      } else if (mn.gamemode === "twoside") {
  
        p.lowerconst = h - p.r
        p.upperconst = p.r
        p.rightconst = midlines.x2 - p.r
        p.leftconst = midlines.x1 + p.r
  
      } else if (mn.gamemode === "claus") {
        if (isNaN(Math.asin(Math.abs(p.y - circConst.y) / (circConst.r - p.r)))) {
          p.rightconst = circConst.x + (circConst.r - p.r)
          p.leftconst = circConst.x - (circConst.r - p.r)
        } else {
  
          p.rightconst = circConst.x + Math.abs((circConst.r - p.r) * Math.cos(Math.asin(Math.abs(p.y - circConst.y) / (circConst.r - p.r))))
          p.leftconst = circConst.x + -1 * Math.abs((circConst.r - p.r) * Math.cos(Math.asin(Math.abs(p.y - circConst.y) / (circConst.r - p.r))))
        }
        if (isNaN(Math.acos(Math.abs(p.x - circConst.x) / (circConst.r - p.r)))) {
          p.upperconst = circConst.y - (circConst.r - p.r)
          p.lowerconst = circConst.y + (circConst.r - p.r)
        } else {
  
          p.lowerconst = circConst.y + Math.abs((circConst.r - p.r) * Math.sin(Math.acos(Math.abs(p.x - circConst.x) / (circConst.r - p.r))))
          p.upperconst = circConst.y + -1 * Math.abs((circConst.r - p.r) * Math.sin(Math.acos(Math.abs(p.x - circConst.x) / (circConst.r - p.r))))
  
        }
      } else if (mn.gamemode === "diag") {
        p.lowerconst = h - p.r
        p.leftconst = p.r
        if (p.x - diag.x1 > 0) {
          p.upperconst = ((p.x - diag.x1) * (h / w)) + p.r
        } else {
          p.upperconst = p.r
        }
        var pprc = (p.x + (p.y - ((p.x - diag.x1) * (h / w))) / (h / w)) + p.r
        if (pprc > w - p.r) {
          p.rightconst = w - p.r
        } else {
          p.rightconst = pprc
        }
  
      } else if (mn.gamemode === "portal") {
        for (var i = 0; i < portals.length; i++) {
          if (p.portalstatus === i) {
            if (isNaN(Math.asin(Math.abs(p.y - portals[i].y) / (portals[i].r - p.r)))) {
              p.rightconst = portals[i].x + (portals[i].r - p.r)
              p.leftconst = portals[i].x - (portals[i].r - p.r)
            } else {
  
              p.rightconst = portals[i].x + Math.abs((portals[i].r - p.r) * Math.cos(Math.asin(Math.abs(p.y - portals[i].y) / (portals[i].r - p.r))))
              p.leftconst = portals[i].x + -1 * Math.abs((portals[i].r - p.r) * Math.cos(Math.asin(Math.abs(p.y - portals[i].y) / (portals[i].r - p.r))))
            }
            if (isNaN(Math.acos(Math.abs(p.x - portals[i].x) / (portals[i].r - p.r)))) {
              p.upperconst = circConst.y - (circConst.r - p.r)
              p.lowerconst = circConst.y + (circConst.r - p.r)
            } else {
  
              p.lowerconst = portals[i].y + Math.abs((portals[i].r - p.r) * Math.sin(Math.acos(Math.abs(p.x - portals[i].x) / (portals[i].r - p.r))))
              p.upperconst = portals[i].y + -1 * Math.abs((portals[i].r - p.r) * Math.sin(Math.acos(Math.abs(p.x - portals[i].x) / (portals[i].r - p.r))))
  
            }
          }
        }
      } else if (mn.gamemode === "fourline") {
        switch (p.fourlinestatus) {
          case 0:
            p.leftconst = p.r
            p.rightconst = fourline.x1 - p.r
            p.upperconst = p.r
            p.lowerconst = fourline.y1 - p.r
            break;
          case 1:
            p.leftconst = fourline.x2 + p.r
            p.rightconst = w - p.r
            p.upperconst = p.r
            p.lowerconst = fourline.y1 - p.r
            break;
          case 2:
            p.leftconst = p.r
            p.rightconst = fourline.x1 - p.r
            p.upperconst = fourline.y2 + p.r
            p.lowerconst = h - p.r
            break;
          case 3:
            p.leftconst = fourline.x2 + p.r
            p.rightconst = w - p.r
            p.upperconst = fourline.y2 + p.r
            p.lowerconst = h - p.r
        }
      } else if (mn.gamemode === "corner") {
        p.upperconst = p.r
        p.leftconst = p.r
        p.lowerconst = corner.y - p.r
        p.rightconst = corner.x - p.r
      } else if (mn.gamemode === "ffa") {
        p.upperconst = p.r
        p.lowerconst = h - p.r
        p.leftconst = p.r
        p.rightconst = w - p.r
      } else if (mn.gamemode === "fold") {
        p.lowerconst = h - p.r
        if (fold.y < h / 2) {
          if (fold.y < 0) {
            if (p.x < (w / 2) - (h / 2) / Math.tan(Math.abs(fold.theta)) || p.x > (w / 2) + (h / 2) / Math.tan(Math.abs(fold.theta))) {
              p.upperconst = p.r
            } else {
              p.upperconst = h / 2 - Math.abs(p.x - w / 2) * Math.tan(Math.abs(fold.theta)) + p.r
            }
          } else {
            p.upperconst = h / 2 - Math.abs(p.x - w / 2) * Math.tan(Math.abs(fold.theta)) + p.r
          }
        } else {
          p.upperconst = h / 2 + Math.abs(p.x - w / 2) * Math.tan(Math.abs(fold.theta)) + p.r
        }
        if (fold.y < h / 2) {
          if (p.x < w / 2) {
            p.leftconst = p.r
            p.rightconst = (w / 2) - Math.abs(p.y - h / 2) / Math.tan(fold.theta) - p.r
  
          } else {
            p.rightconst = w - p.r
            p.leftconst = (w / 2) + Math.abs(p.y - h / 2) / Math.tan(fold.theta) + p.r
          }
        } else {
          if (p.y < fold.y) {
            p.leftconst = (w / 2) - Math.abs(p.y - h / 2) / Math.tan(fold.theta) + p.r
            p.rightconst = (w / 2) + Math.abs(p.y - h / 2) / Math.tan(fold.theta) - p.r
          } else {
            p.leftconst = p.r
            p.rightconst = w - p.r
          }
        }
      } else if (mn.gamemode === "pivot") {
          if(pivot.theta <= 1.5 * PI){
              
              p.leftconst = p.r
              p.lowerconst = h - p.r
              p.rightconst = (w / 2) - (h - p.y) * Math.tan(1.5 * PI - pivot.theta) - p.r
              
              if(p.x < pivot.x){
                 p.upperconst = p.r 
                
              }else{
                 p.upperconst = h - ((w / 2) - p.x) / (Math.tan(1.5 * PI - pivot.theta)) + p.r
                
              }
              
          }else{
            
              p.leftconst = p.r
              p.upperconst = p.r
              if(p.x < w / 2){
                p.lowerconst = h - p.r
              }else {
                p.lowerconst = h - (p.x - (w / 2)) / Math.tan(pivot.theta - 1.5 * PI) - p.r
              }
              if(p.y < pivot.y){
                  p.rightconst = w - p.r
              }else{
                  p.rightconst = (w / 2) + (h - p.y) * Math.tan(pivot.theta - 1.5 * PI) - p.r
              }
          }
        
      }
  
      if (mn.gamemode == "og") {
  
        midLine.show()
        midLine.update()
        pgoals = []
        pgoals[0] = (new Goal(-10 * w / 800, h / 2, 0))
        oppgoals = []
        oppgoals[0] = (new Goal(w + 10 * w / 800, h / 2, 1))
  
        for (var i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[0].x, oppgoals[0].y) < oppgoals[0].r) {
            projectiles.splice(i, 1)
            p.points += 3;
            goalhitnoise.play()
            mn.fc4 = frameCount
            oppgoals[0].lightup = frameCount
          }
        }
        for (var i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[0].x, pgoals[0].y) < pgoals[0].r) {
            oppPs.splice(i, 1)
            mn.oppPoints += 1
            goalhitnoise.play()
            mn.fc3 = frameCount
            pgoals[0].lightup = frameCount
          }
        }
        if (Number.isInteger(frameCount / mn.poweruprate)) {
          powerups.push(new powerup(poweruptypes[Math.floor(Math.random() * 3)], (w / 2) + Math.random() * (w / 4), (h / 5) + Math.random() * (3 * h / 5)))
        }
      } else if (mn.gamemode == "twoside") {
        
  
        pgoals = []
        pgoals[0] = new Goal(w / 2, h / 3, 0)
        pgoals[1] = new Goal(w / 2, 2 * h / 3, 0)
        oppgoals = []
        oppgoals[0] = new Goal(-10 * w / 800, h / 2, 1)
        oppgoals[1] = new Goal(w + 10 * w / 800, h / 2, 1)
        midlines.show()
        midlines.update()
        midlines.x1 = constrain(midlines.x1, w / 8, 0.4 * w)
        midlines.x2 = constrain(midlines.x2, 0.6 * w, 7 * w / 8)
        for (var i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[0].x, oppgoals[0].y) < oppgoals[0].r) {
            projectiles.splice(i, 1)
            p.points1 += 3;
            goalhitnoise.play()
            mn.fc4 = frameCount
            oppgoals[0].lightup = frameCount
          }
        }
        for (var i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[1].x, oppgoals[1].y) < oppgoals[1].r) {
            projectiles.splice(i, 1)
            p.points2 += 3;
            goalhitnoise.play()
            mn.fc4 = frameCount
            oppgoals[1].lightup = frameCount
          }
        }
        for (var i = 0; i < opps.length; i++) {
          if (opps[i].pix > w / 2) {
            opps[i].orient = "right"
          } else {
            opps[i].orient = "left"
          }
        }
  
        if (Number.isInteger(frameCount / mn.poweruprate)) {
          var plusminus = [-1, 1]
          var rand1 = Math.random()
          powerups.push(new powerup(poweruptypes[Math.floor(rand1 * 3)], (w / 2) + plusminus[Math.floor(2 * rand1)] * (150 + rand1 * 100), 100 + rand1 * 300))
        }
        for (var i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[0].x, pgoals[0].y) < pgoals[0].r) {
            oppPs.splice(i, 1)
            mn.oppPoints2 += 1
            goalhitnoise.play()
            mn.fc3 = frameCount
            pgoals[0].lightup = frameCount
          }
        }
        for (var i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[1].x, pgoals[1].y) < pgoals[1].r) {
            oppPs.splice(i, 1)
            mn.oppPoints1 += 1
            goalhitnoise.play()
            mn.fc3 = frameCount
            pgoals[1].lightup = frameCount
          }
        }
  
      } else if (mn.gamemode == "claus") {
        for (var i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[0].x, oppgoals[0].y) < oppgoals[0].r) {
            projectiles.splice(i, 1)
            p.points += 3
            goalhitnoise.play()
            mn.fc3 = frameCount
            oppgoals[0].lightup = frameCount
          }
        }
        for (var i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[0].x, pgoals[0].y) < pgoals[0].r) {
            oppPs.splice(i, 1)
            mn.oppPoints += 1
            goalhitnoise.play()
            mn.fc3 = frameCount
            pgoals[0].lightup = frameCount
          }
        }
  
        pgoals = []
        pgoals[0] = new Goal(w / 2, h / 2, 0)
        oppgoals = []
        oppgoals[0] = new Goal(-10 * w / 800, h / 2, 1)
        for (var i = 0; i < pgoals.length; i++) {
          pgoals[i].show()
        }
        for (var i = 0; i < oppgoals.length; i++) {
          oppgoals[i].show()
        }
  
  
        var plusminus = [-1, 1]
        circConst.show()
        circConst.update()
  
        if (Number.isInteger(frameCount / mn.poweruprate)) {
          var rand1 = Math.random()
          powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)], (w / 2) + plusminus[Math.floor(2 * rand1)] * (rand1 * 100), 100 + rand1 * 300))
        }
  
      } else if (mn.gamemode === "diag") {
  
        pgoals = []
        pgoals[0] = new Goal(0, h, 0)
        oppgoals = []
        oppgoals[0] = new Goal(w, 0, 1)
        diag.show()
        diag.update()
        for (var i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[0].x, oppgoals[0].y) < oppgoals[0].r) {
            projectiles.splice(i, 1)
            p.points += 5
  
            goalhitnoise.play()
            mn.fc3 = frameCount
            oppgoals[0].lightup = frameCount
          }
        }
        for (var i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[0].x, pgoals[0].y) < pgoals[0].r) {
            oppPs.splice(i, 1)
            mn.oppPoints += 3
            goalhitnoise.play()
            mn.fc3 = frameCount
            pgoals[0].lightup = frameCount
          }
        }
        if (Number.isInteger(frameCount / mn.poweruprate)) {
          var rand1 = Math.random()
          powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)], w / 2 + rand1 * (w / 4), w / 4 + rand1 * (w / 4)))
        }
  
      } else if (mn.gamemode === "portal") {
        pgoals = []
        pgoals[0] = new Goal(w / 4, h / 2, 0)
        pgoals[1] = new Goal(3 * w / 4, h / 2, 0)
        oppgoals = []
        oppgoals[0] = new Goal(0 - 5 * w / 800, h / 2, 1)
        oppgoals[1] = new Goal(w + 5 * w / 800, h / 2, 1)
        for (var i = 0; i < portals.length; i++) {
          portals[i].show()
          portals[i].update()
        }
        if (distance(portals[0].portalx, portals[0].portaly, p.x, p.y) < p.r + w / 64) {
          p.rightconst = w
          p.x = portals[1].x
          p.y = portals[1].y
          p.portalstatus = 1
        }
        if (distance(portals[1].portalx, portals[1].portaly, p.x, p.y) < p.r + w / 64) {
          p.leftconst = 0
          p.x = portals[0].x
          p.y = portals[0].y
          p.portalstatus = 0
        }
        for (var i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[0].x, pgoals[0].y) < pgoals[0].r) {
            oppPs.splice(i, 1)
            mn.oppPoints1 += 1
            goalhitnoise.play()
            mn.fc3 = frameCount
            pgoals[0].lightup = frameCount
          }
        }
        for (var i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[1].x, pgoals[1].y) < pgoals[1].r) {
            oppPs.splice(i, 1)
            mn.oppPoints2 += 1
            goalhitnoise.play()
            mn.fc3 = frameCount
            pgoals[1].lightup = frameCount
          }
        }
        for (var i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[0].x, oppgoals[0].y) < oppgoals[0].r) {
            projectiles.splice(i, 1)
            p.points1 += 3;
            goalhitnoise.play()
            mn.fc4 = frameCount
            oppgoals[0].lightup = frameCount
          }
        }
        for (var i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[1].x, oppgoals[1].y) < oppgoals[1].r) {
            projectiles.splice(i, 1)
            p.points2 += 3;
            goalhitnoise.play()
            mn.fc4 = frameCount
            oppgoals[1].lightup = frameCount
          }
        }
        if (Number.isInteger(frameCount / 500)) {
          var rand1 = Math.random()
          powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)], (w / 4) + rand1 * w / 2, h / 5 + rand1 * (3 * h / 5)))
        }
      } else if (mn.gamemode === "fourline") {
  
        pgoals = []
        pgoals[0] = new Goal(0, 0, 0)
        pgoals[1] = new Goal(w, 0, 0)
        pgoals[2] = new Goal(0, h, 0)
        pgoals[3] = new Goal(w, h, 0)
        oppgoals = []
        oppgoals[0] = new Goal((w / 2) - (62.5 * w / 800), 3 * h / 8, 1)
        oppgoals[1] = new Goal((w / 2) + (62.5 * w / 800), 3 * h / 8, 1)
        oppgoals[2] = new Goal((w / 2) - (62.5 * w / 800), 5 * h / 8, 1)
        oppgoals[3] = new Goal((w / 2) + (62.5 * w / 800), 5 * h / 8, 1)
  
        function noConst() {
          p.rightconst = w
          p.leftconst = 0
          p.upperconst = 0
          p.lowerconst = h
        }
        fourline.show()
        fourline.update()
        for (var i = 0; i < oppgoals.length; i++) {
          for (var j = 0; j < projectiles.length; j++) {
            if (distance(projectiles[j].x, projectiles[j].y, oppgoals[i].x, oppgoals[i].y) < oppgoals[i].r) {
              goalhitnoise.play()
              projectiles.splice(j, 1)
              p.pointsarr[i] += 3
              oppgoals[i].lightup = frameCount
            }
          }
          for (var j = 0; j < oppPs.length; j++) {
            if (distance(oppPs[j].x, oppPs[j].y, pgoals[i].x, pgoals[i].y) < pgoals[i].r) {
              goalhitnoise.play()
              oppPs.splice(j, 1)
              mn.oppPointsArr[i] += 1
              pgoals[i].lightup = frameCount
            }
          }
        }
        if (Number.isInteger(frameCount / 500)) {
          var rand1 = Math.random()
          if(rand1 < 0.25){
              powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)],  rand1 * 0.25 * w,   rand1 * 0.25 * h))
          }else if(rand1 >= 0.25 && rand1 < 0.5){
              powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)],  rand1 * 0.25 * w,   0.75 * h + rand1 * 0.25 * h))
          }else if(rand1 >= 0.5 && rand1 < 0.75){
              powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)],0.75 * w + rand1 * 0.25 * w,   rand1 * 0.25 * h))
          }else{
              powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)], 0.75 * w + rand1 * 0.25 * w,   0.75 * h + rand1 * 0.25 * h))
          }
          
        }
        if (fourline.portals[1].bool || fourline.portals[6].bool || fourline.portals[8].bool) {
          noConst()
          p.x = fourline.x1 - fourline.x1 / 2
          p.y = fourline.y1 - fourline.y1 / 2
          p.fourlinestatus = 0
  
        }
        if (fourline.portals[2].bool || fourline.portals[4].bool || fourline.portals[11].bool) {
          noConst()
          p.x = fourline.x1 - fourline.x1 / 2
          p.y = fourline.y2 + fourline.y1 / 2
          p.fourlinestatus = 2
  
        }
        if (fourline.portals[0].bool || fourline.portals[7].bool || fourline.portals[9].bool) {
          noConst()
          p.x = fourline.x2 + fourline.x1 / 2
          p.y = fourline.y1 - fourline.y1 / 2
          p.fourlinestatus = 1
  
        }
        if (fourline.portals[3].bool || fourline.portals[5].bool || fourline.portals[10].bool) {
          noConst()
          p.x = fourline.x2 + fourline.x1 / 2
          p.y = fourline.y2 + fourline.y1 / 2
          p.fourlinestatus = 3
  
        }
      } else if (mn.gamemode === "corner") {
        pgoals = []
        pgoals[0] = new Goal(0, 0, 0)
        oppgoals = []
        oppgoals[0] = new Goal(w, h, 1)
        corner.show()
        corner.update()
        for (let i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[0].x, oppgoals[0].y) < oppgoals[0].r) {
            p.points += 3
            projectiles.splice(i, 1)
            goalhitnoise.play()
            oppgoals[0].lightup = frameCount
          }
        }
        for (let i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[0].x, pgoals[0].y) < pgoals[0].r) {
            mn.oppPoints += 2
            oppPs.splice(i, 1)
            goalhitnoise.play()
            pgoals[0].lightup = frameCount
          }
        }
        if (Number.isInteger(frameCount / 500)) {
          var rand1 = Math.random()
          powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)], w / 8 + rand1 * 0.75 * w, h / 5 + rand1 * 0.6 * h))
        }
      } else if (mn.gamemode === "ffa") {
        pgoals = []
        oppgoals = []
  
        if (Number.isInteger(frameCount / 500)) {
          var rand1 = Math.random()
          powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)], w / 8 + rand1 * 0.75 * w, h / 5 + rand1 * 0.6 * h))
        }
      } else if (mn.gamemode === "fold") {
        pgoals = []
        pgoals[0] = new Goal(w / 2, h, 0)
        oppgoals = []
        oppgoals[0] = new Goal(w / 2, 0, 1)
        for (let i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[0].x, oppgoals[0].y) < oppgoals[0].r) {
            p.points += 1.5
            projectiles.splice(i, 1)
            goalhitnoise.play()
            oppgoals[0].lightup = frameCount
          }
        }
        for (let i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[0].x, pgoals[0].y) < pgoals[0].r) {
            mn.oppPoints += 1
            oppPs.splice(i, 1)
            goalhitnoise.play()
            pgoals[0].lightup = frameCount
          }
        }
        if (Number.isInteger(frameCount / 500)) {
          var rand1 = Math.random()
          powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)], w / 8 + rand1 * 0.75 * w, h / 5 + rand1 * 0.6 * h))
        }
        fold.update()
        fold.show()
  
      } else if (mn.gamemode === "pivot") {
        oppgoals = []
        oppgoals[0] = new Goal(w, h, 1)
        pgoals = []
        pgoals[0] = new Goal(0, h, 0)
        for (let i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, oppgoals[0].x, oppgoals[0].y) < oppgoals[0].r) {
            p.points += 3
            projectiles.splice(i, 1)
            goalhitnoise.play()
            oppgoals[0].lightup = frameCount
          }
        }
        for (let i = 0; i < oppPs.length; i++) {
          if (distance(oppPs[i].x, oppPs[i].y, pgoals[0].x, pgoals[0].y) < pgoals[0].r) {
            mn.oppPoints += 2
            oppPs.splice(i, 1)
            goalhitnoise.play()
            pgoals[0].lightup = frameCount
          }
        }
        if (Number.isInteger(frameCount / 500)) {
          var rand1 = Math.random()
          powerups.push(new powerup(poweruptypes[Math.floor(rand1 * poweruptypes.length)], w / 8 + rand1 * 0.75 * w, h / 5 + rand1 * 0.6 * h))
        }
        pivot.update()
        pivot.show()
        
        
      }
  
  
  
      for (var i = 0; i < pgoals.length; i++) {
        pgoals[i].show()
        if (distance(p.x, p.y, pgoals[i].x, pgoals[i].y) < pgoals[i].r + p.r) {
          p.hp -= 0.05
        }
      }
      for (var i = 0; i < oppgoals.length; i++) {
        oppgoals[i].show()
      }
      
      p.show();
      p.update();
      for (var i = 0; i < opps.length; i++) {
        opps[i].show();
        opps[i].update();
      }
  
      for (var i = 0; i < powerups.length; i++) {
        powerups[i].show()
      }
      if (powerups.length > 0) {
        for (var i = 0; i < powerups.length; i++) {
          if (distance(p.x, p.y, powerups[i].x, powerups[i].y) < p.r + powerups[i].r) {
            if (powerups[i].type == "freeze") {
              mn.freeze = frameCount
            } else if (powerups[i].type == "hp") {
              mn.hp = frameCount
            } else if (powerups[i].type == "bolt") {
              mn.bolt = frameCount
            }
            powerups.splice(i, 1)
            powerupnoise.play()
          }
        }
      }
      for (var i = 0; i < oppPs.length; i++) {
        oppPs[i].show()
        oppPs[i].update()
      }
      for (var i = 0; i < oppPs.length; i++) {
        if (oppPs[i].x > w || oppPs[i].x < 0 || oppPs[i].y > h || oppPs[i].y < 0) {
          oppPs.splice(i, 1)
        }
      }
      for (var i = 0; i < projectiles.length; i++) {
        projectiles[i].show();
        projectiles[i].update();
      }
      for (var j = 0; j < opps.length; j++) {
        for (var i = 0; i < projectiles.length; i++) {
          if (distance(projectiles[i].x, projectiles[i].y, opps[j].x, opps[j].y) < opps[j].r / 2) {
            projectiles.splice(i, 1);
            if(opps[j].hp > 5){
            hitnoise.play()
            }
            opps[j].hp -= 5
            
            opps[j].upd = frameCount
  
          }
  
        }
        if (frameCount < opps[j].upd + 5) {
  
          opps[j].color = 150
        } else {
          opps[j].color = 0
        }
      }
  
      for (var i = 0; i < projectiles.length; i++) {
        if (projectiles[i].x > w || projectiles[i].x < 0 || projectiles[i].y > h || projectiles[i].y < 0) {
          projectiles.splice(i, 1)
        }
      }
      for (var i = 0; i < oppPs.length; i++) {
        if (distance(oppPs[i].x, oppPs[i].y, p.x, p.y) < p.r) {
          oppPs.splice(i, 1);
          p.hp -= mn.dmg;
          p.upd = frameCount
          hitnoise.play()
        }
        if (frameCount < p.upd + 5) {
          p.color = 150        
        } else {
          p.color = 0
        }
      }
    
  
  
      for (var j = 0; j < opps.length; j++) {
        if (projectiles.length === 0) {
          if (Number.isInteger(frameCount / 30)) {
            opps[j].xspeed = movements[Math.floor(Math.random() * 3)]
            opps[j].yspeed = movements[Math.floor(Math.random() * 3)]
          }
        } else if (projectiles.length > 0) {
          if (Number.isInteger(frameCount / 20)) {
  
            for (var i = 0; i < projectiles.length; i++) {
              if (distance(p.x, p.y, opps[j].x, opps[j].y) < 25 && p.x - opps[j].x < 0) {
                opps[j].xspeed = 1
              } else if (distance(p.x, p.y, opps[j].x, opps[j].y) < 25 && p.x - opps[j].x >= 0) {
  
                opps[j].xspeed = -1
              } else {
                if (!opps[j].ai1[i] || !opps[j].ai2[i]) {
  
                  projectiles[i].hit[j] = (opps[j].x - projectiles[i].xi) * Math.tan(projectiles[i].theta) + projectiles[i].yi
                  if (projectiles[i].hit[j] > opps[j].y - 30 * h / 500 && projectiles[i].hit[j] < opps[j].y + 30 * h / 500) {
                    opps[j].upDown = 0;
                    opps[j].upperDiag = 0;
                    opps[j].lowerDiag = 0;
                    opps[j].horiz = 0;
                    projectiles[i].hitAng[j] = angleMaker(projectiles[i].x, projectiles[i].y, opps[j].x, opps[j].y) % PI
                    if (projectiles[i].hitAng[j] < PI / 8 || projectiles[i].hitAng[j] > 7 * PI / 8) {
  
                      opps[j].upDown += 1 / distance(projectiles[i].x, projectiles[i].y, opps[j].x, opps[j].y)
                    } else if (projectiles[i].hitAng[j] >= PI / 8 && projectiles[i].hitAng[j] < 3 * PI / 8) {
                      opps[j].upperDiag += 1 / distance(projectiles[i].x, projectiles[i].y, opps[j].x, opps[j].y)
                    } else if (projectiles[i].hitAng[j] >= 3 * PI / 8 && projectiles[i].hitAng[j] < 5 * PI / 8) {
                      opps[j].horiz += 1 / distance(projectiles[i].x, projectiles[i].y, opps[j].x, opps[j].y)
                    } else if (projectiles[i].hitAng[i] >= 5 * PI / 8 && projectiles[i].hitAng[j] <= 7 * PI / 8) {
                      opps[j].lowerDiag += 1 / distance(projectiles[i].x, projectiles[i].y, opps[j].x, opps[j].y)
                    }
                    opps[j].movements = [opps[j].upDown, opps[j].lowerDiag, opps[j].upperDiag, opps[j].horiz]
                    opps[j].movements.sort(function(a, b) {
                      return a - b
                    });
  
                    if (opps[j].movements[3] === opps[j].upDown) {
  
                      var rand1 = Math.random()
                      if (rand1 < (opps[j].y - opps[j].upperconst) / (opps[j].lowerconst - opps[j].upperconst)) {
                        opps[j].yspeed = -1
                        opps[j].xspeed = 0
                      } else {
                        opps[j].yspeed = 1
                        opps[j].xspeed = 0
                      }
                    } else if (opps[j].movements[3] === opps[j].upperDiag) {
  
                      var rand1 = Math.random()
                      if (opps[j].y < h / 2) {
                        if (rand1 > distance(opps[j].x, opps[j].upperconst, opps[j].leftconst, opps[j].y) / (Math.sqrt(2) * h / 2)) {
                          if (rand1 > 0.5) {
                            opps[j].yspeed = 1
                            opps[j].xspeed = 0
                          } else {
                            opps[j].yspeed = 0
                            opps[j].xspeed = 1
                          }
                        } else {
                          if (rand1 < ((h - opps[j].y) * Math.pow(2, 0.5)) / ((h - opps[j].y) * Math.pow(2, 0.5)) + (opps[j].y * Math.pow(2, 0.5))) {
                            opps[j].xspeed = -1
                            opps[j].yspeed = 1
                          } else {
                            opps[j].xspeed = 1
                            opps[j].yspeed = -1
                          }
                        }
                      } else {
                        if (rand1 > distance(opps[j].x, opps[j].lowerconst, opps[j].rightconst, opps[j].y) / (Math.sqrt(2) * h / 2)) {
                          if (rand1 > 0.5) {
                            opps[j].xspeed = -1
                            opps[j].yspeed = 0
                          } else {
                            opps[j].yspeed = -1
                            opps[j].xspeed = 0
                          }
                        } else {
                          if (rand1 < ((h - opps[j].y) * Math.pow(2, 0.5)) / ((h - opps[j].y) * Math.pow(2, 0.5)) + (opps[j].y * Math.pow(2, 0.5))) {
                            opps[j].xspeed = -1
                            opps[j].yspeed = 1
                          } else {
                            opps[j].xspeed = 1
                            opps[j].yspeed = -1
                          }
                        }
                      }
                    } else if (opps[j].movements[3] === opps[j].horiz) {
  
                      var rand1 = Math.random()
                      if (rand1 < (opps[j].x - opps[j].leftconst) / (opps[j].rightconst - opps[j].leftconst)) {
                        opps[j].xspeed = -1
                        opps[j].yspeed = 0
                      } else {
                        opps[j].xspeed = 1
                        opps[j].yspeed = 0
                      }
                    } else if (opps[j].movements[3] === opps[j].lowerDiag) {
  
                      if (opps[j].y < h / 2) {
                        if (rand1 > distance(opps[j].x, opps[j].upperconst, opps[j].rightconst, opps[j].y) / (Math.sqrt(2) * h / 2)) {
                          if (Math.random > 0.5) {
                            opps[j].yspeed = 1
                            opps[j].xspeed = 0
                          } else {
                            opps[j].yspeed = 0
                            opps[j].xspeed = 1
                          }
                        } else {
                          if (rand1 < ((h - opps[j].y) * Math.pow(2, 0.5)) / ((h - opps[j].y) * Math.pow(2, 0.5)) + (opps[j].y * Math.pow(2, 0.5))) {
                            opps[j].xspeed = 1
                            opps[j].yspeed = 1
                          } else {
                            opps[j].xspeed = -1
                            opps[j].yspeed = -1
                          }
                        }
                      } else {
                        if (rand1 > distance(opps[j].x, opps[j].lowerconst, opps[j].leftconst, opps[j].y) / (Math.sqrt(2) * h / 2)) {
                          if (rand1 > 0.5) {
                            opps[j].xspeed = -1
                            opps[j].yspeed = 0
                          } else {
                            opps[j].yspeed = -1
                            opps[j].xspeed = 0
                          }
                        } else {
                          if (rand1 < ((h - opps[j].y) * Math.pow(2, 0.5)) / ((h - opps[j].y) * Math.pow(2, 0.5)) + (opps[j].y * Math.pow(2, 0.5))) {
                            opps[j].xspeed = 1
                            opps[j].yspeed = 1
                          } else {
                            opps[j].xspeed = -1
                            opps[j].yspeed = -1
                          }
                        }
                      }
                    }
                  } else {
  
                    var rand1 = Math.random()
                    opps[j].xspeed = movements[Math.floor(rand1 * 3)]
                    opps[j].yspeed = movements[Math.floor(rand1 * 3)]
                  }
                }
              }
            }
          }
        }
      }
      for (var i = 0; i < opps.length; i++) {
        if (p.hp <= 0) {
  
          mn.menustatus = 2
          deathnoise.play()
          beatloop.stop()
  
        } else if (opps[i].hp <= 0) {
          
          opponentdeathnoise.play()
          
          opps.splice(i, 1)
          
        }
      }
  
  
      if (opps.length === 0 && mn.menustatus === 1) {
        mn.unlockedLevels[mn.level] = true
        mn.level += 1
        
        mn.menustatus = 4
        beatloop.stop()
        menuloop.loop()
        mn.fc5 = frameCount
      }
      for (var i = 0; i < opps.length; i++) {
        if (frameCount % 40 === 0) {
          opps[i].rand1 = Math.random()
          if (pgoals.length === 1) {
            if (opps[i].rand1 < 0.7) {
              opps[i].targety = p.y
              opps[i].targetx = p.x
            } else {
              opps[i].targetx = pgoals[0].x
              opps[i].targety = pgoals[0].y
            }
          } else if (pgoals.length === 2) {
  
  
            if (opps[i].rand1 <= 0.6) {
  
              opps[i].targety = p.y
              opps[i].targetx = p.x
            } else if (opps[i].rand1 > 0.6 && opps[i].rand1 < 0.8) {
              opps[i].targety = pgoals[0].y
              opps[i].targetx = pgoals[0].x
            } else {
              opps[i].targety = pgoals[1].y
              opps[i].targetx = pgoals[1].x
            }
          } else if (pgoals.length === 4) {
            if (opps[i].rand1 <= 0.6) {
  
              opps[i].targety = p.y
              opps[i].targetx = p.x
            } else if (opps[i].rand1 > 0.6 && opps[i].rand1 <= 0.7) {
              opps[i].targety = pgoals[0].y
              opps[i].targetx = pgoals[0].x
            } else if (opps[i].rand1 > 0.7 && opps[i].rand1 <= 0.8) {
              opps[i].targety = pgoals[1].y
              opps[i].targetx = pgoals[1].x
            } else if (opps[i].rand1 > 0.8 && opps[i].rand1 <= 0.9) {
              opps[i].targety = pgoals[2].y
              opps[i].targetx = pgoals[2].x
            } else {
              opps[i].targety = pgoals[3].y
              opps[i].targetx = pgoals[3].x
            }
          } else if (pgoals.length === 0) {
            opps[i].targetx = p.x
            opps[i].targety = p.y
          }
  
        }
  
        if (frameCount % opps[i].rand2 < mn.oppAmmo && Number.isInteger(frameCount / 10)) {
          oppPs.push(new oppProjectile(opps[i].x, opps[i].y, opps[i].targetx, opps[i].targety))
        }
  
      }
  
  
  
      if (Number.isInteger(mn.hardcoremode / 2)) {
        mn.dmg = 5
  
        mn.aiupdater = 30
      } else {
        mn.dmg = 100
        mn.aiupdater = 10
      }
      if(mn.mutedstatus === "on"){
      if (frameCount < mn.fc2 + 120) {
        beatloop.setVolume((frameCount - mn.fc2) / 120)
      } else {
        beatloop.setVolume(1)
      }
      }
      for (var i = 0; i < pgoals.length; i++) {
        if (frameCount < mn.fc3 + 5) {
          pgoals[i].color = 100
        } else {
          pgoals[i].color = 0
        }
      }
      for (var i = 0; i < oppgoals.length; i++) {
        if (frameCount < mn.fc4 + 5) {
          oppgoals[i].color = 100
        } else {
          oppgoals[i].color = 0
        }
      }
      
  
  
      for(var i = 0; i <powerups.length; i++){
         if(powerups[i].timer === mn.poweruprate){
             powerups.splice(i, 1)
         }
      }
      for (var i = 0; i < oppPs.length; i++) {
        if (frameCount < mn.freeze + 60 && frameCount > 60) {
          oppPs[i].xspeed = 0
          oppPs[i].yspeed = 0
        } else {
          oppPs[i].xspeed = oppPs[i].pspeed * Math.cos(oppPs[i].theta)
          oppPs[i].yspeed = oppPs[i].pspeed * Math.sin(oppPs[i].theta)
        }
      }
      if (frameCount < mn.freeze + 60 && frameCount > 60) {
        for (var i = 0; i < opps.length; i++) {
          opps[i].xspeed = 0
          opps[i].yspeed = 0
        }
      }
      if (frameCount < mn.hp + 1) {
        p.hp += 20
      }
      if (frameCount < mn.bolt + 240 && frameCount > 240) {
        p.speed = 8
        for (var i = 0; i < projectiles.length; i++) {
          projectiles[i].pspeed = 20
        }
      } else {
        p.speed = 5
        for (var i = 0; i < projectiles.length; i++) {
          projectiles[i].pspeed = 10
        }
      }
    }
  }