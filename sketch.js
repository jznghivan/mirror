const density = '以心交心一'
let video;

function setup() {
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.size(320, 240); 
  video.hide();
}

function draw() {
  background(0); 
  let w = width / video.width;
  let h = height / video.height;
  video.loadPixels();

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const brightness = (r + g + b) / 3;

      const contrast = map(brightness, 50, 200, 0, 255);
      const charIndex = floor(map(contrast, 0, 255, density.length - 1, 0));

      fill(255); 
      textSize(w * 0.8); 
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}
function keyPressed() {
    saveCanvas('一以心交心', 'jpg');
}
