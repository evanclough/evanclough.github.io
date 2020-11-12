let menu = 1;
let starting_frame_count = 0;
let last_spawn;
let spawn_rate = 60;
let lives = 3;
let shots_fired = 0;
let shots_hit = 0;
let accuracy;
let time_passed;
let player_gradient;
let background_gradient;
let muted_button;
let unmuted_button;
let muted = 0;
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
let last_mode_played;

function preload(){
  player_gradient = loadImage("playergradient.png");
  muted_button = loadImage("mute_button.png");
  unmuted_button = loadImage("sound_button.png");
  background_gradient = loadImage("background_gradient.png");
  hit_noise = loadSound("goodhitnoise.mp3");
  miss_noise = loadSound("missnoise.mp3");
  loss_noise = loadSound("lossnoise.mp3");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  
}

function g(){
  image(background_gradient, 0, 0, 600, 400);
  if(muted % 2 == 1){
    hit_noise.setVolume(0);
    miss_noise.setVolume(0);
    loss_noise.setVolume(0);
  }else{
    hit_noise.setVolume(1);
    miss_noise.setVolume(1);
    loss_noise.setVolume(1);
  }
  switch(menu){
    case 1: starting_menu.show(); break;
    case 2: game("challenge"); break;
    case 3: end_menu.show(last_mode_played); break;
    case 4: training_menu.show(); break;
    case 5: game("sniping"); break;
    case 6: game("precision"); break;
  }
}

setInterval(g, 1);

function mouseClicked(){
  if((menu == 2 || menu == 5 || menu == 6) && in_game) {
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
    shot_markers.push(new Shot_Marker(mouseX, mouseY, frameCount));
  }
  if(menu == 1){
    if(mouseX > 7 * w / 8 - 15 && mouseX < 7 * w / 8 + 15 && mouseY > h / 6 - 15 && mouseY < h / 6 + 15){
      muted++;
    }
  }
}