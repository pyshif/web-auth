const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (env) => {
    console.log('env :>> ', env);

    return merge(common, {
        mode: 'development',

        plugins: [
            new Dotenv({
                path: `./.env.${env.mode}`
            })
        ],

        output: {
            filename: 'static/js/[name].bundle.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            clean: true,
        },

        devtool: 'source-map',

        devServer: {
            port: 3000,
            compress: true,
            historyApiFallback: true, // redirect 404 to index.html
            disableDotRule: true // for using dot in url path
        }
    });
}