import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import { Home, Login, Signup } from './components';

export default function App() {
    const [loggedIn, updateLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('/auth/loggedIn')
        .then(res => res.data)
        .then(userLoggedIn => updateLoggedIn(userLoggedIn))
        .catch(err => console.error(err));
    });
    
    return (
        <Router>
            <Switch>
                <Route exact path='/signup' render={() => <Signup updateLoggedIn={updateLoggedIn} />} />
                <Route exact path='/login' render={() => <Login updateLoggedIn={updateLoggedIn} />} />
                <Route path='/' render={() => loggedIn ? <Home /> : <Login updateLoggedIn={updateLoggedIn} />} />
            </Switch>
        </Router>
    )
}