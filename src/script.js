function currentDate(date) {
  let dayNumber = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayInfo = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthInfo = date.getMonth();
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
  return `${days[dayInfo]}, ${months[monthInfo]} ${dayNumber} at ${hours}:${minutes}`;
}
function upcomingDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let upcomingForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ` <div class="row">`;
  upcomingForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="forecast-day">${upcomingDay(forecastDay.dt)}
      </div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="44"
      />
      <div class="weekly-forecast-temp">
        <span class="weekly-forecast-high">${Math.round(
          forecastDay.temp.max
        )} °</span>
        <span class="weekly-forecast-low">${Math.round(
          forecastDay.temp.min
        )} °</span>
      </div>
    
  </div> 
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "dd8579c5f641bd775219e128e944f6aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getForecast(coordinates) {
  let apiKey = "dd8579c5f641bd775219e128e944f6aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function showStats(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function hereNow(position) {
  let apiKey = "dd8579c5f641bd775219e128e944f6aa";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentStats(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(hereNow);
}

let dateDisplay = document.querySelector("#date");
let currentTime = new Date();

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", showStats);

dateDisplay.innerHTML = currentDate(currentTime);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentStats);

search("Los Angeles");
