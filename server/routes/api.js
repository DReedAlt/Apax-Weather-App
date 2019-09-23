const router = require('express').Router();

router.get('/', (req, res, next) => {
    console.log('api?');
    return res.send('the api route');
});

module.exports = router;