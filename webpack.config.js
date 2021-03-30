// Imports
const path = require('path');

// Webpack Configuration
const config = {
    mode: "production",
    watch: false,
    entry: {
        index: './src/index.js'
    },
    output: {
        publicPath: './',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'var',
        library: 'Timer53',
        filename: 'Timer53.min.js'
    },
    optimization:{
        minimize: false
    },
    // Loaders
    module: {
        rules: [
            // JavaScript/JSX Files
            {
                test: /\.jsx|\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",    
                        ],
                        plugins: [
                            "@babel/plugin-syntax-jsx",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-syntax-dynamic-import"
                        ]
                    }
                },
            }
        ]
    },
    // devtool: ''
    devtool: 'source-map'

};
// Exports
module.exports = config;