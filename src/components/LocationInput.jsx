import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Typography } from '@material-ui/core';
import WeatherDisplay from './WeatherDisplay.jsx';

const kToF = k => {
    return (k - 273.15) * (9 / 5) + 32;
};

function LocationInput({saveLocation}) {
    const [currentWeather, setCurrentWeather] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const cityName = e.target.cityName.value;
        const zipCode = e.target.zipCode.value;
        const countryCode = e.target.countryCode.value;
        axios.post('/api/locationCurrentWeather', {
            cityName,
            zipCode,
            countryCode
        })
        .then(({data}) => {
            setCurrentWeather(Object.assign({}, currentWeather, data));
        })
        .catch(err => console.error(err));
    };
    const description = currentWeather.weather ? currentWeather.weather[0].description : '';
    const temperature = currentWeather.main ? kToF(currentWeather.main.temp) : '';
    console.log(description);
    console.log('temperature: ', temperature);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input 
                    name="cityName"
                    placeholder="City..."
                ></Input>
                <Input 
                    name="zipCode"
                    placeholder="Zip Code..."
                ></Input>
                <Input 
                    name="countryCode"
                    placeholder="ISO country code (us, uk, de, etc.)..."
                ></Input>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                >Get Weather!</Button>
            </form>
            <WeatherDisplay temperature={temperature} description={description} />
        </div>
    );
};

export default LocationInput;