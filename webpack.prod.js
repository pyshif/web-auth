const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    console.log('env :>> ', env);
    return merge(common, {
        mode: 'production',
        plugins: [
            new Dotenv({
                path: `./.env.${env.mode}`
            })
        ],
        optimization: {
            minimize: true,
            minimizer: ['...', new CssMinimizerPlugin(), new TerserPlugin()]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'static/js/[name].[contenthash].bundle.js',
            publicPath: '/',
            clean: true,
        }
    });
}