import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormLabel, TextField, Typography } from '@material-ui/core';
import axios from 'axios';

export default function Login ({updateLoggedIn, history}) {
    const login = (e) => {
        const username = e.target.username.value;
        const password = e.target.password.value;
        axios.post('/auth/login', {username, password})
        .then(res => {
            console.log('res:', res);
            updateLoggedIn(Boolean(res.data));
            history.push('/');
        })
    }

    return (
        <div>
            <form onSumbit={login}>
                <FormLabel>Login</FormLabel>
                <TextField
                    label="user name"
                    name="username"
                />
                <TextField
                    label="password"
                    name="password"
                    type="password"
                />
                <Button variant="primary" type="submit">Login</Button>
            </form>
            <Typography>
                If you would like to create an account, <Link to='/signup'>sign up here!</Link>
            </Typography>
        </div>
    );
}