import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, FormLabel, TextField } from '@material-ui/core';
import axios from 'axios';

function Signup ({history, updateLoggedIn}) {
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [verifyDirty, setVerifyDirty] = useState(false);

    const handlePassword = (e) => {
        e.preventDefault();
        const password = e.target.value;
        setPassword(password);
    }

    const handleVerifyPassword = (e) => {
        e.preventDefault();
        const verifyPassword = e.target.value;
        setVerifyPassword(verifyPassword);
        setVerifyDirty(true);
    }
    
    const signup = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const verifyPassword = e.target.verifyPassword.value;
        if (password === verifyPassword) {
            axios.post('/auth/signup', {username, password})
            .then(res => {
                updateLoggedIn(Boolean(res.data));
                history.push('/');
            })
            .catch(err => console.error(err));
        }
    }

    return (
        <Card className="auth-card">
            <form className="auth-form" onSubmit={signup}>
                <FormLabel>Sign Up</FormLabel>
                <TextField
                    label="user name"
                    name="username"
                />
                <TextField
                    label="password"
                    name="password"
                    type="password"
                    onChange={handlePassword}
                />
                <TextField
                    label="verify password"
                    name="verifyPassword"
                    error={verifyDirty && (password !== verifyPassword)}
                    type="password"
                    onChange={handleVerifyPassword}
                />
                <Button 
                    className="auth-button" 
                    variant="contained" 
                    type="submit"
                >
                    Sign Up
                </Button>
            </form>
        </Card>
    );
};

export default withRouter(Signup);