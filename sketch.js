const density = '以心交心一'
let video;

function setup() {
  createCanvas(640, 480); 
  video = createCapture(VIDEO);
  video.size(160, 120); 
  video.hide();
}

function draw() {
  background(255); // Ensure the background is white
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

      // Smoothened contrast mapping
      const contrast = map(brightness, 80, 170, 255, 0, true); 
      const charIndex = floor(map(contrast, 0, 255, density.length - 1, 0));

      fill(0, 100); // Even softer black text with more transparency
      textSize(w * 0.5); // Smaller text for more blending
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}
function keyPressed() {
    saveCanvas('一以心交心', 'jpg');
}
