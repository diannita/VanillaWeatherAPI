// Show Current time
function currentDateTime(date) {
  let hours = currentTime.getHours();
  // Adding numerber zero to hours when is lower than ten
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  // Adding numerber zero to minutes when is lower than ten
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  console.log(response.data);

  let iconaux = response.data.weather[0].icon;
  // alert(iconaux);
  if (iconaux == "01d" || iconaux == "01n") {
    iconWeather.innerHTML = `<i class="wi wi-day-sunny weather"></i>`;
  } else if (iconaux == "02d" || iconaux == "02d") {
    iconWeather.innerHTML = `<i class="wi wi-day-sunny-overcast weather"></i>`;
  } else if (iconaux == "03d" || iconaux == "03n") {
    iconWeather.innerHTML = `<i class="wi wi-cloud weather"></i>`;
  } else if (iconaux == "04d" || iconaux == "04n") {
    iconWeather.innerHTML = `<i class="wi wi-cloudy weather"></i>`;
  } else if (iconaux == "09d" || iconaux == "09n") {
    iconWeather.innerHTML = `<i class="wi wi-rain-mix weather"></i>`;
  } else if (iconaux == "10d" || iconaux == "10n") {
    iconWeather.innerHTML = `<i class="wi wi-day-sleet weather"></i>`;
  } else if (iconaux == "11d" || iconaux == "11n") {
    iconWeather.innerHTML = `<i class="wi wi-day-lightning weather"></i>`;
  } else if (iconaux == "13d" || iconaux == "13n") {
    iconWeather.innerHTML = `<i class="wi wi-snowflake-cold weather"></i>`;
  } else if (iconaux == "50d" || iconaux == "50n") {
    iconWeather.innerHTML = `<i class="wi wi-night-cloudy-windy weather"></i>`;
  } else {
    iconWeather.innerHTML = `<i class="wi wi-rain-mix weather"></i>`;
  }

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
  description.innerHTML = response.data.weather[0].description;

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

  //Weather icons
  // let iconWeather = document.querySelector("#iconWeather");
  // iconWeather.innerHTML = `<i class="wi wi-day-light-wind weather"></i>`;
  // if (data.weather[0].icon == "01n") {
  //   alert("something" + data.weather[0].icon);
  //   iconWeather.innerHTML = `<i class="wi wi-day-cloudy"></i>`;
  // } else if (data.weather[0].icon == "02n") {
  //   iconWeather.innerHTML = `<i class="wi wi-cloudy"></i>`;
  // } else if (data.weather[0].icon == "03n") {
  //   iconWeather.innerHTML = `<i class="wi wi-cloud"></i>`;
  // } else if (data.weather[0].icon == "04n") {
  //   iconWeather.innerHTML = `<i class="wi wi-day-sunny"></i>`;
  // } else if (data.weather[0].icon == "50n") {
  //   iconWeather.innerHTML = `<i class="wi wi-cloudy-windy"></i>`;
  // } else {
  //   iconWeather.innerHTML = `<i class="wi wi-day-rain-wind"></i>`;
  // }
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
searchCity("New York");

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
// let iconWeather = document.querySelector("#iconWeather");
// let iconWeather = document.querySelector("#iconWeather");
// iconWeather.innerHTML = `<i class="wi wi-day-fog weather"></i>`;
