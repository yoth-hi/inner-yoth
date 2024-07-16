module.exports = function override(config, env) {
    config.output = {
        ...config.output,
        path: require('path').resolve(__dirname, 'jsbin'),
        filename: 'app.js',
    };
    return config;
};
