# API Proxy

This proxy that allows you to route requests to a public API without exposing your precious API keys. It can be used with any public API with easy configuration options.

- [API Proxy](#api-proxy)
  - [Install](#install)
  - [Usage](#usage)
    - [.env](#env)
    - [config.js](#configjs)

## Install

Clone the Repo

```git
git clone https://github.com/jerpena/api_router.git
```

Install packages

```bash
npm i 
```

## Usage

### .env

This file is where your API keys will live. I have included an example .env file to get you started. When creating this file it is important to have your API keys between quotes like below. Make sure it is in the root folder for the project as well.

```env
WEATHER_API_KEY='your_key_here'
FOURSQUARE_API_KEY='your_key_here'
```

### config.js

This file contains your proxy objects as well as some configuration options for needle. I have included the OpenWeatherMap API as well as the Foursquare API to get you started.

***Port***

Set this to the port you want to run your server on.

```js
  PORT: 5000
```

***Cache requests***

This proxy utilizes the [apicache](https://www.npmjs.com/package/apicache) npm package to reduce the network requests sent. Set this to the amount of time you want your requests cached for. The format for the duration is in *[length][unit]*.

```js
  CACHE_TIME: '10 minutes' 
```

The cache can be bypassed by sending the "x-apicache-bypass" header along with the request from the client side to the proxy.

```js
fetch(url, {
  headers: {
    "x-apicache-bypass": true
  }
})
```

***Rate limiting***

I have included rate limiting on this project and it can be setup like the example below. The value should be an integer.

```js
    RATE_LIMIT_TIME: 3e+5, // 5 minutes(300,000 ms)
    MAX_RATE: 30, // 30 max requests
```

***Allowed Origins***

This allows you to restrict access to the proxy so that only these domains will have access. It takes an array of strings.

```js
    allowedOrigins: ['https://google.com', 'https://yourdomain.com']
```

***Needle options***

I have utilized the [needle npm package](https://www.npmjs.com/package/needle) for the requests that are sent to the 3rd party API. You can include any options from that package that you need here and they will be used for the 3rd party request. Refer to needle's documentation for the options that are available.

```js
    needleOptions: {
            compressed: true,
            parse: true //parse JSON
        }
```

***Proxies***

This value is an array of objects where each object is a 3rd party api that you want to utilize.

- **route (required)** - is the endpoint you would like to use
- **allowedMethods (optional)** - is an array of the methods that you want to allow for the api. If this key is not included, it defaults to 'GET'
- **url (required)** - is the api that you want to send your requests to
- **params (optional)** - is an object that holds the queries you want attached to your request. Any queries that you attach client side will automattically be included in the request to the 3rd party.
- **headers (optional)** - this is used when your 3rd party API needs any type of headers to be sent with your request.

```js
{
  route: '/your-route',
  allowedMethods: ['GET'],
  url: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
      appid: WEATHER_API_KEY
  },
  headers: {
                Accept: 'application/json',
                Authorization: YOUR_API_KEY
            }
}
```
