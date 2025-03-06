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

  for (let j = 0; j < video.height; j += 2) {  // Skip every other row for better spacing
    for (let i = 0; i < video.width; i += 2) {  // Skip every other column
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const brightness = (r + g + b) / 3;

      // Smoothened contrast mapping
      const contrast = map(brightness, 80, 170, 255, 0, true);
      const charIndex = floor(map(contrast, 0, 255, density.length - 1, 0));

      fill(0); // Solid black text
      textSize(w * 1.1); // **Larger text for better readability**
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w, j * h + h);
    }
  }
}
function keyPressed() {
    saveCanvas('一以心交心', 'jpg');
}
