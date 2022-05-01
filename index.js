const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit')
require('dotenv').config();
const allowedOrigins = (() => {
    const origins = process.env.ALLOWED_ORIGINS;
    return origins.split('|')
})();

const corsOptions = {
    credentials: true,
    exposedHeaders: '*',
    origin: function (origin, callback) {
        // allow requests with no origin 
        // if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

const {
    PORT = 5000,
    RATE_LIMIT_TIME = 3e+5,
    MAX_RATE = 5
} = process.env

const app = express();
app.use(cors(corsOptions))
// Rate limiting
const limiter = rateLimit({
    windowMs: RATE_LIMIT_TIME,
    max: MAX_RATE
})
app.use(limiter)
app.set('trust proxy', 1)

// Routes
app.use('/api', require('./routes'))

    ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))