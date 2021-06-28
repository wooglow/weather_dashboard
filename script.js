function initpage() {
var nameEl = $('#city-name');
    // 결과값
var searchBtn = $('#searchbtn'); 
    // 검색 버튼
var cityname = $('#citysearchinput').val();
    // 검색어
var currentPicEl = $('#current-weather-pic');
    // 요약 그림
var currentTempEl = $("temperature");
    // 기온
var currentHumidityEl = $("humidity");
    // 습도
var currentWindEl = $("wind-speed");
  // 풍속
var currentUVEl = $("UV-index");
    // 자외선지수
var wordHistory = document.getElementById('history');
    //  검색어 저장
var searchwordHistory = JSON.parse(localStorage.getItem("search")) || [];
// var historyItem = document.createElement("input");
var queryUrl = "https://api.openweathermap.org/data/2.5/weather";
var myApikey = "53b007152463c31a8e0c957416e5dd2f";
var presentDate = moment().format('L');

console.log(wordHistory);

function showingSearchhistory(event) {
    
    wordHistory.innerHTML = "";
    for (var i =0; i<searchwordHistory.length;i++) {
        var historyItem = document.createElement("input");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("readonly",true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchwordHistory[i]);
        wordHistory.append(historyItem);
        historyItem.addEventListener("click", function(event) {
            var clickCity = event.target.getAttribute('value');
            getWeatherInfo(clickCity);
            console.log(clickCity);
    })
}}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    var cityname = $('#citysearchinput').val();
      
    if (!cityname) {
        alert('You need a search input value!');
        return;
        }
      
    getWeatherInfo(cityname);
    searchwordHistory.push(cityname);
    localStorage.setItem("search",JSON.stringify(searchwordHistory));
    showingSearchhistory();
};



showingSearchhistory();

if (searchwordHistory.length > 0) {
    getWeatherInfo(searchwordHistory[searchwordHistory.length-1]);
} else if (searchwordHistory.length > 10) {
    searchwordHistory = [];
};

searchBtn.click(handleSearchFormSubmit);

function getWeatherInfo(cityname) {
    
    if (cityname) {
        queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityname + "&appid="+ myApikey;
    ;
    }console.log(queryUrl);
    fetch(queryUrl)
    .then(function(response){
            if (!response.ok) {
                throw response.json();
                }
                return response.json();
                })
    .then(function(data){
            console.log(data);
            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            var citywindspeed = data.wind.speed;
            var cityTemp = data.main.temp;
            var cityHumidity = data.main.humidity;
            var mainweathericon = data.weather[0].icon;
            console.log(mainweathericon);
            console.log(cityLat);
            console.log(cityLon);
            console.log(citywindspeed);
            $('#wind-speed').text('Wind: '+citywindspeed+" MPH");
            $('#city-name').text(cityname + "("+ presentDate+")"); 
            $('#current-weather-pic').attr('src',"https://openweathermap.org/img/wn/" + mainweathericon + "@2x.png");
            $('#temperature').text('Temp: '+cityTemp+"°F");
            $('#humidity').text('Humidity: '+cityHumidity+"%");
        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon; 
        var uvindexQueryUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + myApikey + "&cnt=1";
    fetch(uvindexQueryUrl)
    .then(function(response) {
            if (!response.ok) {
                throw response.json();
                }
                return response.json();
                })
    .then(function(data){
            console.log(data);        
            $('#UV-index').attr("class","badge badge-danger");
            var uvIndex = data[0].value;
            console.log(uvIndex);
            $('#UV-index').text("UV index: "+ uvIndex);
        })
        forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+ "&appid="+myApikey;
    fetch(forecastUrl)
    .then(function(response) {
        if (!response.ok) {
            throw response.json();
            }
            return response.json();
            })
    .then(function(data){
        console.log(data);
        
        const forecastEls = document.querySelectorAll(".forecast");
        for (i=0; i<forecastEls.length; i++) {
            // 변수 설정
            forecastEls[i].innerHTML = "";
            var forecastIndex = [i*8 + 4];
            var forecastDate = new Date(data.list[forecastIndex].dt * 1000);
            console.log(forecastDate);
            // 날짜
            var forecastDay = moment(forecastDate).format('l');
            forecastEls[i].append(forecastDay);
            // 그림넣기
            var forecastImg = document.createElement("img");
            var forecastIcon = data.list[forecastIndex].weather[0].icon;
            forecastImg.setAttribute("src","https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png");
            forecastImg.setAttribute("alt", data.list[forecastIndex].weather[0].description);
            forecastEls[i].append(forecastImg);
            // 기온 넣기
            var forecastTemp = document.createElement("p");
            forecastTemp.innerHTML = "Temp: " + data.list[forecastIndex].main.temp + " &#176F";
            forecastEls[i].append(forecastTemp);
            // 습도 넣기
            var forecastHumidity = document.createElement("p");
            forecastHumidity.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
            forecastEls[i].append(forecastHumidity);
            // 풍속 넣기
            var forecastWindspeed = document.createElement("p");
            forecastWindspeed.innerHTML = "Windspeed: " + data.list[forecastIndex].wind.speed + " MPH";
            forecastEls[i].append(forecastWindspeed);
        }
})});
};

// function searchWordlocal(event) {
//     cityname
//     var cityname = $('#citysearchinput').val();
      
//     if (!cityname) {
//         alert('You need a search input value!');
//         return;
//         }
      
//     getWeatherInfo(cityname);
// }
    
// searchBtn.click(searchWordlocal);

}

initpage()

// initpage;
// Find weather URL
// fethch weather Data
// get data attr for popular cities(greybtn)
// 

// type any city
// click 검색버튼
// get user input from the search box
// send apu fetch request