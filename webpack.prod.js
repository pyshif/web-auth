const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
    console.log('env :>> ', env);

    return merge(common, {
        mode: 'production',
        plugins: [
            new Dotenv({
                path: `./.env.${env.mode}`
            }),
            new BundleAnalyzerPlugin(),
        ],

        // module: {
        //     rules: [
        //         {
        //             sideEffects: false,
        //         },
        //         {
        //             test: /\.s?[ac]ss$/i,
        //             sideEffects: true,
        //         }
        //     ]
        // },

        optimization: {
            minimize: true,
            minimizer: [new CssMinimizerPlugin(), new TerserPlugin({ parallel: true })],
            splitChunks: {
                cacheGroups: {
                    react: {
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                        chunks: 'all',
                        name: 'vendor~react',
                        enforce: true,
                    }
                }
            }

        }
    });
}