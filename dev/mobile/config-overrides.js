const path = require('path');

module.exports = function override(config, env) {
    config.output = {
        ...config.output,
        path: path.resolve(__dirname, 'jsbin'), // Change this to your desired directory
        filename: 'app.js', // Change this to your desired filename
    };
    return config;
};

