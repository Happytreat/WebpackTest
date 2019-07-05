const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'hello-world': './src/hello-world.js',
    'kiwi': './src/kiwi.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
    // publicPath: 'https://webpacktesttutorial.com'
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    index: 'hello-world.js.html',
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.css$/,
        // webpack process loaders from right to left
        use: [
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties']
          }
        }
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello-world',
      description: 'This is my first webpack test run project: hello-world page',
      template: 'src/page-template.hbs',
      filename: '../hello-world.html',
      chunks: ['hello-world'], // chunk name specified in entry point
    }),
    new HtmlWebpackPlugin({
      title: 'Kiwi',
      description: 'This is my first webpack test run project: kiwi page',
      template: 'src/page-template.hbs',
      filename: '../kiwi.html',
      chunks: ['kiwi'], // chunk name specified in entry point
    })
  ]
};