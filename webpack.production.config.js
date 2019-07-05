const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    // content hash for browser caching
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/'
    // publicPath: 'https://webpacktesttutorial.com'
  },
  mode: 'production',
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
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
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
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),
    // Cleans all the files in ./dist
    // before creating new bundle/style.css files
    new CleanWebpackPlugin(),
    // E.g. if you want to clean another folder build
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [
    //     '**/*', // all files in ./dist regardless of nesting
    //     path.join(process.cwd(), 'build/**/*')
    //   ]
    // })
    new HtmlWebpackPlugin({
      title: 'Webpack Test',
      description: 'This is my first webpack test run project.',
      template: 'src/index.hbs',
      filename: '../index.html'
    })
  ]
};