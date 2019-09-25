const router = require('express').Router();
const User = require('../db/models/User.js');
module.exports = router;

router.post('/login', (req, res, next) => {
    console.log('req.bod: ', req.body);
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user || !req.body.password) {
            res.status(401).send('User not found')
        } 
        user.verifyPassword(req.body.password, (err, verified) => {
            if (err) return next(err);
            if (verified) {
                req.login(user, err => (err ? next(err) : res.status(200).send('user logged in!')))
            } else {
                res.status(401).send('Incorrect password')
            }
        });
    });
});

router.post('/signup', (req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({
        username: user.username
    }, (err, found) => {
        if (err) return next(err);
        if (found) return res.status(200).send('username already exists');
        User.create(user, (err, newUser) => {
            if (err) {
                return next(err);
            }
            req.login(newUser, err => (err ? next(err) : res.status(200).send('User created!')))
        });
    });
});

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/loggedIn', (req, res, next) => {
    if (!req.user) return res.status(200).send(false);
    User.findOne({username: req.user.username}, (err, user) => {
        if (err) return next(err);
        res.status(200).send(user.username);
    });
});