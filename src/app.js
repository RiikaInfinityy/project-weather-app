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
    "Saturday",
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
    "December",
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

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Display the current weather
function displaySearchWeather(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemp = response.data.main.temp;

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

  getForecast(response.data.coord);
  //console.log(response.data.coord);
}

function displayForecast(response) {
  //console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row justify-content-center">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 card text-center">
          <div class="card-body">
            <h4 class="card-title weather-forecast-day">${day}</h4>
            <h6 class="card-subtitle mb-2 text-muted weather-forecast-date"">Aug 17<sup>th</sup>, 2022</h6>
            <p>
             <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="45"
                />
            </p>
            <span class="weather-forecast-temp-max">27&#176;</span> 
            <span class="weather-forecast-temp-min">16&#176;</span>
            <br />
          </div></div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  //console.log(forecastHTML);
}

//convert celsius to fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();

  //remove celsius active class
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let currentTemp = document.querySelector("#current-temp");
  let cToFahr = (celsiusTemp * 9) / 5 + 32;

  currentTemp.innerHTML = Math.round(cToFahr);
}

//convert fahrenheit to celsius
function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

//use to store the searched temperature
let celsiusTemp = null;

//default display
navigator.geolocation.getCurrentPosition(findCurrentLoc);

//set up date and time display
currentDateDisplay();

let search = document.querySelector("#submit-button");
search.addEventListener("click", searchInputCity);

let current = document.querySelector("#current-loc-button");
current.addEventListener("click", getCurrentLocation);

let fahrenheit = document.querySelector("#fahrenheit-convert");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius-convert");
celsius.addEventListener("click", convertToCelsius);
