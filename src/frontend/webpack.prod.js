const path = require('path');
const common = require("./webpack.common")
const merge = require("webpack-merge").merge;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = merge(common,{
    mode: "production",
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin({
                terserOptions: {
                    format :{
                        comments:false,
                    },
                },
                extractComments:false,
            })
        ]
    }
});