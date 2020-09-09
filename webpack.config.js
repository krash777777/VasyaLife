var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry:  {
                 bundle: './src/app.js'
            },
    output: { path: __dirname, filename: 'index.js' },
    // output: {
    //         path: path.resolve(__dirname, 'game'),
    //         filename: 'index.js',
    //         //publicPath:  path.resolve(__dirname, './game/'),
    //         },

    module: {

        // loaders: [
        //     {
        //         test: /.jsx?$/,
        //         loader: 'babel-loader',
        //         exclude: /node_modules/,
        //         query: {
        //             presets: ['es2015', 'react']
        //         }
        //     },
        //     {
        //         test: /\.css$/,
        //         use: ['style-loader', 'css-loader']
        //     },
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



            // {
            //     test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[path]/[name].[ext]', // указываем, куда собираются картинки / имя . расширение
            //         }
            //     }
            // }
        ]
    },
    watch: true,
    // watchOptions: {
    //     poll: 1000 // Check for changes every second
    // },
    mode: 'development',
};