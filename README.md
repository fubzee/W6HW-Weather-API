# W6HW-Weather-API
Site: https://fubzee.github.io/W6HW-Weather-API/

Git Repo : https://github.com/fubzee/W6HW-Weather-API

### The Task
Create a an application that will provide a traveller (or any one else who may have an interest) the weather outlook for a particular city.

### How it works:

When the location is entered, it is saved for later use and will trigger a call to the OpenWeather API and find the weather conditions for a location you enter for Searching:

![image](https://user-images.githubusercontent.com/94102473/150674119-27efbce1-b64b-49ca-91c9-55df6314a7ee.png)

When you enter the city and hit ![image](https://user-images.githubusercontent.com/94102473/150675207-f08cecd4-08ad-47ac-88c3-1848b51068d3.png)

1.  The current weather details for that city are returned

![image](https://user-images.githubusercontent.com/94102473/150674628-98bdcc17-dd51-42c8-908e-9bf3890ae628.png)
    
    The UV index is colour coded in accordance with the EPA standard: ![image](https://user-images.githubusercontent.com/94102473/150675076-6283ac09-6cff-4bdf-96d8-c37dc275c444.png)

2.  The SEARCHED location is automatically saved as a quick link for easy selection for any future searches (only the last 10 searches are returned to the user - this is to minimise a user building a long list of items for Searching - this is a deliberate design consideration)

![image](https://user-images.githubusercontent.com/94102473/150674573-9b1b2a43-7252-4a30-bd24-9c3025f6a96f.png)

3.  There is an option to view any future weather forecasts for the locations searched 
![image](https://user-images.githubusercontent.com/94102473/150675217-889b213a-dee0-44a5-a0be-b366927c0298.png)

![image](https://user-images.githubusercontent.com/94102473/150674661-bfdb385e-4512-4bc1-ab7a-cb12419e7270.png)

### Things to note:
If your location entered is already saved as part of the last 10 Searches, the city will not be saved again.  All saved cities are stored in local storage.
The user has an option to toggle the 5 day forecast should they wish to see it.
The program uses the Moment.js to dispay the currrent date and to convert the date from the 3rd party API into human readable format.  
The data is provided by the OpenWeatherAPI

