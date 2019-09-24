import React from 'react';
import { Typography } from '@material-ui/core';

export default function WeatherDisplay ({
    description,
    location,
    temperature
}) {
    return (
        <div className="weather-display" hidden={!temperature}> 
            <Typography>{`${location.city}, ${location.country}`}</Typography>
            <Typography>{description}</Typography>
            <Typography>{`${temperature} ${String.fromCharCode(176)}F`}</Typography>
        </div>
    )
}