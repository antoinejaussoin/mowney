/* eslint object-property-newline:0 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const languages = require('./app/i18n/languages');

const staticFolder = path.resolve(__dirname, 'assets');
const momentFilter = languages.map(lang => lang.iso).join('|');

module.exports = {
    content: __dirname,
    entry: [
        'react-hot-loader/patch',
        './app/index.jsx'
    ],
    output: {
        path: staticFolder,
        publicPath: 'http://localhost:8080/assets/',
        filename: 'app.js'
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
        preLoaders: [
            { test: /(\.jsx|\.js)$/, loaders: ['eslint'] }
        ],
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /(\.jsx|\.js)$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png' },
            { test: /\.jpg$/, loader: 'url?limit=10000&mimetype=image/jpeg' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /(\.scss)$/, loader: 'style!css?sourceMap&modules&importLoaders=1&' +
                'localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox' }
        ]
    },
    toolbox: {
        theme: path.join(__dirname, 'app/theme.scss')
    },
    postcss: [autoprefixer],
    eslint: {
        configFile: './.eslintrc',
        emitWarning: true
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, new RegExp(momentFilter)),
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEVELOPMENT__: true,
            __DEVTOOLS__: false
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        })
    ]
};
