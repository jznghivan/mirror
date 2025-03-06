const density = '以心交心一';
let video;
let frameDepth = 10; // Default depth, can be adjusted dynamically

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(getOptimalResolution(width, height)); // Dynamically set resolution
  video.elt.setAttribute("playsinline", ""); // Ensure mobile compatibility
  video.hide();
}

function draw() {
  background(255);
  let w = width / video.width;
  let h = height / video.height;
  video.loadPixels();

  if (video.pixels.length > 0) { // Ensure video is loaded
    for (let j = 0; j < video.height; j++) {
      for (let i = 0; i < video.width; i++) {
        const pixelIndex = (video.width - i + 1 + j * video.width) * 4;
        const r = video.pixels[pixelIndex + 0];
        const g = video.pixels[pixelIndex + 1];
        const b = video.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;
        
        noStroke();
        fill(0); // Set text color to black

        const len = density.length;
        const charIndex = floor(map(avg, 0, 255, 0, len));

        textSize(constrain(h * 0.8, 10, 25)); // Adjust size dynamically
        textAlign(CENTER, CENTER);
        text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
      }
    }
  }

  // Draw bottom text
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(0);
  text("一以心交心, connect with the heart", width / 2, height - 40);
}

// Dynamically determine resolution based on frame depth
function getOptimalResolution(w, h) {
  let depthFactor = map(frameDepth, 1, 30, 20, 5); // Adjust range as needed
  return [floor(w / depthFactor), floor(h / depthFactor)];
}

// Resize canvas and update video size when screen changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(getOptimalResolution(width, height));
}

// Save the canvas when a key is pressed
function keyPressed() {
  saveCanvas('一以心交心', 'jpg');
}
