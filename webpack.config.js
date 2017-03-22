const path = require('path');

module.exports = {
    entry: './src/scripts/Main.jsx',
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules:[
            {
                test: /\.jsx$/,
                exclude: [/node_modules/],
                use: ['babel-loader']
            }
        ]
    }
}