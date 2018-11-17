const path = require('path');
const webpack = require('webpack');
const publicPath = path.join(__dirname, 'public');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if ( process.end.NODE_ENV === 'test' ) {
    require('dotenv').config({path: '.env.test'})
} else if ( process.end.NODE_ENV === 'development' ) {
    require('dotenv').config({path: '.env.dev'})
}

module.exports = (env, argv) => {

    const isProduction = env === 'production';

    return {

        entry: './src/app.js',

        output: {
            path: path.join(publicPath, 'dist'),
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
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    }
                ],
                exclude: /node_modules/
            }]
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGE_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGE_SENDER_ID),
            })
        ],

        devtool: isProduction ? "source-map" : "inline-source-map",

        devServer: {
            contentBase: publicPath,
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};
