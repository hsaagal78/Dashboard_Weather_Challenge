var baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=b7697291bbd48724d3d0d47008d23e7e';
var baseForecast5daysURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b7697291bbd48724d3d0d47008d23e7e';

var form = document.querySelector('#obtainForecasDate');
var cityNameInput = document.querySelector('#cityName');
var shortCut = document.querySelector('#shortCutCityName');
var cityNames = [];
var input = "storedCity";

function fetchWeatherData(cityName) {
  var weatherURL = baseWeatherURL.replace('cityName', cityName);
  
  return fetch(weatherURL)
    .then(function (res) {
      if (!res.ok) {
        throw new Error('City not found');
      }
      return res.json();
    })
    .catch(function (error) {
      console.log('Error:', error);
      alert('City not found');
    });
}

function displayWeatherDataFromInput(event) {
  event.preventDefault();
  var cityName = cityNameInput.value;
  cityNameInput.value = "";
  
  fetchWeatherData(cityName)
    .then(function (data) {
      displayWeatherDataOnScreen(data);
      createCityArray(cityName);
    });
}

form.addEventListener('submit', displayWeatherDataFromInput);

function createCityArray(cityName) {
  var cityArray = {
    city: cityName
  };
  
  var storedData = localStorage.getItem(input);
  if (storedData) {
    cityNames = JSON.parse(storedData);
    for (var i = 0; i < cityNames.length; i++) {
      if (cityNames[i].city === cityName) {
        console.log('This name is already stored');
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
      var button = document.createElement('button');
      button.innerText = cityName;
      button.setAttribute('name', cityName);
      shortCut.appendChild(button);
      button.addEventListener('click', function() {
        var cityName = this.getAttribute('name');
        fetchWeatherData(cityName)
          .then(function(data){
            displayWeatherDataOnScreen(data);
          });
      });
    }
  }
}

showCity();

function displayWeatherDataOnScreen(data) {
  var weatherContainer = document.querySelector('#weatherRequest');
  var cityNameElement = document.createElement('h2');
  var temperatureElement = document.createElement('p');
  var descriptionElement = document.createElement('p');
  var humidityElement = document.createElement('p');
  var timeZoneElement = document.createElement('p');
  var windspeedElement = document.createElement('p');
  var pictureElement = document.createElement('img');

  var cityName = data.name;
  var temperature = Math.round((data.main.temp - 273.15) * (9 / 5) + 32);
  var description = data.weather[0].description;
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;
  var timeZone = data.timezone;
  var currentTime = new Date();
  var currentUTCTime = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
  var newTime = new Date(currentUTCTime + (timeZone * 1000));
  var hours = newTime.getHours();
  var minutes = newTime.getMinutes();
  var amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var formattedTime = (hours).toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + amPm;
  var pictureWeather = data.weather[0].icon;

  cityNameElement.textContent = cityName;
  temperatureElement.textContent = 'Temperature: ' + temperature + 'F°';
  descriptionElement.textContent = 'Description: ' + description;
  windspeedElement.textContent = 'Speed Wind: ' + windSpeed + 'mph';
  humidityElement.textContent = 'Humidity: ' +  humidity + '%';
  timeZoneElement.textContent = formattedTime;
  pictureElement.src ='https://openweathermap.org/img/wn/'+ pictureWeather +".png";

  weatherContainer.innerHTML = '';

  weatherContainer.appendChild(pictureElement);
  weatherContainer.appendChild(cityNameElement);
  weatherContainer.appendChild(temperatureElement);
  weatherContainer.appendChild(descriptionElement);
  weatherContainer.appendChild(windspeedElement);
  weatherContainer.appendChild(humidityElement);
  weatherContainer.appendChild(timeZoneElement);
  fetchDaysWeatherData(data);
}

function fetchDaysWeatherData(data) {
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  var fivedaysURL = baseForecast5daysURL.replace('{lat}', lat).replace('{lon}', lon);

  return fetch(fivedaysURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (forecastData) {
      fiveDaysDisplayForecast(forecastData);
      return forecastData;
    })
    .catch(function (error) {
      console.log('Error:', error);
    });
}

function fiveDaysDisplayForecast(forecastData) {
  var forecastContainers = document.querySelectorAll('[id^="forecastRequest"]');
  
  for (var i = 1; i < 6; i++) {
    var weatherContainer = forecastContainers[i - 1];
    var temperatureElement = document.createElement('p');
    var descriptionElement = document.createElement('p');
    var humidityElement = document.createElement('p');
    var timeZoneElement = document.createElement('p');
    var windspeedElement = document.createElement('p');
    var pictureElement = document.createElement('img');

    var temperature = Math.round((forecastData.list[i - 1].main.temp -273.15)*(9/5)+32);
    var description = forecastData.list[i - 1].weather[0].description;
    var windSpeed = forecastData.list[i - 1].wind.speed;
    var humidity = forecastData.list[i - 1].main.humidity;
    var timeZone = forecastData.list[i - 1].dt_txt;
    var pictureWeather = forecastData.list[i - 1].weather[0].icon;

    temperatureElement.textContent = 'Temperature: ' + temperature + '°C';
    descriptionElement.textContent = 'Description: ' + description;
    windspeedElement.textContent = 'Speed Wind: ' + windSpeed + 'mph';
    humidityElement.textContent = 'Humidity: ' + humidity + '%';
    timeZoneElement.textContent = timeZone;
    pictureElement.src ='https://openweathermap.org/img/wn/'+ pictureWeather +".png";
 
    

    weatherContainer.innerHTML = '';

    weatherContainer.appendChild(pictureElement);
    weatherContainer.appendChild(temperatureElement);
    weatherContainer.appendChild(descriptionElement);
    weatherContainer.appendChild(windspeedElement);
    weatherContainer.appendChild(humidityElement);
    weatherContainer.appendChild(timeZoneElement);
  }
}