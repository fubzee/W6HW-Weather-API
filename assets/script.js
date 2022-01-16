var cityLinkEl = document.querySelector("#cityLink");
var cityNameEl = document.querySelector("#cityName");
var locationEl = document.querySelector("#location");
var today = moment();
var innerLocation = " ";
var cityName = [ ];
var apiKey = "5a68fdabf50ab78935a2dbd217873eb7";
var apiUnits = "metric";
var apiLang = "en";

var dayweather = {
                        // http://openweathermap.org/img/wn/10d@2x.png
    day: [],           // from open api daily date (unix)
    id: [],           // from open api daily weather group (for icon selection)
    main: [],         // from open api daily main weather category
    conditions: [],    // from open api daily weather description (0-6)
    icon: [],        // from open api daily weather icon (0-6)
    temperature: [],   // from open api daily temp day (0-6)
    humidity : [],     // from open api daily thumidy (0-6) expressed as a %
    windspeed: [],     // from open api daily windspeed (0-6) expressed m/s
    UVindex : [],       // from open api daily index 
    longitude: [],    // from weather api 
    latitude: [],     // from weather api

};

$(document).ready(function()
{

    $("#dtToday").text(today.format("dddd, MMM Do, YYYY"));
    loadSavedCity();
    displaySavedCity();
//    retrieveWeather();
    

    function retrieveWeather(innerlocation)
    {
        console.log("Search location=" , innerLocation);
        var weatherUrl="https://api.openweathermap.org/data/2.5/weather?q=" + innerLocation + "&appid=" + apiKey + "&units=" + apiUnits + "&lang=" + apiLang;
        fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(data => { 
            dayweather.longitude[0] = data ['coord']['lon'];
            dayweather.latitude[0] = data ['coord']['lat']; 
            console.log(dayweather.longitude[0]);
            console.log(dayweather.latitude[0]);
            var cityLat = dayweather.latitude[0];
            var cityLong = dayweather.longitude[0];
            console.log (cityLat, cityLong);
            var openweatherUrl="https://api.openweathermap.org/data/2.5/onecall?lat=" + dayweather.latitude[0] + "&lon=" + dayweather.longitude[0] + "&appid=" + apiKey + "&units=" + apiUnits + "&lang=" + apiLang;
            console.log(openweatherUrl);
            fetch( openweatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                dayweather.temperature[0] = data ['daily']['temp'];
                dayweather.humidity[0] = data['daily']['humidity'];
                dayweather.UVindex[0] = data ['daily']['uvi'];
                dayweather.day[0] = data ["daily"]["dt"];
                dayweather.id[0] = data ["daily"]["id"];
                dayweather.main[0] = data ["daily"]["main"];
                dayweather.conditions[0] = data ["daily"]["description"];
                dayweather.icon[0] = data ["daily"]["icon"];
                dayweather.windspeed[0] = data ["daily"]["wind_speed"];
            })
        })    
        .catch(err => {
            $("#dtToday").text("No Weather data available");
            return;
            
        })
        addSavedCity;
        loadSavedCity();
        displaySavedCity();
    }

    function addSavedCity()
    {
        cityName.unshift(innerLocation);
        console.log(cityName);
        window.localStorage.setItem("cityName",JSON.stringify(cityName)); 
        
    }

    function loadSavedCity()
    {
        if (localStorage.getItem("cityName") != null)
        {
            cityName = JSON.parse(localStorage.getItem("cityName"));
        }
        
    }

    function displaySavedCity()
    {
        if (cityName != null)
        
        {
            console.log("Found city array");
            console.log(cityName.length);
            
            for (let i=0; i < cityName.length; i++)
            {
                console.log(cityName.length);
                cityNameEl = cityName[i];
                idx = cityName.length + 1;

                $("#cityLink").html(function(idx){return cityNameEl});
                            
                $("#addCityLink").addClass("btn btn-link").add(id = "cityLink" ).add(type="button").add(id="cityName");
            
                
                console.log(cityNameEl);
              
            }
        }
    }

    function saveCity()
    {
        //schedule.activity[index] =  $("#".concat(index)).val();
        window.localStorage.setItem("cityName",JSON.stringify(cityName)); 


    }

    function getLocation(){

        innerLocation = document.getElementById("location").value;
        console.log ("innerLocation is" , innerLocation);
        retrieveWeather(innerLocation);
    }

    function getSavedlocation(cityNameEl){

        innerLocation = cityNameEl;
        console.log ("innerLocation is" , innerLocation);
        retrieveWeather(innerLocation);
    }

    document.getElementById("cityLink").addEventListener("click",function(){getSavedlocation(cityNameEl)}); 
    document.getElementById("searchLocation").addEventListener("click",function(){getLocation()});
});