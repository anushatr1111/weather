const apiKey = 'fee10f7fae2a7bea2926790e1889179b'; // Replace with your OpenWeatherMap API key

// Function to get weather data
function getWeather(city) {
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // 'units=metric' for Celsius

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
      displayForecast(data.name);
      displayWeatherWidget(data);
    })
    .catch(error => {
      document.getElementById("output").innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}

// Function to display weather data
function displayWeather(data) {
  const cityName = data.name;
  const weatherDescription = data.weather[0].description;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

  const weatherHtml = `
    <h2>Weather in ${cityName}</h2>
    <img src="${iconUrl}" alt="Weather Icon">
    <p>${weatherDescription}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
  
  document.getElementById("output").innerHTML = weatherHtml;
}

// Function to display forecast for the next 5 days
function displayForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let forecastHTML = '<h2>5-Day Forecast</h2>';
      data.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
          forecastHTML += `
            <div class="forecast-day">
              <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
              <p>Temp: ${forecast.main.temp}°C</p>
              <p>${forecast.weather[0].description}</p>
            </div>
          `;
        }
      });
      document.getElementById("forecast").innerHTML = forecastHTML;
    });
}

// Function to display weather widget
function displayWeatherWidget(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;

  document.getElementById('widgetTemperature').textContent = `${temperature}°C`;
  document.getElementById('widgetCondition').textContent = weatherDescription;
}

// Function to get weather by geolocation
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherByLocation(lat, lon);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to fetch weather data using coordinates
function fetchWeatherByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
      displayForecast(data.name);
      displayWeatherWidget(data);
    });
}

window.onload = getWeatherByLocation;
