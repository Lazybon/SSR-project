const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const generateScopeName = () => {
  const componentName = resourcePath
      .split('/')
      .filter(item => !['desktop', 'mobile'].includes(item))
      .slice(-2, -1);

  return `${componentName}_${localName}`;
}

module.exports = {
  entry: [path.join(__dirname, 'app/server/index.js')],
  target: 'node',
  output: {
    path: path.resolve('./build'),
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: [{loader: 'babel-loader', options: {
          plugins: [[
              'react-css-module', {
            generateScopeName
            }
          ]]
          }}, 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  node: {
    fs: 'empty',
  },
};
