import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Typography } from '@material-ui/core';
import WeatherDisplay from './WeatherDisplay.jsx';

const kToF = k => {
    return (k - 273.15) * (9 / 5) + 32;
};

function LocationInput({saveLocation}) {
    const [currentWeather, setCurrentWeather] = useState({});

    const description = currentWeather.weather ? currentWeather.weather[0].description : '';
    const temperature = currentWeather.main ? Math.floor(kToF(currentWeather.main.temp)) : '';
    const location = currentWeather.name ? {
        city: currentWeather.name,
        country: currentWeather.sys && currentWeather.sys.country
    } : {};

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
    const handleSaveLocation = () => {
        const {locationId} = currentWeather;
        axios.post('/api/saveLocation', {locationId})
        .then(res => res.data)
        .then(response => console.log(response))
        .catch(err => console.error(err));
    };

    return (
        <div className='flex'>
            <form onSubmit={handleSubmit} className='half-width'>
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
                >
                    Get Weather!
                </Button>
            </form>
            <div className="half-width">
                <WeatherDisplay 
                    className="half-width"
                    description={description}
                    location={location} 
                    temperature={temperature} 
                />
                <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={() => handleSaveLocation()}
                >
                    Save this location
                </Button>
            </div>
        </div>
    );
};

export default LocationInput;