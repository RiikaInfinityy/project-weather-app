//Default Display
navigator.geolocation.getCurrentPosition(findCurrentLoc);

//  Display the current date and time
function currentDateDisplay() {
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let month = months[date.getMonth()];

  let today = date.getDate();
  let year = date.getFullYear();

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }

  //formating the date and time
  let currentDay = document.querySelector("#current-day");
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");

  currentDay.innerHTML = `${day}`;
  currentDate.innerHTML = `${month} ${today}, ${year}`;
  currentTime.innerHTML = `${hour}:${minutes}`;
}

currentDateDisplay();

function searchInputCity(event) {
  event.preventDefault();
  searchCity(document.querySelector("#city-input").value);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentLoc);
}

function findCurrentLoc(position) {
  let apiKey = "4abcc39b04e548daee77c144d7483bb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaySearchWeather);
}

function searchCity(city) {
  let apiKey = "4abcc39b04e548daee77c144d7483bb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaySearchWeather);
}

// Display the current weather
function displaySearchWeather(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  let setupIcon = document.querySelector("#current-weather-icon");
  setupIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document.querySelector("#current-location").innerHTML = response.data.name;

  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
}

let search = document.querySelector("#submit-button");
search.addEventListener("click", searchInputCity);

let current = document.querySelector("#current-loc-button");
current.addEventListener("click", getCurrentLocation);

/*

//convert celsius to fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");

  let cToFahr = Math.round((19 * 9) / 5 + 32);
  currentTemp.innerHTML = cToFahr;
}

//convert fahrenheit to celsius
function convertToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");

  let fToCel = Math.round(((66 - 32) * 5) / 9);
  currentTemp.innerHTML = fToCel;
}

let fahrenheit = document.querySelector("#fahrenheit-convert");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius-convert");
celsius.addEventListener("click", convertToCelsius);

*/
