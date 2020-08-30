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

//show city name entered

function showSearchCity(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#city-entered");
  if (searchCity === null) {
    alert("Please enter a city");
  } else {
    let displayCity = document.querySelector(".current-city");
    displayCity.innerHTML = searchCity.value.toUpperCase();
  }
}

//get weather for searched city

function getSearchWeather(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#city-entered");

  let apiKey = "4f482c7efe60a0d9873383fc626d95ab";
  let city = searchCity.value;
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let precipitation = response.data.clouds.all;

  let temperatureDisplay = document.querySelector("#temperature-element");
  let humidityDisplay = document.querySelector("#humidity-element");
  let windDisplay = document.querySelector("#wind-element");
  let precipitationDisplay = document.querySelector("#precipitation-element");

  temperatureDisplay.innerHTML = temperature;
  humidityDisplay.innerHTML = humidity;
  windDisplay.innerHTML = wind;
  precipitationDisplay.innerHTML = `${precipitation}%`;

  console.log(response);
  console.log(temperature);
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
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function showLocation(event) {
  event.preventDefault();
  let displayCity = document.querySelector(".current-city");
  displayCity.innerHTML = "CURRENT";
}

let searchBar = document.querySelector("#searchbar");
searchBar.addEventListener("submit", showSearchCity);
searchBar.addEventListener("submit", getSearchWeather);

let searchButton = document.querySelector("#search-button");
searchBar.addEventListener("click", showSearchCity);
searchBar.addEventListener("click", getSearchWeather);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showLocation);
currentButton.addEventListener("click", getLocation);

// Show Celsius vs. Farenheit --- need to update
function showFarenheit(event) {
  let tempNumber = document.querySelector("#temp-eleemnt");
  tempNumber.innerHTML = "66";
}
function showCelsius(event) {
  let tempNumber = document.querySelector("#temp-element");
  tempNumber.innerHTML = "24";
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFarenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
