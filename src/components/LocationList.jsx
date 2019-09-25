import React from 'react';
import {Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import WeatherDisplay from './WeatherDisplay.jsx';

export default function LocationList({locations, loading, refresh}) {
    if (loading) return <CircularProgress />
    return (
        <div className="saved-locations-list">
            <div>
                <Typography variant="h6">Your saved locations:</Typography>
                <Button variant="text" onClick={refresh}>Refresh</Button>
            </div>
            <Grid container spacing={20}>
                { locations ?
                    locations.map(location => {
                        return (
                            <Grid item xs={3}>
                                <WeatherDisplay locationWeather={location} />
                            </Grid>
                        )
                    })
                    :
                    null
                }
            </Grid>
        </div>
    );
}