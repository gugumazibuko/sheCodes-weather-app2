// current date and time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateTime = document.querySelector("#dateTime");
dateTime.innerHTML = day + ":" + hours + ":" + minutes;

function changeTemp() {
  let temp = document.querySelector("#currentTemp");
  let fahrenheitTemp = Math.round((temp.textContent * 9) / 5 + 32);
  temp.textContent = fahrenheitTemp;
}
let fahrenheitButton = document.getElementById("fahrenheit");
fahrenheitButton.addEventListener("click", changeTemp);
//change to CCC
function backTemp() {
  let temp = document.querySelector("#currentTemp");
  let celsiusTemp = Math.round(((temp.textContent - 32) * 5) / 9);
  temp.textContent = celsiusTemp;
}
let celsiusButton = document.getElementById("celsius");
celsiusButton.addEventListener("click", backTemp);

/////////////////
//week 5 Homework
//get info
function getPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "c6c7a492e76418057d85930c1c58128d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showInfo);
}
navigator.geolocation.getCurrentPosition(getPosition);

//open page get city name
function showInfo(response) {
  let myCity = document.querySelector("#currentLocation");
  let city = response.data.name;
  myCity.innerHTML = city;

  let cityTemp = document.querySelector("#currentTemp");
  let temp = Math.round(response.data.main.temp);
  cityTemp.innerHTML = temp;

  let description = response.data.weather[0].description;
  let infoTemp = document.querySelector("#weatherDescription");
  infoTemp.innerHTML = description;

  let cityHumidity = document.querySelector("#humidity");
  let cityWind = document.querySelector("#wind");
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  cityHumidity.innerHTML = humidity;
  cityWind.innerHTML = wind;
}
//week5 homework
//1 search city
function searchNewCity(event) {
  event.preventDefault();
  let formInput = document.querySelector(".exampleInputForm");
  formInput = formInput.value;
  let apiKey = "c6c7a492e76418057d85930c1c58128d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formInput}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showInfo);
}
let form = document.querySelector(".searchForm");
form.addEventListener("submit", searchNewCity);

//week5 homework
//2 Current city
function loadCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCity);
  function showCity(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "c6c7a492e76418057d85930c1c58128d";
    let apiCity = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${apiKey}`;
    axios.get(apiCity).then(localCityName);
    function localCityName(response) {
      let myCity = document.querySelector("#currentLocation");
      let city = response.data[0].name;
      console.log(response.data[0].name);

      myCity.innerHTML = city;
    }
  }
}

function loadLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
  function showLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "c6c7a492e76418057d85930c1c58128d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showCurrentLocation);
  }
  function showCurrentLocation(response) {
    let myCity = document.querySelector("#currentLocation");
    let city = response.data.name;
    myCity.innerHTML = city;

    let cityTemp = document.querySelector("#currentTemp");
    let temp = Math.round(response.data.main.temp);
    cityTemp.innerHTML = temp;

    let description = response.data.weather[0].description;
    let infoTemp = document.querySelector("#weatherDescription");
    infoTemp.innerHTML = description;

    let cityHumidity = document.querySelector("#humidity");
    let cityWind = document.querySelector("#wind");
    let humidity = Math.round(response.data.main.humidity);
    let wind = Math.round(response.data.wind.speed);
    cityHumidity.innerHTML = humidity;
    cityWind.innerHTML = wind;
  }
}
let currentBtn = document.querySelector("#currentBtn");
currentBtn.addEventListener("click", loadLocation);
