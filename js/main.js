// AJAX
// (function(){
//   let req= new XMLHttpRequest();
//   req.open("get" , "https://api.weatherapi.com/v1/search.json?key=5f977eacf3074f29a1d115700240201&q=egypt");
//   req.send();
//   req.addEventListener('loadend' , function(){
//     if(req.status >= 200 ){
//       console.log(JSON.parse(req.response));
//     }
// })
// })();

let responseData;
// fetch
async function getWeather() {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5f977eacf3074f29a1d115700240201&q=${searchCity}&days=3`
  );
  responseData = await response.json();

  // console.log(responseData);
  displayWeather();
}
getWeather((searchCity = "fayoum"));

let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wensday",
    "Thuresday",
    "Friday",
    "Saterday",
  ],
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November ",
    "December",
  ];

let searchInput = document.getElementById("search"),
  todayName = document.querySelector(".today span:nth-child(1)"),
  monthName = document.querySelector(".today span:nth-child(2)"),
  locationName = document.querySelector(".location"),
  weatherDegree = document.querySelector(".degree"),
  weatherIcon = document.querySelector(".weather-icon img"),
  weatherDesc = document.querySelector(".weather-desc"),
  umberella = document.querySelector(".weather-info span:nth-child(1) span"),
  wind = document.querySelector(".weather-info span:nth-child(2) span"),
  compass = document.querySelector(".weather-info span:nth-child(3) span"),
  nextdayName = document.querySelectorAll(".next-days .weather-head span"),
  nextdayIcon = document.querySelectorAll(".next-days .weather-icon img"),
  maxDegree = document.querySelectorAll(".max-degree"),
  minDegree = document.querySelectorAll(".min-degree"),
  nextdayDesc = document.querySelectorAll(".next-days .weather-desc");

// console.log(compass);

searchInput.addEventListener("keyup", function () {
  searchCity = this.value;
  getWeather(searchCity);
});

function displayWeather() {
  
  let date = new Date();
  locationName.innerHTML = responseData.location.name;
  todayName.innerHTML = `${days[date.getDay()]}`;
  monthName.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`;
  weatherDegree.innerHTML = `${responseData.current.temp_c}<sup>o</sup>C`;
  weatherIcon.setAttribute(
    "src",
    `https:${responseData.current.condition.icon}`
  );
  weatherDesc.innerHTML = responseData.current.condition.text;
  umberella.innerHTML = responseData.current.wind_kph;
  wind.innerHTML = responseData.current.wind_mph;
  compass.innerHTML = responseData.current.wind_dir;

  // console.log(responseData.forecast.forecastday.length);
  let nextdayList = responseData.forecast.forecastday;
  
    for (let i = 0; i < nextdayList.length; i++) {
 
      nextdayName[i].innerHTML = days[new Date(nextdayList[i + 1].date).getDay()];
      // console.log(days[new Date(nextdayList[i].date).getDay()]);
      // nextdayIcon[i].setAttribute('src' , `https:${nextdayList[i].day.condition.icon}`)
      nextdayIcon[i].setAttribute(
        "src",
        `https:${nextdayList[i + 1].day.condition.icon}`
    );
    // console.log(responseData.forecast.forecastday[i+1].day.condition.icon);
    maxDegree[i].innerHTML = `${nextdayList[i + 1].day.maxtemp_c}<sup>o</sup>C`;
    minDegree[i].innerHTML = `${nextdayList[i + 1].day.mintemp_c}<sup>o</sup>C`;
    nextdayDesc[i].innerHTML = nextdayList[i + 1].day.condition.text;
  }
}
