const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        app: ['babel-polyfill',
                './lib/scripts/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/preset-env']
            }
        }]
    },
    mode: 'development',
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