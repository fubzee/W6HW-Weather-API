var cityLinkEl = document.querySelector("#linkcityName");
var cityNameEl = document.querySelector("#cityName");
var locationEl = document.querySelector("#location");
var alllinkEl = document.querySelector("#addCityLink");
var addlinkEl = document.querySelector("#cityLink");
var City0 = document.querySelector("#linkcityName0");
var City1 = document.querySelector("#linkcityName1");
var City2 = document.querySelector("#linkcityName2");
var City3 = document.querySelector("#linkcityName3");
var City4 = document.querySelector("#linkcityName4");
var City5 = document.querySelector("#linkcityName5");
var City6 = document.querySelector("#linkcityName6");
var City7 = document.querySelector("#linkcityName7");
var City8 = document.querySelector("#linkcityName8");
var City9 = document.querySelector("#linkcityName9");
var fcbtnEl = document.querySelector("#dayforecast");
var viewEl = document.querySelector("#view");
var today = moment();
var saveCity = "";
var param = "";
var innerLocation = " ";
var save_cityName = [];
var apiKey = "5a68fdabf50ab78935a2dbd217873eb7";
var apiUnits = "metric";
var apiLang = "en";
var iconLink = "http://openweathermap.org/img/wn/" + dayicon + "@2x.png";
var dayicon = "";
var dayweather = {
                        // http://openweathermap.org/img/wn/10d@2x.png
    day: [],           // from open api daily date (unix)
    zone: [],            // get timezone
    offset: [],         // timezone offset
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

    $("#localDate").text(today.format("dddd, MMM Do, YYYY HH:mm"));
    $(".view").hide();
    loadSavedCity();
    displaySavedCity();

    function retrieveWeather(innerLocation)
    {
        console.log("Search location=" , innerLocation);
        var weatherUrl="https://api.openweathermap.org/data/2.5/weather?q=" + innerLocation + "&appid=" + apiKey + "&units=" + apiUnits + "&lang=" + apiLang;
        fetch(weatherUrl)
        .then(function (response) {
            return response.json()
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
                return response.json()
            })
            .then(data => {

                for( var i=0; i < 6; i++){

                    dayweather.day[i] = data ['daily'][i]['dt'];
                    dayweather.zone[i] = data ['timezone'];
                    dayweather.offset[i] = data ['timezone_offset'];
                    dayweather.temperature[i] = data ['daily'][i]['temp']['max'];
                    dayweather.humidity[i] = data['daily'][i]['humidity'];
                    dayweather.UVindex[i] = data ['daily'][i]['uvi'];
                    dayweather.day[i] = data ['daily'][i]['dt'];
                    dayweather.id[i] = data ['daily'][i]['weather'][0]['id'];
                    dayweather.main[i] = data ['daily'][i]['weather'][0]['main'];
                    dayweather.conditions[i] = data ['daily'][i]['weather'][0]['description'];
                    dayweather.icon[i] = data ['daily'][i]['weather'][0]['icon'];
                    dayweather.windspeed[i] = data ['daily'][i]['wind_speed'];
                    console.log(dayweather);
                    displayWeather();
                    displayforecastWeather();
                }
            return;
            })
        })    
        .catch(err => {
            $("#dtToday").text("No Weather data available");
         //   return;
            
        })

    }

    

    function displayWeather()
    
    {
        var unixTimestamp = dayweather.day[0];
        var milliseconds = unixTimestamp * 1000;
        var localday = new Date(milliseconds);
        var displayday = localday.toLocaleString();
        var fetchdate = displayday.split(' ')[0];
        console.log("display", displayday);
        $("#dtToday").text(innerLocation + " ....  " + fetchdate);
        console.log("display today's weather",displayday);
        var weatherIcon = dayweather.icon[0];
        $("#weatherCondition").text("Weather Conditions: " + dayweather.conditions[0]).append(`<img src = "http://openweathermap.org/img/wn/${weatherIcon}.png">`);
        $("#weatherTemperature").text("Temperature: " + dayweather.temperature[0] + " C");
        $("#weatherHumidity").text("Humidity: " + dayweather.humidity[0] + "  %");
        $("#weatherWindspeed").text("Wind Speed: " + dayweather.windspeed[0] + "  KM/h");
        console.log(dayweather.UVindex[0]);
       
        if (dayweather.UVindex[0] < 3)
        {
            uvRank = "* Low"   // Green
            $("#weatherIndex").css("color", "white" ).css("background","green").text("UV Index: " + dayweather.UVindex[0] + "  " + uvRank)
        }
        else
        {
            if (dayweather.UVindex[0] < 6)
            {
                uvRank = "** Moderate to High"    //  yellow
                $("#weatherIndex").css("color", "black" ).css("background","yellow").text("UV Index: " + dayweather.UVindex[0] + "  " + uvRank)
            }
            else
            {
                if (dayweather.UVindex[0] < 8)
                {
                    uvRank = "*** Very High to Extreme"  // orange
                    $("#weatherIndex").css("color", "black" ).css("background","orange").text("UV Index: " + dayweather.UVindex[0] + "  " + uvRank)
                }
                else
                {
                    if (dayweather.UVindex[0] < 11 )
                    {
                        uvRank = "**** Very High to Extreme"  // red 
                        $("#weatherIndex").css("color", "white" ).css("background","red").text("UV Index: " + dayweather.UVindex[0] + "  " + uvRank)
                    }
                    else
                    {
                        uvRank = "***** Very High to Extreme"   // purple
                        $("#weatherIndex").css("color", "white" ).css("background","purple").text("UV Index: " + dayweather.UVindex[0] + "  " + uvRank)
                    }
                }
             }
        }
    }

    function displayforecastWeather()
    {

        for (var i = 1; i < 6; i++)
        {
            //prepare the date for display
            var unixTimestamp = dayweather.day[i];
            var milliseconds = unixTimestamp * 1000;
            var localday = new Date(milliseconds);
            var displayday = localday.toLocaleString();
            var fetchdate = displayday.split(' ')[0];
            var caseNo = i;
            console.log(caseNo , "- switch");
            switch (caseNo)
                {
                case 1:
                    $("#dtForecast1").text(fetchdate);
                    console.log("display day's weather", displayday);
                    var weatherIcon = dayweather.icon[i];
                    $("#fcweatherCondition1").text("Weather Conditions: " + dayweather.conditions[i]).append(`<img src = "http://openweathermap.org/img/wn/${weatherIcon}.png">`);
                    $("#fcweatherTemperature1").text("Temperature: " + dayweather.temperature[i] + " C");
                    $("#fcweatherHumidity1").text("Humidity: " + dayweather.humidity[i] + "  %");
                    $("#fcweatherWindspeed1").text("Wind Speed: " + dayweather.windspeed[i] + "  KM/h");
                    console.log(dayweather.UVindex[i]);
                
                    if (dayweather.UVindex[i] < 3)
                    {
                        uvRank = "* Low"   // Green
                        $("#fcweatherIndex1").css("color", "white" ).css("background","green").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                    }
                    else
                    {
                        if (dayweather.UVindex[i] < 6)
                        {
                            uvRank = "** Moderate to High"    //  yellow
                            $("#fcweatherIndex1").css("color", "black" ).css("background","yellow").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                        }
                        else
                        {
                            if (dayweather.UVindex[i] < 8)
                            {
                                uvRank = "*** Very High to Extreme"  // orange
                                $("#fcweatherIndex1").css("color", "black" ).css("background","orange").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                            }
                            else
                            {
                                if (dayweather.UVindex[i] < 11 )
                                {
                                    uvRank = "**** Very High to Extreme"  // red 
                                    $("#fcweatherIndex1").css("color", "white" ).css("background","red").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                                else
                                {
                                    uvRank = "***** Very High to Extreme"   // purple
                                    $("#fcweatherIndex1").css("color", "white" ).css("background","purple").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                            }
                        }
                    }
                break;
                case 2:

                    $("#dtForecast2").text(fetchdate);
                    console.log("display day's weather", displayday);
                    var weatherIcon = dayweather.icon[i];
                    $("#fcweatherCondition2").text("Weather Conditions: " + dayweather.conditions[i]).append(`<img src = "http://openweathermap.org/img/wn/${weatherIcon}.png">`);
                    $("#fcweatherTemperature2").text("Temperature: " + dayweather.temperature[i] + " C");
                    $("#fcweatherHumidity2").text("Humidity: " + dayweather.humidity[i] + "  %");
                    $("#fcweatherWindspeed2").text("Wind Speed: " + dayweather.windspeed[i] + "  KM/h");
                    console.log(dayweather.UVindex[i]);
                
                    if (dayweather.UVindex[i] < 3)
                    {
                        uvRank = "* Low"   // Green
                        $("#fcweatherIndex2").css("color", "white" ).css("background","green").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                    }
                    else
                    {
                        if (dayweather.UVindex[i] < 6)
                        {
                            uvRank = "** Moderate to High"    //  yellow
                            $("#fcweatherIndex2").css("color", "black" ).css("background","yellow").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                        }
                        else
                        {
                            if (dayweather.UVindex[i] < 8)
                            {
                                uvRank = "*** Very High to Extreme"  // orange
                                $("#fcweatherIndex2").css("color", "black" ).css("background","orange").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                            }
                            else
                            {
                                if (dayweather.UVindex[i] < 11 )
                                {
                                    uvRank = "**** Very High to Extreme"  // red 
                                    $("#fcweatherIndex2").css("color", "white" ).css("background","red").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                                else
                                {
                                    uvRank = "***** Very High to Extreme"   // purple
                                    $("#fcweatherIndex2").css("color", "white" ).css("background","purple").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                            }
                        }
                    }
                break;
                case 3:
                    $("#dtForecast3").text(fetchdate);
                    console.log("display day's weather", displayday);
                    var weatherIcon = dayweather.icon[i];
                    $("#fcweatherCondition3").text("Weather Conditions: " + dayweather.conditions[i]).append(`<img src = "http://openweathermap.org/img/wn/${weatherIcon}.png">`);
                    $("#fcweatherTemperature3").text("Temperature: " + dayweather.temperature[i] + " C");
                    $("#fcweatherHumidity3").text("Humidity: " + dayweather.humidity[i] + "  %");
                    $("#fcweatherWindspeed3").text("Wind Speed: " + dayweather.windspeed[i] + "  KM/h");
                    console.log(dayweather.UVindex[i]);
                
                    if (dayweather.UVindex[i] < 3)
                    {
                        uvRank = "* Low"   // Green
                        $("#fcweatherIndex3").css("color", "white" ).css("background","green").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                    }
                    else
                    {
                        if (dayweather.UVindex[i] < 6)
                        {
                            uvRank = "** Moderate to High"    //  yellow
                            $("#fcweatherIndex3").css("color", "black" ).css("background","yellow").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                        }
                        else
                        {
                            if (dayweather.UVindex[i] < 8)
                            {
                                uvRank = "*** Very High to Extreme"  // orange
                                $("#fcweatherIndex3").css("color", "black" ).css("background","orange").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                            }
                            else
                            {
                                if (dayweather.UVindex[i] < 11 )
                                {
                                    uvRank = "**** Very High to Extreme"  // red 
                                    $("#fcweatherIndex3").css("color", "white" ).css("background","red").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                                else
                                {
                                    uvRank = "***** Very High to Extreme"   // purple
                                    $("#fcweatherIndex3").css("color", "white" ).css("background","purple").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                            }
                        }
                    }
                break;
                case 4:
                    $("#dtForecast4").text(fetchdate);
                    console.log("display day's weather", displayday);
                    var weatherIcon = dayweather.icon[i];
                    $("#fcweatherCondition4").text("Weather Conditions: " + dayweather.conditions[i]).append(`<img src = "http://openweathermap.org/img/wn/${weatherIcon}.png">`);
                    $("#fcweatherTemperature4").text("Temperature: " + dayweather.temperature[i] + " C");
                    $("#fcweatherHumidity4").text("Humidity: " + dayweather.humidity[i] + "  %");
                    $("#fcweatherWindspeed4").text("Wind Speed: " + dayweather.windspeed[i] + "  KM/h");
                    console.log(dayweather.UVindex[i]);
                
                    if (dayweather.UVindex[i] < 3)
                    {
                        uvRank = "* Low"   // Green
                        $("#fcweatherIndex4").css("color", "white" ).css("background","green").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                    }
                    else
                    {
                        if (dayweather.UVindex[i] < 6)
                        {
                            uvRank = "** Moderate to High"    //  yellow
                            $("#fcweatherIndex4").css("color", "black" ).css("background","yellow").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                        }
                        else
                        {
                            if (dayweather.UVindex[i] < 8)
                            {
                                uvRank = "*** Very High to Extreme"  // orange
                                $("#fcweatherIndex4").css("color", "black" ).css("background","orange").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                            }
                            else
                            {
                                if (dayweather.UVindex[i] < 11 )
                                {
                                    uvRank = "**** Very High to Extreme"  // red 
                                    $("#fcweatherIndex4").css("color", "white" ).css("background","red").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                                else
                                {
                                    uvRank = "***** Very High to Extreme"   // purple
                                    $("#fcweatherIndex4").css("color", "white" ).css("background","purple").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                            }
                        }
                    }
                break;
                case 5:
                    $("#dtForecast5").text(fetchdate);
                    console.log("display day's weather", displayday);
                    var weatherIcon = dayweather.icon[i];
                    $("#fcweatherCondition5").text("Weather Conditions: " + dayweather.conditions[i]).append(`<img src = "http://openweathermap.org/img/wn/${weatherIcon}.png">`);
                    $("#fcweatherTemperature5").text("Temperature: " + dayweather.temperature[i] + " C");
                    $("#fcweatherHumidity5").text("Humidity: " + dayweather.humidity[i] + "  %");
                    $("#fcweatherWindspeed5").text("Wind Speed: " + dayweather.windspeed[i] + "  KM/h");
                    console.log(dayweather.UVindex[i]);
                
                    if (dayweather.UVindex[i] < 3)
                    {
                        uvRank = "* Low"   // Green
                        $("#fcweatherIndex5").css("color", "white" ).css("background","green").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                    }
                    else
                    {
                        if (dayweather.UVindex[i] < 6)
                        {
                            uvRank = "** Moderate to High"    //  yellow
                            $("#fcweatherIndex5").css("color", "black" ).css("background","yellow").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                        }
                        else
                        {
                            if (dayweather.UVindex[i] < 8)
                            {
                                uvRank = "*** Very High to Extreme"  // orange
                                $("#fcweatherIndex5").css("color", "black" ).css("background","orange").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                            }
                            else
                            {
                                if (dayweather.UVindex[i] < 11 )
                                {
                                    uvRank = "**** Very High to Extreme"  // red 
                                    $("#fcweatherIndex5").css("color", "white" ).css("background","red").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                                else
                                {
                                    uvRank = "***** Very High to Extreme"   // purple
                                    $("#fcweatherIndex5").css("color", "white" ).css("background","purple").text("UV Index: " + dayweather.UVindex[i] + "  " + uvRank)
                                }
                            }
                        }
                    }
                break;
                default:
                    $("#forecastWeather").hide;
                    var error = $(errorBox).append("<p>").addClass("error-message");
                    
                    $("#error-message").text("No Weather data available");
            }
        }
    }
    function loadSavedCity()
    {
        if (localStorage.getItem("save_cityName") != null)
        {
            save_cityName = JSON.parse(localStorage.getItem("save_cityName"));
        }
        
    }

    function displaySavedCity()
    {
        console.log("savecityName", save_cityName);

        if (save_cityName != null)
        {
            console.log("Found city array");
            console.log(save_cityName.length);
            var idx = 10;
            if (idx > save_cityName.Length)
            {
                idx = save_cityName.Length;
            }
            for (let i=0; i < idx; i++)
            {

                if (save_cityName[i] != null)
                {
                     if (i < 10) {

                         addlinkEl = save_cityName[i];

                        if ( i == 0)
                        {
                            document.getElementById("linkcityName0").innerHTML = addlinkEl;
                        }
                        if ( i == 1)
                        {
                            document.getElementById("linkcityName1").innerHTML = addlinkEl;
                        }
                        if ( i == 2)
                        {
                            document.getElementById("linkcityName2").innerHTML = addlinkEl;
                        }
                        if ( i == 3)
                        {
                            document.getElementById("linkcityName3").innerHTML = addlinkEl;
                        }
                        if ( i == 4)
                        {
                            document.getElementById("linkcityName4").innerHTML = addlinkEl;
                        }
                        if ( i == 5)
                        {
                            document.getElementById("linkcityName5").innerHTML = addlinkEl;
                        }
                        if ( i == 6)
                        {
                            document.getElementById("linkcityName6").innerHTML = addlinkEl;
                        }
                        if ( i == 7)
                        {
                            document.getElementById("linkcityName7").innerHTML = addlinkEl;
                        }
                        if ( i == 8)
                        {
                            document.getElementById("linkcityName8").innerHTML = addlinkEl;
                        }
                        if ( i == 9)
                        {
                            document.getElementById("linkcityName9").innerHTML = addlinkEl;
                        }
                    }             
                }
            }
        }
    }
    function addSavedCity(innerLocation)
    {
        if (save_cityName != "" || save_cityName != null)
        {
            
            saveCity = true;
            for (var i = 0 ; i < 10; i++)
            {
                if (save_cityName[i] == innerLocation){
                    saveCity = false;
                }
            }
            if (saveCity)
            {
                save_cityName.unshift(innerLocation);
                console.log("saved",save_cityName);
                window.localStorage.setItem("save_cityName",JSON.stringify(save_cityName)); 
            }
            
        }
        else
        {
            save_cityName[0] = innerLocation;
        }
    }

    function getLocation(){

        innerLocation = document.getElementById("location").value;
        console.log ("innerLocation is" , innerLocation);
        console.log("location elemet", locationEl.value);
        addSavedCity(innerLocation);
        loadSavedCity();
        displaySavedCity();
        retrieveWeather(innerLocation);
    }

    function getSavedlocation(param){

        innerLocation = save_cityName[param];
        
        retrieveWeather(innerLocation);
    }

    document.getElementById("linkcityName0").addEventListener("click",function(){getSavedlocation("0")}); 
    document.getElementById("linkcityName1").addEventListener("click",function(){getSavedlocation("1")}); 
    document.getElementById("linkcityName2").addEventListener("click",function(){getSavedlocation("2")});  
    document.getElementById("linkcityName3").addEventListener("click",function(){getSavedlocation("3")}); 
    document.getElementById("linkcityName4").addEventListener("click",function(){getSavedlocation("4")}); 
    document.getElementById("linkcityName5").addEventListener("click",function(){getSavedlocation("5")}); 
    document.getElementById("linkcityName6").addEventListener("click",function(){getSavedlocation("6")}); 
    document.getElementById("linkcityName7").addEventListener("click",function(){getSavedlocation("7")}); 
    document.getElementById("linkcityName8").addEventListener("click",function(){getSavedlocation("8")}); 
    document.getElementById("linkcityName9").addEventListener("click",function(){getSavedlocation("9")}); 
    document.getElementById("searchLocation").addEventListener("click",function(){getLocation(locationEl)});
    
    $("#dayforecast").click(function() {
        $(".view").toggle(50,"linear")});
});