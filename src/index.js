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

//get weather for searched city

function showWeather(response) {
  let cityDisplay = document.querySelector(".display-city");
  let temperatureDisplay = document.querySelector("#temperature-element");
  let descriptionDisplay = document.querySelector("#temp-description");
  let humidityDisplay = document.querySelector("#humidity-element");
  let windDisplay = document.querySelector("#wind-element");
  let precipitationDisplay = document.querySelector("#precipitation-element");
  let iconDisplay = document.querySelector("#icon");

  cityDisplay.innerHTML = response.data.name.toUpperCase();
  temperatureDisplay.innerHTML = Math.round(response.data.main.temp);
  descriptionDisplay.innerHTML = response.data.weather[0].description;
  humidityDisplay.innerHTML = response.data.main.humidity;
  windDisplay.innerHTML = response.data.wind.speed;
  precipitationDisplay.innerHTML = `${response.data.clouds.all}%`;
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "4f482c7efe60a0d9873383fc626d95ab";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  if (cityInputElement === null) {
    alert("Please enter a city");
  }
  search(cityInputElement.value);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSubmit);

search("New York");

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

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showLocation);
currentButton.addEventListener("click", getLocation);
currentButton.addEventListener("click", showWeather);

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
