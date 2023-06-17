// var baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=b7697291bbd48724d3d0d47008d23e7e';
// var baseForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b7697291bbd48724d3d0d47008d23e7e';

var baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=b7697291bbd48724d3d0d47008d23e7e';

var form = document.querySelector('#obtainForecasDate');
var cityNameInput = document.querySelector('#cityName');
var shortCut = document.querySelector('#shortCutCityName');
var cityNames = [];
var input = "storedCity";

function searchCity(event) {
  event.preventDefault();

  var cityName = cityNameInput.value;
  console.log(cityName);
  createCityArray(cityName);
  fetchWeatherData(cityName);
}
form.addEventListener('submit', searchCity);

function createCityArray(cityName) {
  var cityArray = {
    city: cityName
  };

  var storedData = localStorage.getItem(input);
  if (storedData) {
    cityNames = JSON.parse(storedData);
    for (var i = 0; i < cityNames.length; i++) {
      if (cityNames[i].city === cityName) {
        console.log('this  name in localStorage');
        return;
      }
    }
  }

  cityNames.push(cityArray);
  storedCity();
}

function storedCity() {
  localStorage.setItem(input, JSON.stringify(cityNames));
}

function showCity() {
  var storedData = localStorage.getItem(input);
  if (storedData) {
    var existingCityNames = JSON.parse(storedData);

    for (var i = 0; i < existingCityNames.length; i++) {
      var cityName = existingCityNames[i].city;
      console.log(cityName);
      var h3 = document.createElement('h3');
      h3.innerText = cityName;
      shortCut.appendChild(h3);
    }
  }
}

showCity();

function displayWeatherDataOnScreen(data) {
  var weatherContainer = document.querySelector('#weatherRequest');
  var cityNameElement = document.createElement('h2');
  var temperatureElement = document.createElement('p');
  var descriptionElement = document.createElement('p');
    var windspeedElement = document.createElement('p');
    var humidityElement = document.createElement('p');
  
  var cityName = data.name;
  console.log(data);
  var temperature = data.main.temp;
  var description = data.weather[0].description;
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;


  cityNameElement.textContent = cityName;
  temperatureElement.textContent = 'Temperature: ' + temperature + '°C';
  descriptionElement.textContent = 'Description: ' + description;
  windspeedElement.textContent = 'Speed Wind: ' + windSpeed + 'mph';
  humidityElement.textContent = 'Humidity: ' +  humidity + '%';


  weatherContainer.innerHTML = '';


  weatherContainer.appendChild(cityNameElement);
  weatherContainer.appendChild(temperatureElement);
  weatherContainer.appendChild(descriptionElement);
  weatherContainer.appendChild(windspeedElement);
  weatherContainer.appendChild(humidityElement);
}

function fetchWeatherData(cityName) {
  var weatherURL = baseWeatherURL.replace('cityName', cityName);
  return fetch(weatherURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.log('Error:', error);
    });
}

function displayWeatherDataFromInput(event) {
    event.preventDefault();
  var cityName = cityNameInput.value;
  fetchWeatherData(cityName)
    .then(function (data) {
      displayWeatherDataOnScreen(data);
    });
}

form.addEventListener('submit', displayWeatherDataFromInput);