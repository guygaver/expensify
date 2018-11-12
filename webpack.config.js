const path = require('path');
const publicPath = path.join(__dirname, 'public');

module.exports = {
    entry: './src/app.js',
    output: {
        path: publicPath,
        filename: 'bundle.js'
    },
    
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ],
            exclude: /node_modules/
        }]
    },
    
    devtool: "cheap-module-eval-source-map",

    devServer: {
        contentBase: publicPath,
        historyApiFallback: true
    }
};
