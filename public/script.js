
async function getWeather(city) {
  const apiKey = 'fee10f7fae2a7bea2926790e1889179b'; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
          document.getElementById("output").innerHTML = `
              <h2>${data.name}, ${data.sys.country}</h2>
              <p>🌡️ Temperature: ${data.main.temp} °C</p>
              <p>☁️ Weather: ${data.weather[0].main}</p>
              <p>💧 Humidity: ${data.main.humidity}%</p>
              <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
          `;
      } else {
          document.getElementById("output").innerHTML = `<p>City not found.</p>`;
      }
  } catch (error) {
      document.getElementById("output").innerHTML = `<p>Error fetching data.</p>`;
  }
}

