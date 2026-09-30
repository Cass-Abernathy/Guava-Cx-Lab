
// === scroll speed ==== //
// Map scale: 50 pixels of page = 1 metre of ocean.
// Calibrated from measured scrolling (~60 px/s comfortable) so the
// animals' cruising speeds (0.6-3.1 m/s) fall within reach.
const PIXELS_PER_METRE = 50;
const WINDOW_MS = 250;


let lastY = window.scrollY;
let windowStart = performance.now();
let pixelsInWindow = 0;
let currentSpeedMs = 0;
let fishX = 0;


function measureScroll() {
    const nowY = window.scrollY;
    pixelsInWindow += Math.abs(nowY - lastY);
    lastY = nowY;
}

function updateSpeed() {
    const now = performance.now();
    const elapsed = now - windowStart;

    if (elapsed >= WINDOW_MS) {
        const pixelsPerSecond = (pixelsInWindow / elapsed) * 1000;
        currentSpeedMs = pixelsPerSecond / PIXELS_PER_METRE;
        //console.log(Math.round(pixelsPerSecond) + " px/s  →  " + currentSpeedMs.toFixed(2) + " m/s")
        pixelsInWindow = 0;
        windowStart = now;
    }
}

window.addEventListener('scroll', measureScroll);

// ==== matching ==== //
function findAnimal(speedMs) {
    let match = animals[0];
    
    for (let i = 0; i < animals.length; i++) {
        if (speedMs >= animals[i].cruise_ms) { 
            match = animals[i];
        }
    }
    return match;
}



// ==== step 5 the p5 sketch ==== //
function preload() {
  oceanData = loadJSON("data.json");
}
function setup() {
    const canvas = createCanvas(600, 400);
    canvas.parent('sketch-holder');
    
    animals = oceanData.animals;

  console.log("animals loaded:", animals.length);
  console.log("slowest:", animals[0].name, animals[0].cruise_ms);
  console.log("fastest:", animals[animals.length - 1].name, animals[animals.length - 1].cruise_ms);
}

function draw() {
    updateSpeed();
    background(10, 60, 110);

    if (animals.length === 0) {
        return;
    }

    const animal = findAnimal(currentSpeedMs);

    noStroke();
    fill(255);
    textSize(14);
    textAlign(CENTER);
    text(currentSpeedMs.toFixed(2) + " m/s", width/2, 60); 

    textSize(28);
    text(animal.name, width/2, 110);

    textSize(13)
    text(animal.blurb, 60, 150, width -120);
    
    fishX += animal.cruise_ms *PIXELS_PER_METRE * (deltaTime/1000);
    if (fishX > width +60) {
        fishX = -60;
    }  

    drawAnimal (fishX, 240);

    drawChart(animal);
    
}
// ===== STEP 6: THE DATA =====

let oceanData;
let animals = [];

// ====DRAWING THE ANIMAL=====
function drawAnimal(x, y) {
    noStroke();
    fill(230,245,255);
    ellipse (x,y,70,28);
    triangle (x-30, y, x-55, y-16, x-55, y+16);
}

//===DRAWING THE CHART ====

function drawChart(animal) {
    const chartTop=290;
    const chartHeight = 80;
    const barWidth = width /animals.length;
    const fastest = animals[animals.length - 1].cruise_ms;

    for (let i = 0; i < animals.length; i++) {
        const barHeight = map(animals[i].cruise_ms, 0, fastest, 1, chartHeight);
        const x = i * barWidth;
        const y = chartTop + chartHeight - barHeight;

        noStroke();

        if (animals[i] === animal) {
            fill(255, 220, 120);
        } else {
            fill(255, 255, 255, 60);
        }
        rect(x + 2, y, barWidth - 4, barHeight);
    }

    const clamped = constrain(currentSpeedMs, 0, fastest);
    const markerY = chartTop + chartHeight - map(clamped, 0, fastest, 1, chartHeight);

    stroke (255,120,120);
    strokeWeight(2);
    line(0, markerY, width, markerY);
    noStroke();
}