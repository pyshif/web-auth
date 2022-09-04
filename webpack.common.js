const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: '.src/index.tsx'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/main.[contenthash].css',
        })
    ],

    module: {
        rules: [
            // JavaScript
            {
                test: /\.m?jsx?$/i,
                exclude: /node_modules/i,
                use: ['bable-loader']
            },
            {
                test: /\.m?tsx?$/i,
                exclude: /node_modules/i,
                use: ['ts-loader']
            },
            // CSS
            {
                test: /\.s?[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            // Assets
            {
                test: /\.(png|svg|jpg|jpeg|gif|mp4|pdf|mpg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/media/[name][hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/font/[name][hash][ext][query]'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}