const path = require('path');
const publicPath = path.join(__dirname, 'public');

module.exports = (env, argv) => {

    const isProduction = env === 'production';

    return {

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
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader',],
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/
            }]
        },

        devtool: isProduction ? "source-map" : "inline-source-map",

        devServer: {
            contentBase: publicPath,
            historyApiFallback: true
        }
    };
};
