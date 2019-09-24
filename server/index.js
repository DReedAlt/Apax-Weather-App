const express = require('express'),
    app = express(),
    session = require('express-session'),
    morgan = require('morgan'),
    cors = require('cors'),
    bodyparser = require('body-parser'),
    passport = require('passport'),
    User = require('./db/models/User.js'),
    path = require('path'),
    PORT = process.env.PORT || 8888;

//initialize environment variables
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'develop') require('../secrets');

app.use(session({
    secret: 'devSecret',
    expire: 24 * 60 * 60 * 1000,
    resave: true,
    saveUninitialized: false,
    cookie: {secure: false}
}));

app.use(morgan('dev'));

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        if (err) return done(err);
        done(null, user);
    })
});

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error('Not found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
});

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, async () => {
    console.log('connecting to db....');
    await require('./db');
    console.log(`listening on port ${PORT}`);
});

module.exports = app;