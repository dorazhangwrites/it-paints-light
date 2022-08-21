let capture;
let w = 600;
let h = 600;
let brightestLocation = 0;
let brightestValue = 0;
let particles = [];
let buffer;
let xLoc,yLoc;
let oldX,oldY;
let pos = [];

function setup() {
  let canvas = createCanvas(displayWidth, displayHeight);
  
  background(0);
  buffer = createGraphics(displayWidth, displayHeight);
  capture = createCapture({
    video: {
      mandatory: {
        minWidth: 400,
        minHeight: 400,
        maxWidth: 400,
        maxHeight: 400
      }
    }
  });
  capture.hide();
}

function draw() {

  capture.loadPixels();

  if (capture.pixels.length > 0) {

    brightestLocation = 0;
    brightestValue = -1000;

    for (let i = 0; i < capture.pixels.length; i+=4) {
      let b = (capture.pixels[i] + capture.pixels[i + 1] + capture.pixels[i + 2]) / 3;
      if (b > brightestValue) {
        brightestValue = b;
        brightestLocation = i;
      }
    }

    image(buffer,0,0);
    
    xLoc = (brightestLocation/4) % displayWidth;
    yLoc = (brightestLocation/4) / 250;
    oldX = xLoc;
    oldY = yLoc;
    // console.log(oldX,oldY,xLoc,yLoc);
    particles.push(new Particles(xLoc,yLoc));

    for(let i = 0; i < particles.length;i++){
      particles[i].update();
      particles[i].show();
    }
    
  }
}


function Particles(x,y) {

  this.pos = createVector(x, y);
  this.oldPos = createVector(this.pos.x, this.pos.y);
  this.randomSpeed = random(0.1,1);
  this.noiseScale = 300;
  this.noiseSize = 20;
  this.strokeSize = random(0.1,3);

  this.update = function(){
    let angle = noise(this.pos.x / this.noiseScale,
      this.pos.y / this.noiseScale) * this.noiseSize;
    this.pos.add(
        cos(angle) * this.randomSpeed,
        sin(angle) * this.randomSpeed
    );
  }

  this.show = function(){
    strokeWeight(this.strokeSize);
    // stroke(153, 209, 136,60);
    // line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y);

    // stroke(222, 195, 98,70);
    // line(this.oldPos.x, this.oldPos.y, this.pos.x+7, this.pos.y);
    
    stroke(112, 100, 154,200);
    line(this.oldPos.x, this.oldPos.y, this.pos.x+30, this.pos.y+15);  

    stroke(155, 144, 194,140);
    line(this.oldPos.x, this.oldPos.y, this.pos.x+15, this.pos.y);  
  };

}
