const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        index: `./src/assets/js/index.js`
    },
    output: {
        filename: `[name].js`
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|vendor)/,
                use: [
                    {
                        loader: `babel-loader`
                    },
                    {
                        loader: `eslint-loader`
                    }
                ]
            }
        ]
    }
}