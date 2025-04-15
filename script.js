const apiKey = "893971476f90297c35a0aab354c27d75"; // Replace with your API key

const quotes = [
  "Chase the sunshine, even on cloudy days.",
  "Every storm runs out of rain.",
  "Let your dreams be as vast as the sky.",
  "Sunshine is the best medicine.",
  "Weather the storm with a smile."
];

let isCelsius = true;
let currentTempCelsius = null;

function displayTemperature(tempC) {
  currentTempCelsius = tempC;
  const tempElement = document.getElementById("temp");
  const toggleBtn = document.getElementById("toggleTemp");

  if (isCelsius) {
    tempElement.textContent = `🌡️ ${tempC.toFixed(1)} °C`;
    if (toggleBtn) toggleBtn.textContent = "Switch to °F";
  } else {
    const tempF = (tempC * 9) / 5 + 32;
    tempElement.textContent = `🌡️ ${tempF.toFixed(1)} °F`;
    if (toggleBtn) toggleBtn.textContent = "Switch to °C";
  }
}

function toggleTemperature() {
  isCelsius = !isCelsius;
  if (currentTempCelsius !== null) {
    displayTemperature(currentTempCelsius);
  }
}

function getWeather() {
  const input = document.getElementById("searchInput").value.trim();
  if (!input) return alert("Please enter a city or PIN code");

  const isPin = /^\d{5,6}$/.test(input);
  const apiUrl = isPin
    ? `https://api.openweathermap.org/data/2.5/weather?zip=${input},IN&appid=${apiKey}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error("Location not found");
      return res.json();
    })
    .then(data => {
      document.getElementById("weatherBox").classList.remove("hidden");
      document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("desc").textContent = `🔎 ${data.weather[0].description}`;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("quote").textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

      // Store & display temperature
      displayTemperature(data.main.temp);

      // Background change
      const weather = data.weather[0].main.toLowerCase();
      const body = document.body;
      if (weather.includes("cloud")) {
        body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
      } else if (weather.includes("rain")) {
        body.style.background = "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)";
      } else if (weather.includes("clear")) {
        body.style.background = "linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)";
      } else if (weather.includes("snow")) {
        body.style.background = "linear-gradient(to right, #e6dada, #274046)";
      } else {
        body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
      }
    })
    .catch(error => alert("Error fetching weather: " + error.message));
}

// Date and time
function updateDateTime() {
  const now = new Date();
  const dateTimeStr = now.toLocaleString("en-IN", {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  document.getElementById("datetime").textContent = dateTimeStr;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Geolocation
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords
}
