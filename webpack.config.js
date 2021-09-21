const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: [
            `${__dirname}/src/index.js`, 
            `${__dirname}/sass/app.scss`,
        ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/assets'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
            watch: true,
        },
        devMiddleware: {
            publicPath: '/assets/'
        },
        port: 3000,
        historyApiFallback: {
            index: 'index.html'
        },
        open: true,
        client: {
            overlay: {},
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                oneOf: [
                    // this matches `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    esModule: false,
                                    modules: {
                                        localIdentName: '[local]_[hash:base64:8]',
                                    },
                                }
                            },
                            {
                                loader: 'sass-loader',
                            },
                        ]
                    },
                    {
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            'css-loader',
                            'sass-loader',
                        ]
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '../assets/app.css',
        }),
    ],
};