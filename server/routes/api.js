const router = require('express').Router();
const axios = require('axios');
const User = require('../db/models/User.js');

const buildOWMQuery = ({locationIds, zipCode, countryCode}) => {
    const baseUrl = 'api.openweathermap.org/data/2.5/weather';
    const keyQuery = `appid=${process.env.OWM_KEY}`;
    let queryString = '';
    if (locationIds) {
        queryString = `group?id=${locationIds.join(',')}`;
    }
    if (zipCode) {
        queryString = `zip=${zipCode},${countryCode}`;
    }
    return `https://${baseUrl}?${queryString}&${keyQuery}`;
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
    console.log('req.user: ', req.user);
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        const {savedLocationIds} = user; 
        const query = buildOWMQuery({locationIds: savedLocationIds});
        const response = await axios.get(query);
        return res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
});

router.post('/saveLocation', async (req, res, next) => {
    const userId = req.user.id;
    const {locationId} = req.body;
    try {
        const user = await User.findById(userId);
        const locationsSet = new Set(user.savedLocations);
        locationsSet.add(locationId);
        user.savedLocations = [...locationsSet];
        await user.save();
        return res.status(200).send('location saved!');
    } catch (error) {
        next(error)
    }
});

module.exports = router;