const common = require("./webpack.common")
const merge = require("webpack-merge").merge;
module.exports = merge(common,
    {
        devtool: 'source-map',
        devServer: {
            compress: true,
            devMiddleware: {
                writeToDisk: true,
            },
            static: false,
            proxy: {
                '/': {
                    target: 'http://192.168.200.2/',
                    secure: false,
                    changeOrigin: true
                },
            },
            port: 9000,
            liveReload: true,
            watchFiles: [
                './**/*.php',
                '!./node_modules',
                '!./images'
            ],
        },
        cache: {
            type: 'filesystem',
            allowCollectingMemory: true,
        },
        mode: "development",
    }
)