const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
    console.log('api?');
    return res.send('the api route');
});

router.post('/locationAutoComplete', async (req, res, next) => {
    const { text } = req.body;
    console.log('url: ', `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.ACCUWEATHER_KEY}&q=${text}`);
    try {
        const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.ACCUWEATHER_KEY}&q=${text}`);
        const data = await response.json();
        console.log('response: ', response);
        console.log('result: ', data);
        // return res.status(201).json(data);
        return res.send('nothing yet');
    } catch (error) {
        console.log('error: ', error);
        return next(error);
    }
});

module.exports = router;