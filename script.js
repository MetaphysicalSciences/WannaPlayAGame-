const dialogue = document.getElementById('dialogue');
const nameBox = document.getElementById('name');
const choicesBox = document.getElementById('choices');
const locationBox = document.getElementById('location-reveal');

let anger = 0;
let locationData = {
  country: "your country",
  city: "your city",
  address: "Unknown street, Number 666",
  ip: "000.000.000.000"
};

// Fake IP generator
function fakeIP() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
}

// Load actual location data
fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    locationData.country = data.country_name || "your country";
    locationData.city = data.city || "your city";
    locationData.ip = data.ip || fakeIP();
  });

// Dialogue system
const stages = [
  {
    text: "Do you believe in demons?",
    choices: ["Yes", "No"]
  },
  {
    text: "Do you fear being watched?",
    choices: ["A little", "No", "Yes"]
  },
  {
    text: "Would you sell your soul?",
    choices: ["No", "Maybe", "Absolutely"]
  },
  {
    text: "Why are you still here?",
    choices: ["I'm curious", "You scare me", "Go away"]
  }
];

let stage = 0;

function advance(choiceText) {
  anger += evaluateChoice(choiceText);
  stage++;
  checkAngerLevel();
  if (stage < stages.length) {
    showStage();
  } else {
    finalStage();
  }
}

function evaluateChoice(text) {
  if (text.includes("No") || text.includes("Go away")) return 1;
  if (text.includes("Absolutely")) return 2;
  return 0;
}

function showStage() {
  dialogue.textContent = stages[stage].text;
  choicesBox.innerHTML = "";
  stages[stage].choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.className = 'choice-btn';
    btn.onclick = () => advance(choice);
    choicesBox.appendChild(btn);
  });
}

function checkAngerLevel() {
  if (anger === 1) {
    locationBox.textContent = `You're in ${locationData.country}, aren't you?`;
  } else if (anger === 2) {
    locationBox.textContent = `I know your city too... ${locationData.city}`;
  } else if (anger === 3) {
    locationBox.textContent = `Your address? Something like: ${locationData.address}`;
  } else if (anger >= 4) {
    locationBox.textContent = `Your IP: ${locationData.ip} — I warned you.`;
  }
}

function finalStage() {
  dialogue.textContent = "You’ve said too much. Now I come for you.";
  choicesBox.innerHTML = "";
}

// Start game
showStage();
