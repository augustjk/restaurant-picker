const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
      '/check': 'http://localhost:3000',
      '/register': 'http://localhost:3000',
      '/signin': 'http://localhost:3000',
      '/save': 'http://localhost:3000',
      '/signout': 'http://localhost:3000',
    },
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
}

