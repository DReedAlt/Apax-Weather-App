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
    console.log('loggedIn: ', loggedIn);
    return (
        <Router>
            <Switch>
                {loggedIn && 
                    <Switch>
                        <Route component={Home} />
                    </Switch>
                }
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
                <Route component={Login} />
            </Switch>
        </Router>
    )
}