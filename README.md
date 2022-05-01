# API Proxy

This is a simple proxy that allows you to route requests to a public API without exposing your precious API keys. Currently it only supports openweathermap.org, though it is made to be easily extensible.

## Setup

Clone the repo and create an .env file with your base url, the key name, and your API key.

Deploy it to your server

Make requests to your server with /api added to the end.

` https://yoururl.com/api?q=Boston
`
