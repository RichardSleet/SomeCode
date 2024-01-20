const path = require('path');

module.exports = {
    entry: "./index.js",
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, ''),
        },
        port: 9000,
    },
}