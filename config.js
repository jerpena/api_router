const { WEATHER_API_KEY, FOURSQUARE_API_KEY } = process.env
const config = {
    PORT: 5000,
    CACHE_TIME: '10 minutes',
    RATE_LIMIT_TIME: 3e+5, // 5 minutes(300,000 ms)
    MAX_RATE: 30, // 5 max requests
    allowedOrigins: ['https://5500.code.arct.xyz', 'https://jeremypena.dev'],
    needleOptions: {
        compressed: true,
        parse: true
    },
    proxies: [
        {
            route: '/weather',
            allowedMethods: ['GET'],
            url: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                appid: WEATHER_API_KEY
            }
        },
        {
            route: '/places',
            allowedMethods: ['GET'],
            url: 'https://api.foursquare.com/v3/places/search',
            params: {
                limit: 10
            },
            headers: {
                Accept: 'application/json',
                Authorization: FOURSQUARE_API_KEY
            }
        }
    ]
}

export default config;