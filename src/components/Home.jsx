import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Button, Typography } from '@material-ui/core';
import { CircularProgress, LocationInput, LocationList } from './index.js';

function Home ({history}) {    
    const [savedLocations, setSavedLocations] = useState([]);
    const [loadingSavedLocations, setLoadingSavedLocations] = useState(false);

    useEffect(() => {
        setLoadingSavedLocations(true);
        axios.get('/api/savedLocations')
        .then(res => res.data)
        .then(locations => {
            setSavedLocations(locations);
            setLoadingSavedLocations(false);
        })
        .catch(err => console.error(err));
    }, []);
    
    const logout = () => {
        axios.post('/auth/logout')
        .then(res => history.push('/login'))
        .catch(err => console.error(err));
    }

    return (
        <div>
            <AppBar>
                <Button variant="primary" onClick={logout}>Logout</Button>
            </AppBar>
            <Typography variant="subtitle1" paragraph={true}>
                Welcome to Apax Weather
            </Typography>
            <Typography variant="body1">
                Please enter a location you would like to see the weather for:  
            </Typography>
            <LocationInput/>
            <LocationList locations={savedLocations} loading={loadingSavedLocations}/>
        </div>
    );
}

export default withRouter(Home);