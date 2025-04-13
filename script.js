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


  
      