const apiKey = 'fee10f7fae2a7bea2926790e1889179b'; // Replace with your OpenWeatherMap API key

async function getWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === '404') {
    document.getElementById("output").innerHTML = `<p>City not found!</p>`;
  } else {
    document.getElementById("output").innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.weather[0].main}</p>
      <p>${data.main.temp} °C</p>
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
    `;
  }
}
