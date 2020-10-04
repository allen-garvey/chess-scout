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
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
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