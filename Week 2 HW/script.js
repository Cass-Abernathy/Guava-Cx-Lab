// =========================================================
// STEP 1: THE DATA
// One array, ordered SMALLEST to LARGEST.
// Each animal is an object { } holding three pieces of info.
// =========================================================

const animals = [
  { name: "Mermaid",         length: 1.5, image: "images/mermaid.jpg" },
  { name: "Harbor Porpoise", length: 1.6, image: "images/porpoise.jpg" },
  { name: "Beluga Whale",    length: 4.5, image: "images/beluga.jpg" },
  { name: "Orca",            length: 8,   image: "images/orca.jpg" },
  { name: "Minke Whale",     length: 9,   image: "images/minke.jpg" },
  { name: "Humpback Whale",  length: 15,  image: "images/humpback.jpg" },
  { name: "Blue Whale",      length: 30,  image: "images/bluewhale.jpg" }
];

// =========================================================
// STEP 2: REMEMBER WHERE WE ARE
// currentIndex is the position in the array we are showing.
// Position 3 is the Orca, so that is where the story starts.
// It uses "let" instead of "const" because it CHANGES.
// =========================================================

let currentIndex = 3;

// =========================================================
// STEP 3: GRAB THE PAGE ELEMENTS
// document.getElementById finds an HTML tag by its id
// and hands it to us so we can change it later.
// =========================================================

const photo = document.getElementById("animal-photo");
const nameText = document.getElementById("animal-name");
const lengthText = document.getElementById("animal-length");
const smallerButton = document.getElementById("smaller-button");
const largerButton = document.getElementById("larger-button");


// =========================================================
// STEP 4: ONE FUNCTION THAT UPDATES THE PAGE
// We write this ONCE and call it every time something changes,
// instead of repeating the same lines in both buttons.
// =========================================================

function showAnimal() {

  // Pull the one animal we currently care about out of the array.
  const animal = animals[currentIndex];

  // Put its info onto the page.
  photo.src = animal.image;
  photo.alt = "Photo of " + animal.name;
  nameText.textContent = animal.name;
  lengthText.textContent = animal.length + " meters long";

  // Turn off a button when there is nothing left in that direction.
  // animals.length is 7, so the last position is 6.
  smallerButton.disabled = (currentIndex === 0);
  largerButton.disabled = (currentIndex === animals.length - 1);
}


// =========================================================
// STEP 5: THE EVENTS
// addEventListener says: "when THIS thing happens to THIS
// element, run this function."
// =========================================================

// EVENT 1 - click "Smaller": step one position DOWN the array.
smallerButton.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex = currentIndex - 1;
    showAnimal();
  }
});

// EVENT 2 - click "Larger": step one position UP the array.
largerButton.addEventListener("click", function () {
  if (currentIndex < animals.length - 1) {
    currentIndex = currentIndex + 1;
    showAnimal();
  }
});

// =========================================================
// STEP 6: START THE PAGE
// Nothing has been clicked yet, so we call showAnimal() once
// by hand to draw the orca when the page first loads.
// =========================================================

showAnimal();

