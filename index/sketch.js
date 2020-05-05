let classifier;

let video;

let label = 'waiting';

let me = 0;

let they = 0;

let counter = 0;

let hand = '';

let comp = '';

const moves = ['rock', 'paper', 'scissor'];

let judgement = '';

const emoji = {

  rock: '✊',

  paper: '🤚',

  scissor: '✌️',
  scissors: '✌️',

  my: '🖥',

  theyy: '🤸‍',

};

function preload() {

  classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/cKoiA0zr2/model.json');

}



function setup() {

  createCanvas(windowWidth, windowHeight);



  // Create the video

  video = createCapture(VIDEO);

  video.size(1280, 720);

  video.hide();



  // Start classifying

  classifyVideo();



  textAlign(CENTER, CENTER);

}



function draw() {

  background(0);

  imageMode(CENTER);

  image(ml5.flipImage(video), width / 2, height / 2, height * video.width / video.height, height);

  fill(0, 0, 0, 190);

  rect(0, 0, width, height);



  if (hand == label) {

    counter += 1;

  } else if (comp == '') {

    counter = 0;

    hand = label;

  }



  fill(255, 0, 255);

  if (hand != 'neutral' && hand != '') rect(0, 0, map(counter, 0, 10, 0, width), 12);

  fill(255);



  if (comp != '') {

    textSize(48);

    text(` ${emoji.my}: ${emoji[comp]}`, width / 4, height / 8);

    noLoop();

    setTimeout(() => {

      comp = '';

      counter = 0;

      judgement = '';

      loop();

    }, 3000);

  } else if (counter >= 10 && hand != 'neutral' && hand != '' && comp == '') {

    comp = random(moves);



    if ((hand == 'rock' && comp == 'paper') ||

      (hand == 'paper' && comp == 'scissor') ||

      (hand == 'scissor' && comp == 'rock')) { // win

      judgement = `${emoji.my}+1`;

      me += 1;

    } else if (comp == hand) { // tie

      judgement = '±0';

    } else if ((comp == 'rock' && hand == 'paper') ||

      (comp == 'paper' && hand == 'scissor') ||

      (comp == 'scissor' && hand == 'rock')) { // win 

      judgement = `${emoji.theyy}+1`;

      they += 1;

    }
    else {textSize(32);
          text('Retry', 0, 0);}

  } else if (comp == '') {

    classifyVideo();

  }



  if (['rock', 'paper', 'scissor'].includes(hand)) {

    textSize(256);

    text(emoji[hand], width / 2, height / 2);

  } else if (hand == 'neutral') {

    textSize(64);

    text('I’m Ready', width / 2, height / 2);

  } else {

    textSize(64);

    text('Hello!', width / 2, height / 2);

    noLoop();

  }



  textSize(32);

  text(`Scoreboard : ${emoji.my} ${me} : ${they} ${emoji.theyy}`, width / 2, height - 16);

  if (judgement != '') {

    textSize(24);



    if (judgement.includes(emoji.theyy)) fill(0, 255, 0);

    else if (judgement.includes(emoji.my)) fill(255, 0, 0);

    else fill(255);

    text(judgement, width / 2, height - 60);

  }

}



function classifyVideo() {

  classifier.classify(ml5.flipImage(video), gotResult);

}



function gotResult(error, results) {

  if (error) {

    console.error(error);

    return;

  }



  label = results[0].label.toLowerCase();

  loop();

}
