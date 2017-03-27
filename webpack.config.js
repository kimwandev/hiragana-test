const path = require('path');

module.exports = {
    entry: './src/scripts/Router.jsx',
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
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, 
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, 
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            }
        ]
    },
    devServer:{
        contentBase: './public'
    }
}