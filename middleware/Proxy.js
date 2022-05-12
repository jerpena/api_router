import needle from 'needle';
import config from '../config.js';
import pathFilter from '../Utils/PathFilter.js';
const { needleOptions, proxies } = config;

const createProxy = (options) => {
    const {
        route,
        url,
        allowedMethods = ['GET'],
        headers = {},
        ...rest
    } = options;

    return async (req, res, next) => {
        if (pathFilter(options, req)) {
            try {
                needleOptions.headers = headers;
                const params = new URLSearchParams({
                    ...req.query,
                    ...options.params,
                });
                const response = await needle('get', `${url}?${params}`, needleOptions);
                const data = await response.body;
                if (process.env.NODE_ENV !== 'production') {
                    console.log(`REQUEST: ${url}?${params}`);
                }
                res.status(200).json(data);
            } catch (error) {
                res.status(500).json(error.message);
            }
        }
        next();
    };
};

export const proxyMiddlewares = proxies.map((proxy) => createProxy(proxy));
