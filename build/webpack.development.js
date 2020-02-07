const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = (env) => ({
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new TSLintPlugin({
        files: ['./src/**/*.ts']
    })
  ]
});