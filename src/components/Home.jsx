import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Button, Typography } from '@material-ui/core';
import { LocationInput, LocationList } from './index.js';

function Home ({history}) {    
    const [savedLocations, setSavedLocations] = useState([]);
    const [loadingSavedLocations, setLoadingSavedLocations] = useState(false);
    const loadWeatherData = () => {
        setLoadingSavedLocations(true);
        axios.get('/api/savedLocations')
        .then(res => res.data)
        .then(locations => {
            setSavedLocations(locations);
            setLoadingSavedLocations(false);
        })
        .catch(err => console.error(err));
    }
    
    useEffect(loadWeatherData, []);
    
    const logout = () => {
        axios.post('/auth/logout')
        .then(res => history.push('/login'))
        .catch(err => console.error(err));
    }

    return (
        <div>
            <AppBar>
                <div className="app-bar">
                    <Typography 
                        color="default"
                        className="header-text" 
                        paragraph={true}
                        variant="h5" 
                    >
                        Apax Weather App
                    </Typography>
                    <Button 
                        color="primary"
                        className="header-text"
                        onClick={logout}  
                        variant="contained" 
                    >
                        Logout
                    </Button>
                </div>
            </AppBar>
            <div className="content">
                <LocationInput updateLocations={loadWeatherData} />
                <LocationList locations={savedLocations} loading={loadingSavedLocations} refresh={loadWeatherData}/>
            </div>
        </div>
    );
}

export default withRouter(Home);