$(document).ready(function() {

  // Get Latitude and Longitude
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var apiKey = "&APPID=ed2f25f97615690f71e88c1a2fe5a99b";
      var call = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial" + apiKey;
      
      //Get JSON 
      $.getJSON(call, function(json) {
        var rawJson = JSON.stringify(json);
        var pJson = JSON.parse(rawJson);

        var cityName = pJson.name;
        var temp = pJson.main.temp;
        var fahrenheit = Math.floor(temp);
        var celcius = Math.floor((fahrenheit - 32) * 0.5556);
        var weather = pJson.weather[0].id;
        $("#cityName").html("City: " + cityName);
        $("#temp").html(fahrenheit + "&deg;");

        // Choose Correct Icon

        if (weather >= 200 && weather <= 232) {
          $("#storm").show();
        } else if (weather >= 300 && weather <= 321) {
          $("#sunShower").show();
        } else if (weather >= 500 && weather <= 531) {
          $("#showers").show();
        } else if (weather >= 600 && weather <= 622) {
          $("#snow").show();
        } else if (weather >= 800 && weather < 804) {
          $("#sunny").show();
        } else if (weather == 804) {
          $("#cloudy").show();
        } else {
          $("#cloudy").show();
        }
        
        // Using our toggle function to switch F to C

        $(".convert").clicktoggle(function() {
            $("#temp").html(celcius + "&deg;")
            $(".convert").html("C")
          },
          function() {
            $("#temp").html(fahrenheit + "&deg;")
            $(".convert").html("F")
          });

        // End Icon Statements

      }); // End JSON call
    }, errorHandler); //Navigator Function
  } // End If
  
  function errorHandler(error){
	switch(error.code){
		case 1:
			updateStatus("The user denied permission. (You're probably using Chrome, which won't let this website use your location. Try switching to Mozilla and trying again!)");
			break;
		case 2:
			updateStatus("Position not found.");
			break;
		case 3:
			updateStatus("Timed out.");
			break;
	}
}

function updateStatus(message){
	document.getElementById("status").innerHTML = "<strong>Error</strong>: " + message;
}
 
}); // On Load Function

// Click Toggle Function
$.fn.clicktoggle = function(a, b) {
  return this.each(function() {
    var clicked = false;
    $(this).click(function() {
      if (clicked) {
        clicked = false;
        return b.apply(this, arguments);
      }
      clicked = true;
      return a.apply(this, arguments);
    });// End Click Function
  });// End Click Function
};//End Toggle Function