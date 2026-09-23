
// === scroll speed ==== //
const PIXELS_PER_METRE = 50;
const WINDOW_MS = 250;


let lastY = window.scrollY;
let windowStart = performance.now();
let pixelsInWindow = 0;
let currentSpeedMs = 0;


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
        console.log(Math.round(pixelsPerSecond) + " px/s  →  " + currentSpeedMs.toFixed(2) + " m/s")
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
    
}
// ===== STEP 6: THE DATA =====

let oceanData;
let animals = [];