import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { LocationInput } from './components';

function App () {
    const [ currentLocation, setCurrentLocation ] = useState({});
    return (
        <div>
            <Typography variant="subtitle1" paragraph={true}>
                Welcome to Apax Weather
            </Typography>
            <Typography variant="body1">
                Please enter a location you would like to see the weather for:  
            </Typography>
            <LocationInput setLocation={setCurrentLocation}/>
            {/*currentLocation.id && <WeatherDisplay location={currentLocation} />*/}
        </div>
    );
}

export default App;