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

  console.log(response.data);

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

  document.querySelector("#feelslike").innerHTML = Math.round(
    response.data.main.feels_like
  );

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let today = date.getDate();

  return `${month} ${today}, ${year}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 card text-center bg-warning " style="--bs-bg-opacity: 0.5;" >
          <div class="card-body">
            <h4 class="card-title weather-forecast-day">${formatDay(
              forecastDay.dt
            )}</h4>
            <h6 class="card-subtitle mb-2 text-muted weather-forecast-date"">${formatDate(
              forecastDay.dt
            )}</h6>
            <p>
             <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  width=60"
                />
            </p>
            <span class="weather-forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}°</span> 
            <span class="weather-forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
            <br />
          </div></div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
