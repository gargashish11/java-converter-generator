const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: {
        all: './js/main.js',
    },
    output: {
        filename: "./js/all.min.js",
        path: path.resolve('../main/resources/static/', 'dist'),
        //  clean: true //don't use
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'images'),
                    path.resolve(__dirname, 'scrap_code')
                ],
                include: path.resolve(__dirname, './src/js/**/*'),
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            workers: 10,
                            poolRespawn: false,
                        }
                    },
                    'babel-loader'
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/style.min.css"
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [
                'dist/**/*',
            ]
        })
    ],
}