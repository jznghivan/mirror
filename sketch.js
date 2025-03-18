let fps = 30;
let capturer;
let numOfFramesToCapture = 0;
let capturingStartFrame = null;
if (numOfFramesToCapture) {
  capturer = new CCapture({ format: "png", framerate: fps });
}
let d; 
let capture; 
let pg; 
let isMirrored; 
let isCropped; 

// frame difference
let ppg; // previous pg
let diffRatioThreshold;

let bu;

let tileSize;
let noiseSize;
let bgValue;
let zSpeed;

let button; 

function setup() {
  createCanvas(720, 450);
  frameRate(30);
  capture = createCapture(VIDEO);
  capture.hide();
  d = pixelDensity();
  isMirrored = true;
  isCropped = true;
  
  bu = width > height ? height : width; 
  pg = undefined;
  ppg = undefined;
  diffRatioThreshold = 0.1;
  
  randomSeed(7);

  bgValue = 0;
  tileSize = width / 32;
  noiseSize = width;
  zSpeed = 1 / 100;

  background(bgValue);
  
  // Create the save button inside the canvas boundaries
  button = createButton('save');
  button.position(600, 550); 
  button.style('z-index', '10'); 
  button.mousePressed(() => saveCanvas('一以心交心', 'jpg')); 
}

function draw() {
  if (numOfFramesToCapture) {
    if (frameCount === capturingStartFrame) {
      capturer.start();
    } else if (frameCount >= capturingStartFrame + numOfFramesToCapture) {
      noLoop();
      console.log("finished recording.");
      capturer.stop();
      capturer.save();
      return;
    }
  }

  if (!capture.loadedmetadata) {
    if (frameCount % 30 > 15) {
      circle(width/2, height/2, bu / 64);
    }
  } else {
    if (pg === undefined) {
      pg = createGraphics(
        floor(width / tileSize),
        floor(height / tileSize)
      );
      ppg = createGraphics(
        pg.width,
        pg.height
      );
      capturingStartFrame = frameCount + fps;
    }
    if (isCropped) {
      /* cropped to fit */
      if (pg.width / pg.height > capture.width / capture.height) {
        let destHeight = (pg.width * capture.height) / capture.width;
        pg.image(
          capture,
          0,
          -(destHeight - pg.height) / 2,
          pg.width,
          destHeight
        );
      } else {
        let destWidth = (pg.height * capture.width) / capture.height;
        pg.image(capture, -(destWidth - pg.width) / 2, 0, destWidth, pg.height);
      }
    } else {
      pg.image(capture, 0, 0, pg.width, pg.height);
    }
    ppg.loadPixels();
    pg.loadPixels();

    background(bgValue);
    for (let y = tileSize / 2; y < height; y += tileSize) {
      for (let x = tileSize / 2; x < width; x += tileSize) {
        let c; 
        let pc; 
        let cb; 
        let pcb; 
        let j = floor(x/tileSize);
        let i = floor(y/tileSize);
        let rectSize = tileSize - tileSize / 4;
        colorMode(RGB);
        if (isMirrored) {
          pc=color(
            ppg.pixels[(d * i * pg.width + pg.width - j - 1) * d * 4],
            ppg.pixels[(d * i * pg.width + pg.width - j - 1) * d * 4 + 1],
            ppg.pixels[(d * i * pg.width + pg.width - j - 1) * d * 4 + 2]
          ); // mirroring the color
          c=color(
            pg.pixels[(d * i * pg.width + pg.width - j - 1) * d * 4],
            pg.pixels[(d * i * pg.width + pg.width - j - 1) * d * 4 + 1],
            pg.pixels[(d * i * pg.width + pg.width - j - 1) * d * 4 + 2]
          ); // mirroring the color
        } else {
          pc=color(
            ppg.pixels[(d * i * pg.width + j) * d * 4],
            ppg.pixels[(d * i * pg.width + j) * d * 4 + 1],
            ppg.pixels[(d * i * pg.width + j) * d * 4 + 2]
          );
          c=color(
            pg.pixels[(d * i * pg.width + j) * d * 4],
            pg.pixels[(d * i * pg.width + j) * d * 4 + 1],
            pg.pixels[(d * i * pg.width + j) * d * 4 + 2]
          );
        }
        cb = brightness(c);
        pcb = brightness(pc);
        
        let diffRadio = abs(cb-pcb)/100;
        
//         // converts to grayscale
//         if (diffRadio<diffRatioThreshold) {
//           colorMode(RGB);
//           c = color(map(cb,0,100,0,255));
//           textSize((rectSize * 4) / 3);
//           // c = color(245);
//         } else {
//           c = color(map(cb,0,100,0,255));
//           textSize((rectSize * 4) / 3);
//           // c = 245;
//           colorMode(HSB);
//           // c = color(map(cb,0,100,0,255));
//           c = color(hue(c), 100, 100);
//         }
        colorMode(HSB);
        c = color(hue(c), saturation(c)*diffRadio*2, brightness(c));
        textSize((rectSize * 4) / 3 * (1+2*diffRadio));
      

        // noFill();
        // strokeWeight(tileSize/8);
        // stroke(c);
        translate(x, y);
        noStroke();
        fill(c);
        // fill(245);
        textAlign(CENTER, CENTER);
        // textSize(rectSize*7/6);
        rotate(TWO_PI*brightness(c) / 100);
        // rotate(TWO_PI*diffRadio);
        text(brightnessToChar(cb), 0, 0);
        // stroke(255);
        // strokeWeight(3);
        // point(0, 0);
        rotate(-TWO_PI*brightness(c) / 100);
        // rotate(-TWO_PI*diffRadio);
        translate(-x, -y);

      }
    }
    ppg.image(pg, 0, 0);
  }

  /* canvas capturing starts */
  if (numOfFramesToCapture && frameCount >= capturingStartFrame) {
    console.log("capturing frame");
    capturer.capture(document.getElementById("defaultCanvas0"));
  }
}

function keyPressed() {
  saveCanvas('一以心交心', 'jpg');
}

function brightnessToChar(b) {
  let charList = "以心交心";
  let index = floor(map(b, 0, 100, 0, charList.length - 1));
  return charList[index];
}
