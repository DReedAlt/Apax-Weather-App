const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');

const PORT = 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/api'));

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use((req, res, next) => {
    console.log('path: ', path);
    if (path.extname(req.path).length) {
        const err = new Error('Not found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
});

app.use('*', (req, res) => {
    console.log('sending html');
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});