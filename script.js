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

function search(city) {
  let apiKey = "dd8579c5f641bd775219e128e944f6aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
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