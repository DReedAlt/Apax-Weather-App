# apax-weather-app

# To start:
after git cloning, cd into the project folder and:
- `npm install`
- `npm build` (this will watch for changes to the project, run in a separate terminal if you want it to keep running
- you will need to have a mongo database running locally called 'apax_weather' for the app to start
- `npm start` to start the server and go to `localhost:8888`
- You will need to sign up at `/signup` to login and view the main app

**Note:** normally I would hide the weather api key in a secrets.js file, but since it's just a trial key and this is a private repo, I figured it would be easier to just include it in the code rather than send over a secrets file.
