function game(mode){
  let max_r;
  let is_sniping;
  if(mode == "challenge"){
    spawn_rate = 60 / log((frameCount - starting_frame_count) / 200 + 1);    
    max_r = 15;
    is_sniping = false;
  }else if(mode == "sniping"){
    spawn_rate = 60 / log((frameCount - starting_frame_count) / 600 + 1);
    targets.forEach((i, idx) => {
      if(i.x > w - i.r || i.x < i.r) i.theta = PI - i.theta;
      if(i.y > h - i.r || i.y < i.r) i.theta = TWO_PI - i.theta;
    })
    max_r = 5;
    is_sniping = true;
  }else if(mode == "precision"){
    max_r = 2.5;
    is_sniping = false;
    spawn_rate = 60 / log((frameCount - starting_frame_count) / 1200 + 1);
  }
  stroke(200);
  strokeWeight(0.1);
  for(let i = 25; i < w; i += 25) line(i, 0, i, h);
  for(let i = 25; i < h; i += 25) line(0, i, w, i);
  in_game = true;
  on_target = false;
  textSize(50);
  fill(200);
  time_passed += 1/250;
  minutes = floor(time_passed / 60)
  seconds = round(time_passed) % 60 < 10 ? "0" + round(time_passed) % 60 : round(time_passed) % 60;
  strokeWeight(0);
  text(minutes + ":" + seconds , w / 2, h / 2);
  textSize(30);
  text("lives: " + lives, w / 2, h / 2 + 50);
  if(frameCount - last_spawn > spawn_rate) {
    last_spawn = frameCount;
    targets.push(new Target(random() * 560 + 20, random() * 360 + 20, max_r, frameCount, is_sniping, random() * TWO_PI));
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
    if(target_shadows[i].last_frame < frameCount) target_shadows.splice(i, 1); 
  }
  for(let i = shot_markers.length - 1; i >= 0; i--){
    shot_markers[i].show();
    if(shot_markers[i].last_frame < frameCount) shot_markers.splice(i, 1);
  }
  accuracy = round(shots_hit / (shots_fired - 1) * 100);
  if(frameCount % 60 == 0) accuracy_array.push(accuracy);
  if(lives == 0) {
    in_game = false;
    menu = 3;
  }
}
