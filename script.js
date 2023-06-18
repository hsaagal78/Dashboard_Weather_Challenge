
var baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=b7697291bbd48724d3d0d47008d23e7e';

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
    //   console.log(cityName);
      var button = document.createElement('button');
      button.innerText = cityName;
      shortCut.appendChild(button);
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
  
  var cityName = data.name;
//   console.log(data);
  var temperature = data.main.temp;
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
  temperatureElement.textContent = 'Temperature: ' + temperature + '°C';
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
      fetch5daysWeatherData(data)
      
    });
}

form.addEventListener('submit', displayWeatherDataFromInput);
/////////////////////////////////////////////////////////////////////////////

var baseForecast5daysURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b7697291bbd48724d3d0d47008d23e7e';



function fetch5daysWeatherData(data) {
    console.log('hola',data)
    var lat =data.coord.lat;
    var lon=data.coord.lon;
    var fivedaysURL = baseForecast5daysURL.replace('{lat}', lat).replace('{lon}', lon);

    return fetch(fivedaysURL)
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
  
  function display5daysForceCostDataFromInput(event) {
      event.preventDefault();
    var cityName = cityNameInput.value;
    fetch5daysWeatherData(cityName)
      .then(function (data) {
        displayWeatherDataOnScreen(data);
        
      });
      
  }

// function fiveDaysdisplayForcecast (cityName){
//     var cityName5dayForcecast=cityName;
//     console.log(cityName5dayForcecast);
//     for (var i=0; i>)
//     var weatherContainer = document.querySelector('#forecastRequest1');
//     var cityNameElement5days = document.createElement('h2');
//     var temperatureElement5days = document.createElement('p');
//     var descriptionElement5days = document.createElement('p');
//     var humidityElement5days = document.createElement('p');
//     var timeZoneElement5days = document.createElement('p');


//     var cityName = data.name;
//       console.log(data);
//       var temperature = data.main.temp;
//       var description = data.weather[0].description;
//       var windSpeed = data.wind.speed;
//       var humidity = data.main.humidity;
//       var timeZone = data.timezone;
//       var currentTime = new Date();
      





//////////////////////////////////////////////////////////////////////////////


    // function displayWeatherDataOnScreen(data) {
    //     var weatherContainer = document.querySelector('#weatherRequest');
    //     var cityNameElement = document.createElement('h2');
    //     var temperatureElement = document.createElement('p');
    //     var descriptionElement = document.createElement('p');
    //     var humidityElement = document.createElement('p');
    //     var timeZoneElement = document.createElement('p');
    //     var windspeedElement = document.createElement('p');
      
    //   var cityName = data.name;
    //   console.log(data);
    //   var temperature = data.main.temp;
    //   var description = data.weather[0].description;
    //   var windSpeed = data.wind.speed;
    //   var humidity = data.main.humidity;
    //   var timeZone = data.timezone;
    //   var currentTime = new Date();
      
    //   // Get the current time in UTC
    //   var currentUTCTime = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
      
    //   // Calculate the new time by adding the timeZone
    //   var newTime = new Date(currentUTCTime + (timeZone * 1000));
      
    //   // Get the hours and minutes in readable format
    //   var hours = newTime.getHours();
    //   var minutes = newTime.getMinutes();
    //   var amPm = hours >= 12 ? 'PM' : 'AM';
    //   hours = hours % 12;
    //   hours = hours ? hours : 12;
      
    //   // Format the hours and minutes according to the desired format
    //   var formattedTime = (hours).toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + amPm;
      
    //   // Print the formatted time
     
    
    //   cityNameElement.textContent = cityName;
    //   temperatureElement.textContent = 'Temperature: ' + temperature + '°C';
    //   descriptionElement.textContent = 'Description: ' + description;
    //   windspeedElement.textContent = 'Speed Wind: ' + windSpeed + 'mph';
    //   humidityElement.textContent = 'Humidity: ' +  humidity + '%';
    //   timeZoneElement.textContent = formattedTime;
      
    
    
    //   weatherContainer.innerHTML = '';
    
    
    //   weatherContainer.appendChild(cityNameElement);
    //   weatherContainer.appendChild(temperatureElement);
    //   weatherContainer.appendChild(descriptionElement);
    //   weatherContainer.appendChild(windspeedElement);
    //   weatherContainer.appendChild(humidityElement);
    //   weatherContainer.appendChild(timeZoneElement);
    // }
    
    // function fetchWeatherData(cityName) {
    //   var weatherURL = baseWeatherURL.replace('cityName', cityName);
    //   return fetch(weatherURL)
    //     .then(function (res) {
    //       return res.json();
    //     })
    //     .then(function (data) {
    //       return data;
    //     })
    //     .catch(function (error) {
    //       console.log('Error:', error);
    //     });
    // }
    
    // function displayWeatherDataFromInput(event) {
    //     event.preventDefault();
    //   var cityName = cityNameInput.value;
    //   fetchWeatherData(cityName)
    //     .then(function (data) {
    //       displayWeatherDataOnScreen(data);
    //     });
    // }
    
    // form.addEventListener('submit', displayWeatherDataFromInput);