// Show Current time
function currentDateTime(date) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}:${seconds}`;
}

let dateElement = document.querySelector("#currentDate");
let currentTime = new Date();
dateElement.innerHTML = currentDateTime(currentTime);

//Geolocation - API  Axios
function showWeatherConditions(response) {
  //Show Current City Location
  let headingH1 = document.querySelector("#city");
  headingH1.innerHTML = `${response.data.name}`;

  //Show Low Temperature
  let lowTemp = response.data.main.temp_min;
  let lowTempElement = document.querySelector("#lowTemp");
  lowTempElement.innerHTML = `${lowTemp}`;

  //Show High Temperature
  let highTemp = response.data.main.temp_max;
  let highTempElement = document.querySelector("#highTemp");
  highTempElement.innerHTML = `${highTemp}`;

  //Show Weather Description
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].main;

  //Show Temperature
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}˚C`;

  //Show Current Humidity
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  //Show WindSpeed
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} km/h`;

  //Show Visibility
  let visibility = Math.round(response.data.main.humidity);
  let visibilityElement = document.querySelector("#visibility");
  visibilityElement.innerHTML = `${visibility}`;

  //Show Pressure
  let pressure = Math.round(response.data.main.pressure);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = `${pressure}`;
}

//Function that shows current coordinates
function PositionGeo(position) {
  let apiKey = "db4c9d5fac0799df6572445f027e0c0b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeatherConditions);
}
//Get current location by pressing a button
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(PositionGeo);
}
let currentLocationButton = document.querySelector("#btnLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Function for searching the city's weather
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}
//Function that sends a request after btn submition (name of city)
function submitBtn(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", submitBtn);
searchCity("Italy");

//Change type of temperature
//search button div - submit
let showTempCelsius = document.querySelector("#celsBtn");
showTempCelsius.addEventListener("click", function (tempCels) {
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = `10°C`;
});

let showTempFahrenheit = document.querySelector("#fahBtn");
showTempFahrenheit.addEventListener("click", function (tempFahr) {
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = `50°F`;
});

//Weather icons
let iconWeather = document.querySelector("#iconWeather");
iconWeather.innerHTML = `<i class="wi wi-day-fog weather"></i>`;

// function weatherIcon() {
//   let iconTemperature = document.querySelector("#temperature-description");
//   if (iconTemperature === "Rain"){

//   }
// }
