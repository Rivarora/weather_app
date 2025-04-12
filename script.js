const apiKey = "893971476f90297c35a0aab354c27d75"; // Your API key

const quotes = [
  "Chase the sunshine, even on cloudy days.",
  "Every storm runs out of rain.",
  "Let your dreams be as vast as the sky.",
  "Sunshine is the best medicine.",
  "Weather the storm with a smile."
];

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
      displayWeather(data);
    })
    .catch(error => alert("Error fetching weather: " + error.message));
}

function displayWeather(data) {
  document.getElementById("weatherBox").classList.remove("hidden");
  document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temp").textContent = `🌡️ ${data.main.temp} °C`;
  document.getElementById("desc").textContent = `🔎 ${data.weather[0].description}`;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
}
// Real-time Date & Time
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

// Auto location feature
function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByCoords(lat, lon);
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
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Location not found");
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }
  
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByCoords(lat, lon);
  }
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("You denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
        break;
    }
  }
  function getWeatherByCoords(lat, lon) {
    const apiKey = "893971476f90297c35a0aab354c27d75"; // Use your key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error("Weather not found");
        return res.json();
      })
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        alert("Error fetching weather: " + error.message);
      });
  }
  
      