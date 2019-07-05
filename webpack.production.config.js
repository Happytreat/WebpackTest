const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'hello-world': './src/hello-world.js',
    'kiwi': './src/kiwi.js'
  },
  output: {
    // content hash for browser caching
    // name: 2 entry points
    filename: '[name].[contenthash].js',
    // has to be absolute path
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/'
    // publicPath: 'https://webpacktesttutorial.com'
  },
  mode: 'production',
  // extract common dependencies of different code-split chunks
  // into its own bundle instead of downloading two copies of dependency
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      automaticNameDelimiter: "_"
    }
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
      filename: '[name].[contenthash].css'
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
      title: 'Hello-world',
      description: 'This is my first webpack test run project: hello-world page',
      template: 'src/page-template.hbs',
      filename: '../hello-world.html',
      chunks: ['hello-world', 'hello-world_kiwi'], // chunk name specified in entry point
    }),
    new HtmlWebpackPlugin({
      title: 'Kiwi',
      description: 'This is my first webpack test run project: kiwi page',
      template: 'src/page-template.hbs',
      filename: '../kiwi.html',
      chunks: ['kiwi', 'hello-world_kiwi'], // chunk name specified in entry point
    })
  ]
};