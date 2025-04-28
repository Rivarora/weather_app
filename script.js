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


function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function getWeatherByCoords(lat, lon) {
  const apiKey = "34cbac9a046105efb7e62a6405ea0d71"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

function displayWeather(data) {
  document.getElementById("weatherBox").classList.remove("hidden");
  document.getElementById("location").innerText = data.name;
  document.getElementById("temp").innerText = `${data.main.temp}°C`;
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("quote").innerText = getMotivationalQuote(); // Optional
}

function getMotivationalQuote() {
  const quotes = [
    "Keep shining, no matter the weather!",
    "You're as bright as the sun today ☀️",
    "Let your dreams rain success 🌧️",
    "Every storm passes. Stay strong!",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}
function updateClock() {
  const now = new Date();
  
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  
  // AM/PM format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  
  // Pad minutes and seconds with leading zeros
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
  
  // Display time
  document.getElementById('clock').textContent = timeString;

  // Display the date in format: Day, Month Date, Year
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  document.getElementById('date').textContent = dateString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize clock immediately
updateClock();
// Theme toggle logic
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
  updateToggleText(savedTheme);
} else {
  body.classList.add('light'); // default to light theme
}

// Toggle button click
toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    body.classList.replace('light', 'dark');
    localStorage.setItem('theme', 'dark');
    updateToggleText('dark');
  } else {
    body.classList.replace('dark', 'light');
    localStorage.setItem('theme', 'light');
    updateToggleText('light');
  }
});

// Update button text/icon
function updateToggleText(theme) {
  toggleBtn.textContent = theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode';
}
function askUser() {
  alert("Hey there! How are you feeling today? 😊");
}
function updateClockAndDate() {
  const now = new Date();
}

function showActivityRecommendations() {
  // Assuming you already have weather information in your page, 
  // especially the description of the weather in the element with id="desc"
  const weatherDescription = document.getElementById('desc').innerText.toLowerCase();

  let recommendation = "";

  // Check the weather description and suggest activities
  if (weatherDescription.includes("clear") || weatherDescription.includes("sunny") || weatherDescription.includes("bright")) {
    recommendation = "It's sunny! Perfect day for swimming 🏊‍♂️.";
  } else if (weatherDescription.includes("rain") || weatherDescription.includes("storm")) {
    recommendation = "It's rainy. Stay indoors with a cozy movie 🎥.";
  } else {
    recommendation = "Weather looks okay! How about a nice walk or run outside? 🏃‍♂️";
  }

  // Display the recommendation as an alert (You could also choose to display it in a modal or another element)
  alert(recommendation);
}

  
