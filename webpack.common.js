const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: './src/index.tsx'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            // favicon: path.resolve(__dirname, 'public/favicon.png'),
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css',
            chunkFilename: 'static/css/[id].[contenthash].css',
        })
    ],


    module: {
        rules: [
            // JavaScript
            {
                test: /\.m?jsx?$/i,
                exclude: /node_modules/i,
                use: ['babel-loader']
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
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            hooks: path.resolve(__dirname, "src/hooks"),
            pages: path.resolve(__dirname, "src/pages"),
            utils: path.resolve(__dirname, "src/utils"),
            styles: path.resolve(__dirname, "src/styles"),
            images: path.resolve(__dirname, "src/images"),
            contexts: path.resolve(__dirname, 'src/contexts')
        },
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'static/js/[name].[contenthash].bundle.js',
        publicPath: '/',
        clean: true,
    }
}