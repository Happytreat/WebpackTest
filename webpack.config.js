const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
    // publicPath: 'https://webpacktesttutorial.com'
  },
  mode: 'none',
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
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
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
    new HtmlWebpackPlugin()
  ]
};