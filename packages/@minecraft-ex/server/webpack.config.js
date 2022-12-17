const path = require('path');

module.exports = {
  mode: "none",
  entry: './src/index.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    outputModule: true
  },
  externalsType: "module",
  externals: {
    "@minecraft/server": "@minecraft/server"
  },
  optimization: {
    minimize: true
  },
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
    resolver: "enhanced-module",
    extensions: [ '.tsx', '.ts', '.js' ]
  }
};