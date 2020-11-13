var path = require('path');

module.exports = {
    mode: 'production',
    entry: './frontend/index.js',
    output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};
