const density = '以心交心 一'; 
let video;

function setup() {
  createCanvas(720, 450);
  video = createCapture(VIDEO);
  video.size(60, 37); 
  video.hide();

  button = createButton('save');
  button.position(674, 506);
  button.mousePressed(keyPressed);
}

function draw() {
  background(255);
  let w = (width / video.width) * 1.2; 
  let h = (height / video.height) * 1.2; 

  video.loadPixels();

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (video.width - i + 1 + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      noStroke();
      fill(avg * 1.1); 

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len - 1));

      textAlign(CENTER, CENTER);
      textSize(constrain(w, 8, 20)); 
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}

function keyPressed() {
  saveCanvas('一以心交心', 'jpg');
}
