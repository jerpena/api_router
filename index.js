const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit')
require('dotenv').config();
const {
    PORT = 5000,
    RATE_LIMIT_TIME = 3e+5,
    MAX_RATE = 5
} = process.env

const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: RATE_LIMIT_TIME,
    max: MAX_RATE
})
app.use(limiter)
app.set('trust proxy', 1)

// Routes
app.use('/api', require('./routes'))

app.use(cors());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))