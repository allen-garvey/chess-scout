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
        contentBase: path.join(__dirname, 'public'),
        publicPath: 'http://localhost:3000/assets/',
        port: 3000,
        historyApiFallback: {
            index: 'index.html'
        },
        open: true,
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
                            'vue-style-loader',
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