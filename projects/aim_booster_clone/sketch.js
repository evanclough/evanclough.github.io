let menu = 1;
let starting_frame_count = 0;
let last_spawn;
let spawn_rate = 60;
let lives = 3;
let shots_fired = 0;
let shots_hit = 0;
let accuracy;
let time_passed;
let background_gradient;
let player_gradient;
let hit_noise;
let miss_noise;
let loss_noise;
let minutes;
let seconds;
let shots_array = [];
let accuracy_array = [];
let lives_lost = [];
let in_game = false;
let on_target = false;
function preload(){
  background_gradient = loadImage("backgroundgradient.jpg");
  player_gradient = loadImage("playergradient.png");
  hit_noise = loadSound("goodhitnoise.mp3");
  miss_noise = loadSound("missnoise.mp3");
  loss_noise = loadSound("lossnoise.mp3");
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(220);
  image(background_gradient, 0, 0, w, h);
  switch(menu){
    case 1: starting_menu.show(); break;
    case 2: game(); break;
    case 3: end_menu.show(); break;
  }
}

function mouseClicked(){
  if(menu == 2 && in_game) {
    shots_fired++;
    for(let i = targets.length - 1; i >= 0; i--){
      if(targets[i].mouse_is_on){
        on_target = true;
        shots_hit++;
        shots_array.push([(mouseX - (targets[i].x - 15)), mouseY - (targets[i].y - 15)]);
        target_shadows.push(new Target_Shadow(targets[i].x, targets[i].y, mouseX, mouseY, targets[i].r,  frameCount));
        targets.splice(i, 1);
      break;
      }
    }
    on_target ? hit_noise.play() : miss_noise.play();
  }
}