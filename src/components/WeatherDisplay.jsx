import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const kToF = k => {
    return (k - 273.15) * (9 / 5) + 32;
};

export default function WeatherDisplay ({
    locationWeather = {}
}) {
    const description = locationWeather.weather ? locationWeather.weather[0].description : '';
    const temperature = locationWeather.main ? Math.floor(kToF(locationWeather.main.temp)) : '';
    const location = {
        city: locationWeather && locationWeather.name,
        country: locationWeather.sys && locationWeather.sys.country
    };
    const icon = locationWeather.weather && locationWeather.weather[0].icon;

    return (
        <Card className="weather-display" hidden={!temperature}> 
            <div className="img-container">
                <img src={`http://openweathermap.org/img/wn/${icon}.png`} />
            </div>
            <div className="weather-info">
                <Typography>{`${location.city}, ${location.country}`}</Typography>
                <Typography>{description}</Typography>
                <Typography>{`${temperature} ${String.fromCharCode(176)}F`}</Typography>
            </div>
        </Card>
    )
}