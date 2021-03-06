import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import config from './config.js';
import apicache from 'apicache';
import { proxyMiddlewares } from './middleware/Proxy.js';
const { PORT, CACHE_TIME, RATE_LIMIT_TIME, MAX_RATE, allowedOrigins } = config;
const cache = apicache.options({
    statusCodes: {
        include: [200],
    },
}).middleware;
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg =
                'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
};

const limiter = rateLimit({
    windowMs: RATE_LIMIT_TIME,
    max: MAX_RATE,
});

function newFunction() {
    return require('apicache');
}

function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message,
    });
}

const app = express();
app.use(cors(corsOptions));
app.use(cache(CACHE_TIME));
app.use(limiter);
app.set('trust proxy', 1);

proxyMiddlewares.forEach((proxy) => app.use(proxy));

app.use(errorHandler);

app.listen(process.env.PORT || PORT, () =>
    console.log(`Server running on port ${PORT}`),
);
