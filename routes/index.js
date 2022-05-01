const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');
// Init cache
let cache = apicache.middleware;
// Env vars
const {
    API_BASE_URL,
    API_KEY_NAME,
    API_KEY_VALUE,
    CACHE_TIME
} = process.env;

router.get('/', cache(`${CACHE_TIME}`), async (req, res) => {
    try {

        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })

        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
        const data = apiRes.body

        // Log the public API request
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ error })
    }

})

module.exports = router;