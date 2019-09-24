import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Button, Typography } from '@material-ui/core';
import LocationInput from './LocationInput.jsx';

function Home ({history}) {
    const [ currentLocation, setCurrentLocation ] = useState({});
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
            <LocationInput setLocation={setCurrentLocation}/>
        </div>
    );
}

export default withRouter(Home);