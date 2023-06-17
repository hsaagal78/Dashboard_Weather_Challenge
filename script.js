// var baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=b7697291bbd48724d3d0d47008d23e7e';
// var baseForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b7697291bbd48724d3d0d47008d23e7e';

var form = document.querySelector('#obtainForecasDate');
var cityNameInput = document.querySelector('#cityName');
var shortCut = document.querySelector('#shortCutCityName');
var cityNames = []; 
var input = "storedCity"; 
var baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=b7697291bbd48724d3d0d47008d23e7e';

function searchCity(event) {
    event.preventDefault();

    var cityName = cityNameInput.value;  
    console.log(cityName);
    createCityArray(cityName);
    fetchWeatherData(cityName); 
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


function fetchWeatherData(cityName) {
    var weatherURL = baseWeatherURL.replace('cityName', cityName);
    fetch(weatherURL)
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

function displayWeatherDataOnScreen(data) {

    var weatherContainer = document.querySelector('#weatherRequest');
    var cityNameElement = document.createElement('h2');
    var temperatureElement = document.createElement('p');
    var descriptionElement = document.createElement('p');
}