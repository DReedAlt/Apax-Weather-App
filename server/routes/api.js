const router = require('express').Router();
const axios = require('axios');
const User = require('../db/models/User.js');

const buildOWMQuery = ({zipCode, countryCode, fullLocation}) => {
    const baseUrl = 'api.openweathermap.org/data/2.5/weather';
    const keyQuery = `appid=${process.env.OWM_KEY}`;
    let queryString = fullLocation ? fullLocation : `${zipCode},${countryCode}`;
    return `https://${baseUrl}?zip=${queryString}&${keyQuery}`;
}

router.post('/locationCurrentWeather', async (req, res, next) => {
    const { zipCode, countryCode } = req.body;
    const query = buildOWMQuery({zipCode, countryCode});
    try {
        const response = await axios.get(query);
        return res.status(200).json(response.data);
    } catch (error) {
        return next(error);
    }
});

router.get('/savedLocations', async (req, res, next) => {
    const userId = req.user && req.user.id;
    try {
        const user = await User.findById(userId);
        const {savedLocations} = user; 
        const queries = savedLocations.map(code => buildOWMQuery({fullLocation: code}));
        const responses = await Promise.all(queries.map(query => axios.get(query)));
        return res.status(200).json(responses.map(r => r.data));
    } catch (error) {
        next(error);
    }
});

router.post('/saveLocation', async (req, res, next) => {
    const userId = req.user && req.user.id;
    const {zipCode, countryCode} = req.body;
    const location = `${zipCode},${countryCode}`;
    try {
        const user = await User.findById(userId);
        const locationsSet = new Set(user.savedLocations || []);
        locationsSet.add(location);
        user.savedLocations = [...locationsSet];
        await user.save();
        return res.status(200).send('location saved!');
    } catch (error) {
        next(error)
    }
});

module.exports = router;