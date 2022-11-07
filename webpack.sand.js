const { merge } = require('webpack-merge');
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');



module.exports = (env) => {
    console.log('env :>> ', env);

    const test = {
        entry: './sand/index.tsx'
    }

    switch (env.mode) {
        case 'dev':
            return merge(dev(env), {
                ...test,

            });
        case 'prod':
            return merge(prod(env), {
                ...test,
            });
    }
}