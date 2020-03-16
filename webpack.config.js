const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        app: ['babel-polyfill',
                './lib/scripts/app.js'],
        cardElement: './lib/scripts/jobCardElement.js',
        modalElement: './lib/scripts/modalElement.js'
    },
    output: {
        // path: path.resolve(__dirname, 'build'),
        // filename: 'app.bundle.js'
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }                
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    mode: 'development',
    devServer: {
        compress: true
    }
    // plugins: [
    //     new CompressionPlugin({
    //         filename: '[path].br[query]',
    //         algorithm: 'brotliCompress',
    //         test: /\.(js|css|html|svg)$/,
    //         compressionOptions: { level: 11 },
    //         threshold: 10240,
    //         minRatio: 0.8,
    //         deleteOriginalAssets: false,
    //     }),
    // ],
}