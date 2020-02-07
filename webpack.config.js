const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge({
    entry: './src/index.ts',
    mode,
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: '[name].js',
      sourceMapFilename: '[file].map',
      path: path.resolve(__dirname, 'dist'),
      library: 'SvgImageGenerator',
      libraryExport: 'default',
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new CleanWebpackPlugin({}),
      new HtmlWebPackPlugin({
        title: 'SvgImageGenerator',
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
        hash: true,
        inject: 'head'
      })
    ]
  },
  modeConfig(mode)
  );
};