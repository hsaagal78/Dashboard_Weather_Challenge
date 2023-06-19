
var baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=b7697291bbd48724d3d0d47008d23e7e';
var baseForecast5daysURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b7697291bbd48724d3d0d47008d23e7e';

var form = document.querySelector('#obtainForecasDate');
var cityNameInput = document.querySelector('#cityName');
var shortCut = document.querySelector('#shortCutCityName');
var cityNames = [];
var input = "storedCity";

function searchCity(event) {
  event.preventDefault();

  var cityName = cityNameInput.value;
//   console.log(cityName);
  createCityArray(cityName);
  fetchWeatherData(cityName);
//   fiveDaysForcecast (cityName)
}
form.addEventListener('submit', searchCity);

function createCityArray(cityName) {
  var cityArray = {
    city: cityName
  };
// storege city name
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
    
      var button = document.createElement('button');
      button.innerText = cityName;
      shortCut.appendChild(button);
    }
  }
}

showCity();
////////////////////////////////////////1111111111111111111111111111111///////////////////////////////
function fetchWeatherData(cityName) {
    var weatherURL = baseWeatherURL.replace('cityName', cityName);
    
    return fetch(weatherURL)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        return data;
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
      
  }
  
  function displayWeatherDataFromInput() {
    //   event.preventDefault();
    var cityName = cityNameInput.value;
    fetchWeatherData(cityName)
      .then(function (data) {
        console.log(data);
        displayWeatherDataOnScreen(data);
        fetchdaysWeatherData(data);
        
        
      });
  }
  
  form.addEventListener('submit', displayWeatherDataFromInput);
////////////////////////////////////////////////////222222222222222222222222222222//////////////////////////////////////////////////


function displayWeatherDataOnScreen(data) {
    var weatherContainer = document.querySelector('#weatherRequest');
    var cityNameElement = document.createElement('h2');
    var temperatureElement = document.createElement('p');
    var descriptionElement = document.createElement('p');
    var humidityElement = document.createElement('p');
    var timeZoneElement = document.createElement('p');
    var windspeedElement = document.createElement('p');
  
  var cityName = data.name;
  console.log(data);
  var temperature = Math.round(data.main.temp)
  var description = data.weather[0].description;
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;
  var timeZone = data.timezone;
  var currentTime = new Date();
  
  // Get the current time in UTC
  var currentUTCTime = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
  
  // Calculate the new time by adding the timeZone
  var newTime = new Date(currentUTCTime + (timeZone * 1000));
  
  // Get the hours and minutes in readable format
  var hours = newTime.getHours();
  var minutes = newTime.getMinutes();
  var amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  // Format the hours and minutes according to the desired format
  var formattedTime = (hours).toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + amPm;
  
  // Print the formatted time
 

  cityNameElement.textContent = cityName;
  temperatureElement.textContent = 'Temperature: ' + temperature + 'F°';
  descriptionElement.textContent = 'Description: ' + description;
  windspeedElement.textContent = 'Speed Wind: ' + windSpeed + 'mph';
  humidityElement.textContent = 'Humidity: ' +  humidity + '%';
  timeZoneElement.textContent = formattedTime;
  


  weatherContainer.innerHTML = '';


  weatherContainer.appendChild(cityNameElement);
  weatherContainer.appendChild(temperatureElement);
  weatherContainer.appendChild(descriptionElement);
  weatherContainer.appendChild(windspeedElement);
  weatherContainer.appendChild(humidityElement);
  weatherContainer.appendChild(timeZoneElement);
}
//////////////////////////////////////////////////////33333333333333333333333333333333///////////////////////////////////


var baseForecast5daysURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b7697291bbd48724d3d0d47008d23e7e';




function fetchdaysWeatherData(data) {
    console.log('entran cordenadas',data);
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var fivedaysURL = baseForecast5daysURL.replace('{lat}', lat).replace('{lon}', lon);
  
    return fetch(fivedaysURL)
      .then(function (res) {
        return res.json();
      })
      .then(function (forecastData) {
        console.log('five das',forecastData);
        fiveDaysdisplayForcecast(forecastData);
        return forecastData;
      })
      .catch(function (error) {
        console.log('Error:', error);
    });
}
  
//   ////////////////////////////////44444444444444444444444444444444444444444444444444444444444444444444444444
  function fiveDaysdisplayForcecast(forecastData) {

            console.log('one',forecastData);
            var storeArray = forecastData;
            console.log('one',forecastData);
       
          for (var i = 0; i < 5; i++) {
            var weatherContainer = document.querySelector('#forecastRequest');
            var temperatureElementfivedays = document.createElement('p');
            var descriptionElementfivedays = document.createElement('p');
            var humidityElementfivedays = document.createElement('p');
            var timeZoneElement = document.createElement('p');
  
            var temperature = Math.round(forecastData.list[i].main.temp);
            var description = forecastData.list[i].weather[0].description;
            var windSpeed = forecastData.list[i].wind.speed;
            var humidity = forecastData.list[i].main.humidity;
            var timeZone = forecastData.list[i].dt_txt;
  
            temperatureElementfivedays.textContent = 'Temperature: ' + temperature + '°C';
            descriptionElementfivedays.textContent = 'Description: ' + description;
            windspeedElement.textContent = 'Speed Wind: ' + windSpeed + 'mph';
            humidityElementfivedays.textContent = 'Humidity: ' + humidity + '%';
            timeZoneElement.textContent = timeZone;
  
            weatherContainer.innerHTML = '';
  
            weatherContainer.appendChild(temperatureElementfivedays);
            weatherContainer.appendChild(descriptionElementfivedays);
            weatherContainer.appendChild(windspeedElement);
            weatherContainer.appendChild(humidityElementfivedays);
            weatherContainer.appendChild(timeZoneElement);
          }
          .catch(function (error) {
            console.log('Error:', error);
        });
    }


