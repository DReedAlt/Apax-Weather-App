import React, { useState } from 'react';
import { Button, FormLabel, TextField } from '@material-ui/core';
import axios from 'axios';

export default function Signup ({updateLoggedIn, history}) {
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
        const username = e.target.username.value;
        const password = e.target.password.value;
        const verifyPassword = e.target.verifyPassword.value;
        if (password === verifyPassword) {
            axios.post('/auth/signup', {username, password})
            .then(res => {
                console.log('res:', res);
                updateLoggedIn(Boolean(res.data));
                history.push('/');
            });
        }
    }

    return (
        <form onSumbit={signup}>
            <FormLabel>Login</FormLabel>
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
            <Button variant="primary" type="submit">Login</Button>
        </form>
    );
}