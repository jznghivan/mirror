const density = '以心交心一'
let video;

function setup() {
  createCanvas(720, 450);
  video = createCapture(VIDEO);
  video.size(80, 60); // Adjusted for better ASCII representation
  video.hide();
  button = createButton('save');
  button.position(674, 506);
  button.mousePressed(keyPressed);
}

function draw() {
  background(0); // Changed to black for better contrast
  let w = width / video.width;
  let h = height / video.height;
  video.loadPixels();

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (video.width - i + (j * video.width)) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      noStroke();
      fill(255); // White text for high contrast

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len - 1, 0));

      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
  }
  }
}
function keyPressed() {
  // this will download the frame
    saveCanvas('一以心交心', 'jpg');
}
