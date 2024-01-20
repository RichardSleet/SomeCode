const glob = require('glob');
const path = require('path');
const { merge } = require('webpack-merge');
const developmentConfig = require('./webpack.dev.config');
const productionConfig = require('./webpack.prod.config');

const isDevelopment = process.env.NODE_ENV;

const commonConfig = {
    context: path.resolve(__dirname, '..'),
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};
module.exports = (env, args) => {
    switch (args.mode) {
        case 'development':
            return merge(commonConfig, developmentConfig);
        case 'production':
            return merge(commonConfig, productionConfig);
        default:
            throw new Error('No matching configuration was found!');
    }
}