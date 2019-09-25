import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, TextField, Typography } from '@material-ui/core';
import WeatherDisplay from './WeatherDisplay.jsx';

function LocationInput({updateLocations}) {
    const [currentWeather, setCurrentWeather] = useState({});
    const [locationSaved, setLocationSaved] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const zipCode = e.target.zipCode.value;
        const countryCode = e.target.countryCode.value;
        axios.post('/api/locationCurrentWeather', {
            zipCode,
            countryCode
        })
        .then(({data}) => {
            setCurrentWeather(Object.assign({}, {zipCode, countryCode}, data));
        })
        .catch(err => console.error(err));
    };
    const handleSaveLocation = () => {
        const {zipCode, countryCode} = currentWeather;
        axios.post('/api/saveLocation', {zipCode, countryCode})
        .then(res => res.data)
        .then(response => {
            setLocationSaved(true)
            updateLocations();
        })
        .catch(err => console.error(err));
    };
    return (
        <div className='location-input'>
            <div className="location-input-card white-background">
                <Typography variant="subtitle2">
                    Enter a zip code and country to see the weather for that location:
                </Typography>
                <form className="location-input-form" onSubmit={handleSubmit}>
                    <TextField 
                        label="zip code"
                        name="zipCode"
                        margin="normal"
                        placeholder="enter zip..."
                        className="location-input"
                        variant="filled"
                    ></TextField>
                    <TextField 
                        label="ISO country code (defaults to 'us')"
                        name="countryCode"
                        margin="normal"
                        placeholder="two letter country code (us, uk, de, etc.)..."
                        className="location-input"
                        variant="filled"
                    ></TextField>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Get Weather!
                    </Button>
                </form>
            </div>
            <div className={`location-input-card ${!currentWeather.name && 'hide'}`}>
                <WeatherDisplay locationWeather={currentWeather} />
                <Button 
                    color="primary" 
                    variant="contained"
                    disabled={locationSaved} 
                    onClick={() => handleSaveLocation()}
                >
                    {locationSaved ? 'Location saved!' : 'Save this location'}
                </Button>
            </div>
        </div>
    );
};

export default LocationInput;