import React from 'react';
import { Typography } from '@material-ui/core';

export default function WeatherDisplay ({
    description,
    temperature
}) {
    return (
        <div> 
            <Typography>{description}</Typography>
            <Typography>{temperature}</Typography>
        </div>
    )
}