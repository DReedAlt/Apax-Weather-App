import React from 'react';
import {CircularProgress} from '@material-ui/core';
import WeatherDisplay from './WeatherDisplay.jsx';

const kToF = k => {
    return (k - 273.15) * (9 / 5) + 32;
};

export default function LocationList({locations, loading}) {
    if (loading) return <CircularProgress />
    return (
        <ul>
            { locations ?
                locations.map(location => {
                    const description = location.weather ? location.weather[0].description : '';
                    const temperature = location.main ? Math.floor(kToF(location.main.temp)) : '';
                    const locationData = location.name ? {
                        city: location.name,
                        country: location.sys && location.sys.country
                    } : {};
                    return (
                        <li>
                            <WeatherDisplay description={description} temperature={temperature} location={locationData} />
                        </li>
                    )
                })
                :
                null
            }
        </ul>
    );
}