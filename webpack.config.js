var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry:  {
                 bundle: './src/app.js'
            },
    output: { path: __dirname, filename: 'index.js' },

    module: {

        // loaders:[
        //
        //     // { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=[name].[ext]'},
        //
        //     {
        //         test: /\.scss$/,
        //         loader: 'style-loader!css-loader!sass-loader'
        //     },
        //
        //     { test: /\.(eot|svg|ttf|woff|woff2)$/,
        //         use: [
        //             {
        //                 loader: 'file-loader',
        //                 options: {
        //                     name: '[name].[ext]',
        //                     outputPath: 'fonts/'
        //                 }
        //             }
        //         ]
        //     },
        // ],

        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },

    watch: true,

    mode: 'development',
};