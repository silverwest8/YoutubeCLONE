const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            // target: 'http://localhost:4000',
            target: 'http://172.30.1.48/',
            changeOrigin: true,
        })
    );
};