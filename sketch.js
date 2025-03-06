const density = '以心交心一'
let video;

function setup() {
  createCanvas(720,450);
  video = createCapture(VIDEO);
  video.size(72,45);
  video.hide();
  button = createButton('save');
  button.position(674, 506);
  button.mousePressed(keyPressed);
}

function draw() {
  background(255);
  let w = width / video.width;
  let h = height / video.height;
  video.loadPixels();

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      
      // Refined mapping for sharper contrast
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));

      fill(0); // Black text
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5); 
    }
  }
}
function keyPressed() {
    saveCanvas('一以心交心', 'jpg');
}
