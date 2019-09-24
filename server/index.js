const bodyParser = require('body-parser');
    express = require('express');
    app = express();
    session = require('express-session');
    passport = require('passport'),
    path = require('path'); 
    PORT = process.env.PORT || 8888;

//initialize environment variables if not in a production environment. 
// should have a local 'secrets' folder that is not tracked by git
if (process.env.NODE_ENV !== 'production') require('../secrets');

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//start an express session
app.use(session({
    secret: 'devSecret',
    expire: 24 * 60 * 60 * 1000,
    resave: true,
    saveUninitialized: false,
    cookie: {secure: false}
}));

//serialize and deserialize the user with passport based on id
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        if (err) return done(err);
        done(null, user);
    })
});

//initialize passport session
app.use(passport.initialize());
app.use(passport.session());

//hit routing middleware
app.use('/api', require('./routes/api'));

//statically serve anything asked for in the public dist folder
app.use(express.static(path.join(__dirname, '..', 'dist')));

//client should not be requesting files that aren't in the dist folder,
//if they do, send a 404 error
app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error('Not found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
});

//for all other requests, just send the main html page
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
});

//error handling middleware - all server errors will end up here
app.use((err, req, res) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

//start the server
app.listen(PORT, async () => {
    console.log('connecting to db...');
    await require('./db');
    console.log(`server listening on port ${PORT}`);
});