var baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=cityName&appid=b7697291bbd48724d3d0d47008d23e7e';
var baseForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b7697291bbd48724d3d0d47008d23e7e';

var form = document.querySelector('#obtainForecasDate');
var cityNameInput = document.querySelector('#cityName');

function searchCity(event) {
  event.preventDefault();
  var cityName = cityNameInput.value;
  console.log(cityName);
}

form.addEventListener('submit', searchCity);





// fetch(baseWeatherURL).then(function(res){
//     return res.jsonn();
//     }) .then(function (data){

//         console.log(data);
//     });