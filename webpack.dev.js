const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    // console.log('env :>> ', env);
    return merge(common, {
        mode: 'development',
        plugins: [
            new Dotenv({
                path: `./.env.${env.env}`
            })
        ],
        devtool: 'source-map',
        devServer: {
            port: 3000,
            compress: true,
            historyApiFallback: true, // redirect 404 to index.html
        }
    });
}