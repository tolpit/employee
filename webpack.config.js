const webpack = require('webpack');

module.exports = {
    watch: true,
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    entry: './public/src/employee.js',
    output: {
        filename: './public/dist/employee.bundle.js'
    }
};
