const w = 600;
const h = 400;

function distance(x1, y1, x2, y2){
  return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
}
function Target(x, y, max_r, spawn_f, is_sniping, theta){
  this.x = x;
  this.y = y;
  this.r = 0;
  this.max_r = max_r;
  this.spawn_fc = spawn_f;
  this.last_frame;
  if(last_mode_played == "precision"){this.last_frame = spawn_f + 90;}
  else{this.last_frame = spawn_f + 360;}
  this.speed = 0.5;
  this.theta = theta;
  this.x_velocity = this.speed * cos(this.theta);
  this.y_velocity = this.speed * sin(this.theta);
  this.is_sniping = is_sniping;
  this.show = function(){
    fill(255, 0, 0);
    if(last_mode_played == "precision"){this.r = this.max_r * (cos((this.last_frame - 180 - frameCount) * TWO_PI / 720) + 1);}
    else{this.r = this.max_r * (cos((this.last_frame - 180 - frameCount) * TWO_PI / 360) + 1);}
    strokeWeight(this.r / this.max_r);
    stroke(120, 0, 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    fill(255, 75, 75);
    ellipse(this.x, this.y, 4 * this.r / 3, 4 * this.r / 3);
    fill(255, 150, 150);
    ellipse(this.x, this.y, 2 * this.r / 3, 2 * this.r / 3);
    this.mouse_is_on = distance(mouseX, mouseY, this.x, this.y) < this.r + 2;
    if(this.is_sniping){
      this.x_velocity = this.speed * cos(this.theta);
      this.y_velocity = this.speed * sin(this.theta);
      this.x += this.x_velocity;
      this.y += this.y_velocity;
    }
  }
}

function Target_Shadow(x, y, mx, my, r, starting_frame){
  this.x = x;
  this.y = y;
  this.r = r;
  this.mx = mx;
  this.my = my;
  this.starting_frame = starting_frame;
  this.last_frame = this.starting_frame + 30;
  this.show = function(){
    noFill();
    strokeWeight(this.r / 30);
    stroke(200);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    ellipse(this.x, this.y, 2 * this.r / 3, 2 * this.r / 3);
    ellipse(this.x, this.y, 4 * this.r / 3, 4 * this.r / 3);
  }
}

function Shot_Marker(x, y, frame){
  this.x = x;
  this.y = y;
  this.last_frame = frame + 60;
  this.show = function(){
    stroke(20 + 80 * (this.last_frame - frameCount) / 60);
    strokeWeight(4);
    point(this.x, this.y);
  }
}

let shot_markers = [];

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
      if(mouseIsPressed && this.mouse_is_on) this.f();
  }
}
function reset() {
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

let challenge_button = new Button(w / 3 - 50, h / 2 - 25, 100, 50 ,"Challenge", () => {menu = 2; last_mode_played = "challenge"; reset()});
let training_button = new Button(2 * w / 3 - 50, h / 2 - 25, 100, 50, "Other modes", () => {menu = 4;});
let play_again_button = new Button(w / 3 - 50, 2 * h / 3, 100, 50 ,"Play Again", () => {menu = 2; reset()});
let play_again_button_sniping = new Button(w / 3 - 50, 2 * h / 3, 100, 50 ,"Play Again", () => {menu = 5; reset()});
let play_again_button_precision = new Button(w / 3 - 50, 2 * h / 3, 100, 50 ,"Play Again", () => {menu = 6; reset()});
let back_to_menu  = new Button(2 * w / 3 - 50, 2 * h / 3, 100, 50, "Back to Menu", () => {menu = 1;})
let sniping_button = new Button(w / 4 - 50, h / 3 - 25, 100, 50, "Sniping", () => {menu = 5; last_mode_played = "sniping"; reset();});
let precision_button = new Button(3 * w / 4 - 50, h / 3 - 25, 100, 50, "Precision", () => {menu = 6; last_mode_played = "precision"; reset();});


function Starting_menu(){ 
  this.show = function(){
    challenge_button.show();
    training_button.show();
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(200);
    text("aim booster clone", w / 2, h / 3);
    if(muted % 2 == 1){
      image(muted_button, 7 * w / 8 - 15, h / 6 - 15, 30, 30);
    }else{
      image(unmuted_button, 7 * w / 8 - 15, h / 6 - 15, 30, 30);
    }
  }
}

function Restart_menu(){
  this.show = function(last_mode){
    if(last_mode == "sniping") play_again_button_sniping.show(); 
    if(last_mode == "challenge") play_again_button.show();
    if(last_mode == "precision") play_again_button_precision.show();
    back_to_menu.show();
    textSize(15);
    fill(200);
    text(shots_hit + '/' + (shots_fired - 1), w / 2, h / 3 - 40);
    text("you were " + accuracy + "% accurate", w / 2, h / 3 - 20 );
    text("time:  " + minutes + ":" + seconds, w / 2, h / 3);
    text("final targets/second: " + round(60 / spawn_rate * 100) / 100, w / 2, h / 3 + 20);
    textSize(10);
    text("100%", w / 6 - 70, h / 3 - 30);
    text("0%", w / 6 - 70, h / 3 + 20);
    text("acc.", w / 6 - 70, (h / 3 + 20) - 25);
    text("time", w / 6, (h / 3 + 20) + 10);
    fill(255, 0, 0);
    strokeWeight(2);
    stroke(200);
    ellipse(0.85 * w, h / 3, 120, 120);
    fill(255, 75, 75);
    ellipse(0.85 * w, h / 3, 80, 80);
    fill(255, 150, 150);
    ellipse(0.85 * w, h / 3, 40, 40);
    strokeWeight(2);
    stroke(0);
    shots_array.forEach((i, idx)=>{
       point(0.85 * w - 30 + (i[0] * 2), h / 3 - 30 + (i[1] * 2));     
    });
    stroke(200);
    line(w / 6 - 50, (h / 3 + 20), w / 6 + 50, (h / 3 + 20));
    line(w / 6 - 50, (h / 3 + 20) - 50, w / 6 - 50, (h / 3 + 20));
    line(w / 6 - 55, h / 3 - 30, w / 6 - 45, h / 3 - 30);
    stroke(80);
    accuracy_array.forEach((i, idx) => {
      accuracy_array[idx + 1] != null ? line(100 * idx / accuracy_array.length + (w / 6 - 50), (h / 3 + 20) - (50 * i / 100), 100 * (idx + 1) / accuracy_array.length + (w / 6 - 50), (h / 3 + 20) - (50 * accuracy_array[idx + 1] / 100)) : point(50 * idx / accuracy_array.length + (w / 6 - 50), (h / 3 + 20) - (50 * i / 100));
    });
    strokeWeight(3);
    stroke(255, 0, 0);
    lives_lost.forEach((i, idx) => {
      point(100 * i / time_passed + (w / 6 - 50), (h / 3 + 20) - 25);
    })
  }
}

function Training_menu(){
  this.show = function(){
    sniping_button.show();
    precision_button.show();
  }
}

const end_menu = new Restart_menu();
const starting_menu = new Starting_menu();
const training_menu = new Training_menu();