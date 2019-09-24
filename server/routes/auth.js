const router = require('express').Router();
const User = require('../../db/models/User.js');
module.exports = router;

router.post('/login', (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(401).send('User not found')
        } 
        user.verifyPassword(req.body.password, (err, verified) => {
            if (err) return next(err);
            if (verified) {
                req.login(user, err => (err ? next(err) : res.json(user)))
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
        User.create(user, (err, user) => {
            if (err) {
                return next(err);
            }
            res.status(201).send('User created!');
        });
    });
});