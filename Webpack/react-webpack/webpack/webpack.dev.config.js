const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/index.tsx",
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        compress: true,
        port: 9000,
        open: true,
        devMiddleware: {
            writeToDisk: true,
        },
        hot: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html'
    }), new ReactRefreshWebpackPlugin()]
};