const apiKey = '50a302ec07f5e90f5d54a02dcd0c714a'; 

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`City not found: ${response.statusText}`);
    }
    const data = await response.json();
    updateWeatherInfo(data);
    updateBackground(data.weather[0].main);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert(error.message);
  }
}
function updateWeatherInfo(data) {
    const location = document.getElementById('location');
    const temp = document.getElementById('temp');
    const desc = document.getElementById('desc');
    const icon = document.getElementById('icon');
  
    location.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `Temperature: ${data.main.temp}°C`;
    desc.textContent = `Condition: ${data.weather[0].description}`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }
  function updateBackground(weatherCondition) {
    const body = document.body;
    let backgroundUrl = '';
  
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        backgroundUrl = 'url("images/clear.jpg")';
        break;
      case 'clouds':
        backgroundUrl = 'url("images/cloudy.jpg")';
        break;
      case 'rain':
        backgroundUrl = 'url("images/rainy.jpg")';
        break;
      case 'snow':
        backgroundUrl = 'url("images/snowy.jpg")';
        break;
      case 'thunderstorm':
        backgroundUrl = 'url("images/thunderstorm.jpg")';
        break;
      default:
        backgroundUrl = 'url("images/default.jpg")';
        break;
    }
  
    body.style.backgroundImage = backgroundUrl;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
  }
  document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('searchInput').value.trim();
    if (city) {
      getWeather(city);
    } else {
      alert('Please enter a city name.');
    }
  });
      