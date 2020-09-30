// Figure out how to grab Api information and store it on local storage

$(document).ready(function() {
  // Necessary function to start Jquery once page is ready
  $("#search-button").on("click", function() {
        // Giving button with #search-button id an on click function
    var searchValue = $("#search-value").val();
    // Giving var searchValue the city the user inputs in text input

    // clear input box
    $("#search-value").val("");
    // Clears input box once this var searchValue has variable

    searchWeather(searchValue);
    // starts searchWeather function with the parameter the user input into searchValue
  });

  $(".history").on("click", "li", function() {
    // Adding click function to cliackable items in ul section with a class of history.
    searchWeather($(this).text());
    // Here the searchWeather function will grab the text of the clickable item and use that as the searchValue of the function
  });
// These are the two types of click events on the page that will use all the follwowing defined functions




  function makeRow(text) {
    // This fuction will create a list of clickable items from what the user input in the textbox 
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    // When this function is ran var li will create an li element with the classes list-group-item & list-group-item-action with grabbed text.
    $(".history").append(li);
    // This created li element will now append to the ul element with an id of history
    // This function lives in the searchWeather function
  }
  

  function searchWeather(searchValue) {
    // Creating a searchWeather function with parameter of the searchValue that will take on the value the user inserts either by typing
    // in the text input or clicking a button from their history list
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=1262a42b585a7340214af4ba0f9dc45e",
      // The users input is slipped into the api URL for an ajax call
      // Just fixed the api url so that I could succesfully do an ajax call
      // This call is using the current weather API
      dataType: "json",
      // doing an ajax call to the open weather map api
      success: function(data) {
        // Uses success instead of .then. Why???????????????????????????????
        // Using parameter data instead of usual response
        // create history link for this search

        if (history.indexOf(searchValue) === -1) {
          // This if function starts if the value of searchValue is not found within the object var history (established in larger scope on line 139)
          history.push(searchValue);
          // if user input is not found in var history object, value of var searchValue will be pushed onto var history
          window.localStorage.setItem("history", JSON.stringify(history));
          // updated var history will now be saved to our local storage as a property of the key history
    
          makeRow(searchValue);
          // If new searchValue does not match any property to our local storage history we will run the makerow function appending a
          // new clickable item to the .history ul element
        }

        // I have to make sure I am getting all the information I need form my API call
        
        // continueing on to the rest of the function
        // clear any old content
        $("#today").empty();
        // div with an id of today is emptied

        // create html content for current weather
        
        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        // var title takes on a <h3> element with the clss of card-title and the text of the city name and the current date.
        var card = $("<div>").addClass("card");
        // var car takes on a <div> with the class of card.
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        // var wind takes on a <p> element with the class of card-text and the text of wind speed details.
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        // var humid takes on another <p> element with the class of card-text and the text of humidity details.
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
        // var temp takes on another <p> element with the class of card-text and the text of temperature details.
        var cardBody = $("<div>").addClass("card-body");
        // var cardBody takes on a div with the class of card-body
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");




        // merge and add to page
        title.append(img);
        // appending var image to the var title that has the class card-title
        cardBody.append(title, temp, humid, wind);
        // appending var title, temp, humid, wind, which are body elements to the var cardbody that contians a div with the class of card-body
        card.append(cardBody);
        // appending var cardBody, that now contains all the other content to var card that conatins a larger div with a class name of card
        $("#today").append(card);
        // Now appending the card div to the html dv with the id today
        // This all grabs current weather information andd displays it in the today div
        

        // call follow-up api endpoints
        getForecast(searchValue);
        // calling getForecast function that retrieves data from the 5-day forecast API with the value of searchValue
        getUVIndex(data.coord.lat, data.coord.lon);
        // Calling getUVIndex function with the data's lat and lon filling in its parameteres
      }
    });
  }
  
  function getForecast(searchValue) {
    // Creating a getForecast function with parameter of the searchValue that will take on the value the user inserts either by typing
    // in the text input or clicking a button from their history list
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&units=imperial&appid=1262a42b585a7340214af4ba0f9dc45e",
      // This function is pulling from the 5-day forecast API
      dataType: "json",
      success: function(data) {
        // overwrite any existing content with title and empty row
        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
        // Adding an <h4> element text to the the div with the id of forecast and and also appending a div with the class of row

        console.log(data);

        // loop over all forecasts (by 3-hour increments)
        for (var i = 0; i < data.list.length; i++) {
          // only look at forecasts around 3:00pm
          // displaying each days information by their 3ppm information
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            // this if functions starts if an the index of 15:00:00 is found. 
            // create html elements for a bootstrap card
            var col = $("<div>").addClass("col-md-2");
            // creating var col to hold a <div> with the class of col-md-2.
            var card = $("<div>").addClass("card bg-primary text-white");
            // creating a var card to hold a <div> with the class card bg-primary text-white.
            var body = $("<div>").addClass("card-body p-2");
            // Creating a var body to hold a <div> with the class of card-body p-2.

            var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
            // creating a var title to hold a <h5> with the class of card-title with the text of the date

            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            // Creating a var img to hold an <img> with the attribute of the day's 3pm weather icon

            var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
            // creating a var p1 to hold a <p> with the class of card-text with the text of the max temp of of that time
            var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
            // creating a var p2 to hold a <p> with the class of card-text with the text of the main humidity of that time

            // merge together and put on page
            col.append(card.append(body.append(title, img, p1, p2)));
            // Appending title, img, p1, p2 to body, then appending body to card, then appending card to col

            $("#forecast .row").append(col);
            // Appending col to div with the class of row that we created inside the html div #forecast
          }
        }
      }
    });
  }
  // This ends the 5-day forecast API pull

  function getUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/uvi?appid=1262a42b585a7340214af4ba0f9dc45e&lat=" + lat + "&lon=" + lon,
// This function is pulling from the UVI index API
      dataType: "json",
      success: function(data) {
        var uv = $("<p>").text("UV Index: ");
        // creating a var uv to hold a <p> with the text of the UV index
        var btn = $("<span>").addClass("btn btn-sm").text(data.value);
        // creating a var btn to hold a <span> that has the class of btn btn-sm with the text of the UV Index value
        
        // change color depending on uv value
        if (data.value < 3) {
          btn.addClass("btn-success");
        }
        // If the UV Index value is less than 3 then the button will be green
        else if (data.value < 7) {
          btn.addClass("btn-warning");
        }
        // If not less then 3 then if less than 7 then the button will be yellow
        else {
          btn.addClass("btn-danger");
        }
        // If none o the above the button will show red.
        $("#today .card-body").append(uv.append(btn));
        // Here we append to card body we created in the div #today
      }
    });
  }

  // get current history, if any
  var history = JSON.parse(window.localStorage.getItem("history")) || [];
  // var history gets value of input saved onto local storage

  // This all takes place first. Once document is ready.
  if (history.length > 0) {
    searchWeather(history[history.length-1]);
  }
  // This if function starts if the history array length is greater than 0.
  // If so, it starts the search weather function with the last search the user did-- length index-1.

  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
    // This for loop created a row with the makeRow function for every array item in the local history object.
    
  }
});
