# W6HW-Weather-API
Site: https://fubzee.github.io/W6HW-Weather-API/

Git Repo : https://github.com/fubzee/W6HW-Weather-API

### The Task
Create a an application that will provide a traveller (or any one else who may have an interest) the weather outlook for a paricular city.

### How it works:

When the location is entered, it is saved that will find the weather conditions for a location you enter for Searching:

![image](https://user-images.githubusercontent.com/94102473/150674119-27efbce1-b64b-49ca-91c9-55df6314a7ee.png)

When you enter the city and hit ### Search

1.  The current weather details for that city are returned

![image](https://user-images.githubusercontent.com/94102473/150674628-98bdcc17-dd51-42c8-908e-9bf3890ae628.png)

2.  The location Searched is automatically saved as a quick link for easy selection for any future searches (the last 10 searches are returned to the user)

![image](https://user-images.githubusercontent.com/94102473/150674573-9b1b2a43-7252-4a30-bd24-9c3025f6a96f.png)

3.  There is an option to view any future weather forecasts for the locations searched

![image](https://user-images.githubusercontent.com/94102473/150674661-bfdb385e-4512-4bc1-ab7a-cb12419e7270.png)

### Things to note:
If your location entered is already saved as a quick link, the city will not be saved again.
The user has an option to toggle the 5 day forecast should they wish to see it.
The program uses the Moment.js to dispay the currrent date and to convert the date from the 3rd party API into human readable format.  
The data is provided by the OpenWeatherAPI

