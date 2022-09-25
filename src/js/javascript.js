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

//Function to format day for forecast (daily forecast)
function formatDay(timestamp) {
  let dateData = new Date(timestamp * 1000);
  let dayData = dateData.getDay();
  let daysData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return daysData[dayData];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastDaily = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row day-weather-row">`;
  forecastDaily.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
      <div class="col-2">
        <div class="weather-forecast-date tempc">
          ${formatDay(forecastDay.dt)}
        </div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="75">
        <div>
          <span class="tempc">
            ${Math.round(forecastDay.temp.max)}°
          </span>
          <span class="tempm">
            ${Math.round(forecastDay.temp.min)}°
          </span>
        </div>
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Geolocation - API  Axios
function showWeatherConditions(response) {
  //Weather condtions icons
  let iconaux = response.data.weather[0].icon;

  if (iconaux == "01d") {
    iconWeather.innerHTML = `<i class="wi wi-day-sunny weather"></i>`;
  } else if (iconaux == "01n") {
    iconWeather.innerHTML = `<i class="wi wi-night-clear weather"></i>`;
  } else if (iconaux == "02d") {
    iconWeather.innerHTML = `<i class="wi wi-day-sunny-overcast weather"></i>`;
  } else if (iconaux == "02n") {
    iconWeather.innerHTML = `<i class="wi wi-night-alt-cloudy weather"></i>`;
  } else if (iconaux == "03d" || iconaux == "03n") {
    iconWeather.innerHTML = `<i class="wi wi-cloud weather"></i>`;
  } else if (iconaux == "04d" || iconaux == "04n") {
    iconWeather.innerHTML = `<i class="wi wi-cloudy weather"></i>`;
  } else if (iconaux == "09d" || iconaux == "09n") {
    iconWeather.innerHTML = `<i class="wi wi-rain-mix weather"></i>`;
  } else if (iconaux == "10d") {
    iconWeather.innerHTML = `<i class="wi wi-day-sleet weather"></i>`;
  } else if (iconaux == "10n") {
    iconWeather.innerHTML = `<i class="wi wi-night-sleet weather"></i>`;
  } else if (iconaux == "11d") {
    iconWeather.innerHTML = `<i class="wi wi-day-lightning weather"></i>`;
  } else if (iconaux == "11n") {
    iconWeather.innerHTML = `<i class="wi wi-night-alt-lightning weather"></i>`;
  } else if (iconaux == "13d" || iconaux == "13n") {
    iconWeather.innerHTML = `<i class="wi wi-snowflake-cold weather"></i>`;
  } else if (iconaux == "50d") {
    iconWeather.innerHTML = `<i class="wi wi-day-windy weather"></i>`;
  } else if (iconaux == "50n") {
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
  lowTempElement.innerHTML = `${Math.round(lowTemp)}`;

  //Show High Temperature
  let highTemp = response.data.main.temp_max;
  let highTempElement = document.querySelector("#highTemp");
  highTempElement.innerHTML = `${Math.round(highTemp)}`;

  //Show Weather Description
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;

  //Show Temperature
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature} °C`;

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

  //Change Temperature
  celsiusTemperature = response.data.main.temp;

  //Call dialy forecast
  getForecast(response.data.coord);
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
  let apiKey = "db4c9d5fac0799df6572445f027e0c0b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}
//Function that sends a request after btn submition (name of city)
function submitBtn(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//Function change type of temperature to Fahrenhei
function displayFahrenheiTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature) + " °F";
}

//Function change type of temperature to Celsius
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + " °C";
}

//Function that display dialy forecast
function getForecast(coordinates) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Global Variables
//variables to search for city
let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", submitBtn);
searchCity("Colombia");

//variable to change type of temperature
let showTempFahrenheit = document.querySelector("#fahBtn");
showTempFahrenheit.addEventListener("click", displayFahrenheiTemperature);

let celsiusTemperature = null;

let showTempCelsius = document.querySelector("#celsBtn");
showTempCelsius.addEventListener("click", displayCelsiusTemperature);
