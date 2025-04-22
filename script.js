const demon = document.getElementById("demon");
const citySpan = document.getElementById("city");
const countrySpan = document.getElementById("country");

// Follow cursor
document.addEventListener("mousemove", (e) => {
  demon.style.transform = `translate(${e.pageX - 50}px, ${e.pageY - 50}px)`;
});

// Creepy background cycle
const backgrounds = [
  "#000000", "#1a1a1a", "#330000", "#0d0d0d"
];

setInterval(() => {
  document.body.style.backgroundColor = backgrounds[Math.floor(Math.random() * backgrounds.length)];
}, 3000);

// Location detection
fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    citySpan.textContent = data.city || "your city";
    countrySpan.textContent = data.country_name || "your country";
  })
  .catch(() => {
    citySpan.textContent = "an unknown place";
    countrySpan.textContent = "somewhere dark";
  });
