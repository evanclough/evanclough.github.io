const w = 800;
const h = 500;

function distance(x1, y1, x2, y2){
  return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
}
function Target(x, y, spawn_f){
  this.x = x;
  this.y = y;
  this.r = 0;
  this.spawn_fc = spawn_f;
  this.last_frame = spawn_f + 360;
  this.show = function(){
    fill(255, 0, 0);
    this.r = 15 * (cos((this.last_frame - 180 - frameCount) * TWO_PI / 360) + 1);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    noFill();
    strokeWeight(2);
    stroke(100);
    ellipse(this.x, this.y, 2 * this.r / 3, 2 * this.r / 3);
    ellipse(this.x, this.y, 4 * this.r / 3, 4 * this.r / 3);
    this.mouse_is_on = distance(mouseX, mouseY, this.x, this.y) < this.r;
  }
}

function Target_Shadow(x, y, mx, my, r, starting_frame){
  this.x = x;
  this.y = y;
  this.r = r;
  this.mx = mx;
  this.my = my;
  this.starting_frame = starting_frame;
  this.ending_frame = this.starting_frame + 60;
  this.show = function(){
    noFill();
    strokeWeight(2);
    stroke(100);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    ellipse(this.x, this.y, 2 * this.r / 3, 2 * this.r / 3);
    ellipse(this.x, this.y, 4 * this.r / 3, 4 * this.r / 3);
    stroke(0);
    strokeWeight(4);
    point(this.mx, this.my);
  }
}

let targets = [];
let target_shadows = [];

function Button(x, y, w, h, t, f){

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.f = f;
    this.t = t;
    this.show = function(){
      this.mouse_is_on = mouseX > this.x && mouseX < this.x + w && mouseY < this.y + h && mouseY > this.y;
      strokeWeight(2);
      stroke(0);
      this.mouse_is_on ? fill(230): fill(200);
      rect(this.x, this.y, this.w, this.h);
      textSize(15);
      strokeWeight(0);
      fill(0)
      text(this.t, this.x + w / 2, this.y  + h / 2);
      if(mouseIsPressed && this.mouse_is_on) {this.f();}
      
  }
}
function reset() {
  menu = 2; 
  starting_frame_count = frameCount; 
  last_spawn = starting_frame_count; 
  lives = 3; 
  shots_fired = 0; 
  shots_hit = 0; 
  spawn_rate = 60;
  targets = [];
  time_passed = 0;
  shots_array = [];
  accuracy_array = [];
  lives_lost = [];
  target_shadows = [];
  in_game = true;
}

let play_button = new Button(w / 2 - 50, h / 2 - 25, 100, 50 ,"Play", reset);
let play_again_button = new Button(w / 2 - 50, h / 2 - 25, 100, 50 ,"Play Again", reset);

function Starting_menu(){ 
  this.show = function(){
    play_button.show();
    textSize(30);
    textAlign(CENTER, CENTER);
    text("aim booster clone", w / 2, h / 3);
  }
}

function Restart_menu(){
  this.show = function(){
    play_again_button.show();
    textSize(15);
    text(shots_hit + '/' + (shots_fired - 1), w / 2, h / 3 - 20);
    text("you were " + accuracy + "% accurate", w / 2, h / 3 );
    text("time:  " + minutes + ":" + seconds, w / 2, h / 3 + 20);
    text("final targets/second: " + round(60 / spawn_rate * 100) / 100, w / 2, h / 3 + 40);
    text("acc.", w / 5 - 23, h / 2 - 25);
    text("time", w / 4, h / 2 + 10);
    fill(255, 0, 0);
    strokeWeight(2);
    stroke(100);
    ellipse(0.75 * w, h / 2, 120, 120);
    noFill();
    ellipse(0.75 * w, h / 2, 80, 80);
    ellipse(0.75 * w, h / 2, 40, 40);
    strokeWeight(2);
    stroke(0);
    shots_array.forEach((i, idx)=>{
       point(0.75 * w - 30 + (i[0] * 2), h / 2 - 30 + (i[1] * 2));     
    });
    stroke(100);
    line(w / 4 - 50, h / 2, w / 4 + 50, h / 2);
    line(w / 4 - 50, h / 2 - 50, w / 4 - 50, h / 2);
    accuracy_array.forEach((i, idx) => {
      accuracy_array[idx + 1] != null ? line(100 * idx / accuracy_array.length + (w / 4 - 50), h / 2 - (50 * i / 100),100 * (idx + 1) / accuracy_array.length + (w / 4 - 50), h / 2 - (50 * accuracy_array[idx + 1] / 100)) : point(50 * idx / accuracy_array.length + (w / 4 - 50), h / 2 - (50 * i / 100));
    });
    strokeWeight(3);
    stroke(255, 0, 0);
    lives_lost.forEach((i, idx) => {
      point(100 * i / time_passed + (w / 4 - 50), h / 2 - 25);
    })
  }
}
const end_menu = new Restart_menu();
const starting_menu = new Starting_menu();