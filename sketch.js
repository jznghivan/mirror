const density = '以心交心一';
let video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(floor(width / 10), floor(height / 10)); // Scale dynamically
  video.elt.setAttribute("playsinline", ""); // Fix for mobile
  video.hide();
}

function draw() {
  background(255);
  let w = width / video.width;
  let h = height / video.height;
  video.loadPixels();

  if (video.pixels.length > 0) { // Check if pixels are loaded
    for (let j = 0; j < video.height; j++) {
      for (let i = 0; i < video.width; i++) {
        const pixelIndex = (video.width - i + 1 + j * video.width) * 4;
        const r = video.pixels[pixelIndex + 0];
        const g = video.pixels[pixelIndex + 1];
        const b = video.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;
        
        noStroke();
        fill(avg);

        const len = density.length;
        const charIndex = floor(map(avg, 0, 255, 0, len));

        textSize(constrain(h, 8, 20)); // Adjust text size dynamically
        textAlign(CENTER, CENTER);
        text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
      }
    }
  }
}

// Resize canvas and update video size on screen rotation
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(floor(width / 10), floor(height / 10));
}

// Save the canvas when a key is pressed
function keyPressed() {
  saveCanvas('一以心交心', 'jpg');
}
