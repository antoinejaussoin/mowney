/* eslint object-property-newline:0 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const appVersion = require('./package.json').version;
const languages = require('./app/i18n/languages');

const staticFolder = path.resolve(__dirname, 'assets');
const momentFilter = languages.map(lang => lang.iso).join('|');

module.exports = {
    content: __dirname,
    entry: [
        './app/index.jsx'
    ],
    output: {
        path: staticFolder,
        publicPath: '/assets/',
        filename: `app.${appVersion}.js`
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ],
        root: [
            path.resolve('./app')
        ]
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /(\.jsx|\.js)$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png' },
            { test: /\.jpg$/, loader: 'url?limit=10000&mimetype=image/jpeg' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /(\.scss)$/, loader: ExtractTextPlugin.extract('style',
                'css?sourceMap&modules&importLoaders=1&localIdentName' +
                '=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox') }
        ]
    },
    toolbox: {
        theme: path.join(__dirname, 'app/theme.scss')
    },
    postcss: [autoprefixer],
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, new RegExp(momentFilter)),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: true,
            template: 'content/index-prod.html',
            inject: true,
            appVersion
        }),
        new ExtractTextPlugin(`style.${appVersion}.css`, { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
