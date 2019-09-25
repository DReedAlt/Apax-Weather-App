import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Card, FormLabel, TextField, Typography } from '@material-ui/core';
import axios from 'axios';

function Login ({history, updateLoggedIn}) {
    const login = (e) => {
        e.preventDefault();
        // const username = e.target.username.value;
        // const password = e.target.password.value;
        const username = 'test';
        const password = 'test';
        axios.post('/auth/login', {username, password})
        .then(res => {
            updateLoggedIn(Boolean(res.data));
            history.push('/');
        })
        .catch(err => console.error(err));
    }

    return (
        <Card className="auth-card">
            <form className="auth-form" onSubmit={login}>
                <FormLabel>Apax Weather Login</FormLabel>
                <TextField
                    label="user name"
                    name="username"
                />
                <TextField
                    label="password"
                    name="password"
                    type="password"
                />
                <Button 
                    className="auth-button" 
                    variant="contained"     
                    type="submit"
                >
                    Login
                </Button>
            </form>
            <Typography className="signin-message">
                If you would like to create an account, <Link to='/signup'>sign up here!</Link>
            </Typography>
        </Card>
    );
};

export default withRouter(Login);
