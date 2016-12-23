// id = acvd1d2zu44qbp3g89p06nxlkertlcj

var streamers = ["ESL_SC2", "TwoEpicBuddies", "OgamingSC2", "hiko", "LCK1", "Forsenlol", "freecodecamp", "habathcx", "noobs2ninjas", "haumph", "jeffHoogland", "brunofin", "comster404"];

$(document).ready(getData);

var url = "https://www.twitch.tv/";

function getData() {

  $.each(streamers, function(i, val) {

    var search = streamers[i];

    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/" + search,
      callback: "?callback=json",
      headers: {
        "Client-ID": "acvd1d2zu44qbp3g89p06nxlkertlcj"
      },
      success: function(json) {
        console.log(json);
        if (json.stream !== null && json.stream !== undefined) {
          $("#online").append("<div class='streamClass, online'><img class='img-circle' src='" + json.stream.channel.logo + "' width=75 height=75/><h1><a href='" + url + search + "' target='_blank'>" + search + "</a></h1>   <p>Playing - " + json.stream.game + "<p></div>");
        } 
        else if (json.stream === null) {
         
          $.ajax({
            type: "GET",
            url: "https://api.twitch.tv/kraken/channels/" + search,
            callback: "?callback=json",
            headers: {
              "Client-ID": "acvd1d2zu44qbp3g89p06nxlkertlcj"
            },
            success: function(data) {
                var logoImage = data.logo;

                if (logoImage === null) {
                  logoImage = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
                }

                $("#offline").append("<div class='streamClass, offline'><img class='img-circle' src='" + logoImage + "' width=75 height=75/><h1><a href='" + url + search + "' target='_blank'>" + search + "</a></h1>   <p>Offline</p></div>");
              } // end success function    

          });
        } else if (json.status === 401) {
          
          $.ajax({
            type: "GET",
            url: "https://api.twitch.tv/kraken/streams/" + search,
            callback: "?callback=json",
            headers: {
              "Client-ID": "acvd1d2zu44qbp3g89p06nxlkertlcj"
            },
            success: function(data) {
              var logoImage = data.logo;

              if (logoImage === undefined) {
                logoImage = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
              } // end if

              $("#closed").append("<div class='streamClass, closed'><img class='img-circle' src=" + logoImage + " width=75 height=75/><h1><a href='" + url + search + "' target='_blank'>" + search + "</a></h1>   <p>Channel Closed</p></div>");

            }
          });
        }
      }
    });
  });
}