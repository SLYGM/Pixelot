const path = require('path');

module.exports = {
    entry: './build/engineExport.js',
    module: {
        rules: [
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'engine.js',
        path: path.resolve(__dirname, 'dist')
    },
};
