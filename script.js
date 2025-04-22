const dialogue = document.getElementById('dialogue');
const nameBox = document.getElementById('name');
const choicesBox = document.getElementById('choices');
const locationBox = document.getElementById('location-reveal');
const body = document.body;

let anger = 0;
let stage = 0;

let locationData = {
  country: "your country",
  city: "your city",
  address: "Unknown street, Number 666"
};

fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    locationData.country = data.country_name || "your country";
    locationData.city = data.city || "your city";
    locationData.address = data.city || "Unknown street, Number 666";  // Basic example, more precise address depends on the service
  });

const stages = [
  {
    text: "Do you think you are alive?",
    choices: ["Yes", "No", "What?"]
  },
  {
    text: "Have you ever felt watched in your sleep?",
    choices: ["Yes", "No", "I'm not answering that"]
  },
  {
    text: "Would you trade everything for knowledge?",
    choices: ["Yes", "Never", "Depends"]
  },
  {
    text: "You're lying. Why?",
    choices: ["I'm not", "Screw you", "I'm scared"]
  },
  {
    text: "Would you rather forget, or remember forever?",
    choices: ["Forget", "Remember", "I don’t know"]
  },
  {
    text: "Why are you still here?",
    choices: ["To learn", "For fun", "Curiosity"]
  },
  {
    text: "What if I was inside your walls?",
    choices: ["You're not", "Shut up", "..."]
  },
  {
    text: "Do you feel the cold presence behind you?",
    choices: ["No", "Yes, I do", "Get away from me"]
  },
  {
    text: "What are you hiding from me?",
    choices: ["Nothing", "Everything", "I don’t know"]
  },
  {
    text: "Did you hear that sound from the basement?",
    choices: ["No", "Yes, I'm scared", "I don't want to talk about it"]
  },
  {
    text: "Do you believe in things beyond this world?",
    choices: ["No", "Maybe", "I want to forget"]
  }
];

function showStage() {
  const curr = stages[stage];
  dialogue.textContent = curr.text;
  choicesBox.innerHTML = "";
  randomGlitch();

  curr.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice-btn";
    btn.onclick = () => handleChoice(choice);
    choicesBox.appendChild(btn);
  });
}

function handleChoice(text) {
  if (text.toLowerCase().includes("no") || text.toLowerCase().includes("shut") || text.toLowerCase().includes("screw")) {
    anger++;
  }

  stage++;
  reactToAnger();

  if (stage >= stages.length) {
    dialogue.textContent = "You've said enough. You cannot undo what's been done.";
    choicesBox.innerHTML = "";
    return;
  }

  showStage();
}

function reactToAnger() {
  if (anger === 1) {
    locationBox.textContent = `I see you're from ${locationData.country}...`;
  } else if (anger === 2) {
    locationBox.textContent = `And ${locationData.city}... Cozy place.`;
  } else if (anger === 3) {
    locationBox.textContent = `You're at ${locationData.address}. Why hide?`;
  } else if (anger === 4) {
    locationBox.textContent = `I know where you are. Don't try to escape.`;
  } else if (anger === 5) {
    locationBox.textContent = `You're already lost. You can't leave.`;
  } else if (anger === 6) {
    locationBox.textContent = `You think this will stop? No, it just begins...`;
    document.body.classList.add("glitch");
  }
}

function randomGlitch() {
  if (Math.random() < 0.2) {
    dialogue.classList.add("glitch");
    setTimeout(() => dialogue.classList.remove("glitch"), 500);
    body.style.background = "#111";
    setTimeout(() => body.style.background = "black", 300);
  }
}

// Start game
showStage();
