function game(){
  in_game = true;
  on_target = false;
  textSize(50);
  fill(0);
  time_passed += 1/60;
  minutes = floor(time_passed / 60)
  seconds = round(time_passed) % 60 < 10 ? "0" + round(time_passed) % 60 : round(time_passed) % 60;
  strokeWeight(0);
  text(minutes + ":" + seconds , w / 2, h / 2);
  textSize(30);
  text("lives: " + lives, w / 2, h / 2 + 50);
  spawn_rate = 60 / log(((frameCount - starting_frame_count) / 200 + 1));
  if(frameCount - last_spawn > spawn_rate) {
    last_spawn = frameCount;
    targets.push(new Target(random() * 760 + 20, random() * 460 + 20, frameCount));
  }
  for(let i = targets.length - 1; i >= 0; i--){
    targets[i].show();
    if(targets[i].last_frame == frameCount) {
      targets.splice(i, 1);
      lives--;
      loss_noise.play();
      lives_lost.push(time_passed);
    }
  }
  for(let i = target_shadows.length - 1; i >= 0; i--){
    target_shadows[i].show();
    if(target_shadows[i].ending_frame < frameCount){
      target_shadows.splice(i, 1);
    }
  }
  accuracy = round(shots_hit / (shots_fired - 1) * 100);
  if(frameCount % 60 == 0) accuracy_array.push(accuracy);
  if(lives == 0) {
    in_game = false;
    menu = 3;
  }
}