const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            'fs': false,
            'path': false,
        }
    },
    optimization: {
        minimize: true,
        minimizer: [ new TerserPlugin({
            terserOptions: {
                keep_classnames: true,
                keep_fnames: true,
            },
        }) ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist-webpack')
    },
};
