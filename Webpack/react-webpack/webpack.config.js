const glob = require('glob');
const path = require('path');
const { merge } = require('webpack-merge');
const developmentConfig = require('./webpack.dev.config');
const productionConfig = require('./webpack.prod.config');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

// Get all file entries  
// function getEntries() {
//     let map = {}
//     const entryFiles = glob.sync("./src/**/*.js")

//     entryFiles.forEach(filepath => {
//         let fileDir = /.\/src\/(.*?)\.js/.exec(filepath)

//         map[fileDir[1]] = filepath
//     })

//     return map
// }

const commonConfig = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
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
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
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