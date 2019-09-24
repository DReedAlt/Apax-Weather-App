const router = require('express').Router();
const axios = require('axios');

const buildOWMQuery = ({zipCode, cityName, countryCode}) => {
    const baseUrl = 'api.openweathermap.org/data/2.5/weather';
    const keyQuery = `appid=${process.env.OWM_KEY}`;
    let queryString = '';
    if (zipCode) {
        queryString = `zip=${zipCode}`;
    }
    if (cityName) {
        queryString = `q=${cityName}`
    }
    return `https://${baseUrl}?${queryString},${countryCode}&${keyQuery}`;
}

router.post('/locationCurrentWeather', async (req, res, next) => {
    const { zipCode, cityName, countryCode } = req.body;
    const query = buildOWMQuery({zipCode, cityName, countryCode});
    try {
        const response = await axios.get(query);
        return res.status(200).json(response.data);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;