const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

// Env vars
const {
    API_BASE_URL,
    API_KEY_NAME,
    API_KEY_VALUE,
    CACHE_TIME
} = process.env;

// Init cache
let cache = apicache.middleware;


module.exports = router;