const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/hello-world.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
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
      template: 'src/page-template.hbs',
      filename: 'hello-world.js.html'
    })
  ]
};