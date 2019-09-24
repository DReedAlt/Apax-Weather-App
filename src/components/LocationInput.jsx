import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@material-ui/core';

export default function LocationInput({setLocation}) {
    const [location, chooseLocation] = useState({});
    const autoComplete = (e) => {
        e.preventDefault();
        console.log('e: ', e.target.value);
        const text = e.target.value;
        axios.post('/api/locationAutoComplete', {text})
        .then(result => console.log(result))
        .catch(err => console.error(err));
    };
    return (
        <Input 
            name="location"
            onChange={autoComplete}
            placeholder="Location..."
        ></Input>
    );
}