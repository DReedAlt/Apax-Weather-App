import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, FormLabel, TextField, Typography } from '@material-ui/core';
import axios from 'axios';

function Login ({history, updateLoggedIn}) {
    const login = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        axios.post('/auth/login', {username, password})
        .then(res => {
            updateLoggedIn(Boolean(res.data));
            history.push('/');
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <form onSubmit={login}>
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
                <Button variant="primary" onClick={login}>Login</Button>
            </form>
            <Typography>
                If you would like to create an account, <Link to='/signup'>sign up here!</Link>
            </Typography>
        </div>
    );
};

export default withRouter(Login);
