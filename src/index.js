//show current date and time

let currentDate = document.querySelector("#date");
let todaysDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[todaysDate.getDay()];
let currentHours = todaysDate.getHours();
let currentMinutes = todaysDate.getMinutes();
let fullDate = `${currentDay} ${currentHours}:${currentMinutes}`;

currentDate.innerHTML = fullDate;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//get weather for searched city

function showWeather(response) {
  let cityDisplay = document.querySelector(".display-city");
  let temperatureDisplay = document.querySelector("#temperature-element");
  let descriptionDisplay = document.querySelector("#temp-description");
  let humidityDisplay = document.querySelector("#humidity-element");
  let windDisplay = document.querySelector("#wind-element");
  let precipitationDisplay = document.querySelector("#precipitation-element");
  let iconDisplay = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityDisplay.innerHTML = response.data.name.toUpperCase();
  temperatureDisplay.innerHTML = Math.round(celsiusTemperature);
  descriptionDisplay.innerHTML = response.data.weather[0].description;
  humidityDisplay.innerHTML = `Humidity: ${response.data.main.humidity}`;
  windDisplay.innerHTML = `Wind: ${response.data.wind.speed}`;
  precipitationDisplay.innerHTML = `Precipitation: ${response.data.clouds.all}%`;
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response) {
  let forecastDisplay = document.querySelector("#forecast");
  forecastDisplay.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastDisplay.innerHTML += `
  <div class="col-2">
  </br>
  <p>      
  ${formatHours(forecast.dt * 1000)}
    
  <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      / id = "forecast-icon">
</br>
      <strong id="forecast-temp">
          ${Math.round(forecast.main.temp)}°
        </strong>
        </p>
    </div>
  `;
  }
}

function search(city) {
  let apiKey = "4f482c7efe60a0d9873383fc626d95ab";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  if (cityInputElement === null) {
    alert("Please enter a city");
  }
  search(cityInputElement.value);
}

function getLocation(event) {
  event.preventDefault();
  console.log("getting location");

  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let latitude = Math.round(position.coords.latitude);
  let longitude = Math.round(position.coords.longitude);

  let unit = "metric";
  let apiKey = "4f482c7efe60a0d9873383fc626d95ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function showLocation(event) {
  event.preventDefault();
  let displayCity = document.querySelector(".current-city");
  displayCity.innerHTML = "CURRENT";
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", handlePosition);

// Show Celsius vs. Farenheit
function showFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let temperatureDisplay = document.querySelector("#temperature-element");
  temperatureDisplay.innerHTML = Math.round(farenheitTemperature);
}
function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureDisplay = document.querySelector("#temperature-element");
  temperatureDisplay.innerHTML = Math.round(celsiusTemperature);
}

let celciusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("New York");
