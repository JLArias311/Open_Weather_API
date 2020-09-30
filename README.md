HW #06 Open Weather API

URL: 

In this project I worked with The Open Weather API to grab particular information I wanted to display on my weather forcast webpage.

The goal was to get more familair with doing more detailed ajax pulls form server side APIS.

In this activiuty I had to pull from 3 separate API's in the Open Weather API website.

1. Current Weather API
2. 5-day forecast API
3. UV Index API

After getting comfortable with the API's documentaion and getting an API key, I read through the jQuery and javaScript code in detail, to figure out exactly what was happening and where I would have to make changes-- sorry for the explosion of psuedocode.

Althogh I realized halfway through that most of the code was already set-to-go and I had to back track to the original content a few times, I did get to really understand how this code was pulling and rendering information from the API to it's page.

The final application allows users to type in a city in a text box.

If the API recognizes the user input the page displays the current weather for that city with a 5-day forcast on a div below.

The chosen city is also saved into local storage and if the local storage doeasn't already contain the city, a clickable item will be added/created to an unordered list div containing the user's search history.

The search history items can then be clicked to get the weather and 5-day forcast for the city again.


