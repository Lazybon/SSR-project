const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const generateScopedName = (localName, resourcePath) => {
  const componentName = resourcePath
    .split('/')
    .filter(item => !['desktop', 'mobile'].includes(item))
    .slice(-2, -1);

  return `${componentName}_${localName}`;
};

module.exports = {
  mode: 'development',
  entry: [path.join(__dirname, 'app/index.js')],
  output: {
    path: path.resolve(__dirname, './dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [['react-css-modules', { generateScopedName, webpackHotModuleReloading: true }]],
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: false,
              modules: {
                mode: 'local',
                getLocalIdent: (context, localIdentName, localName) =>
                  generateScopedName(localName, context.resourcePath),
              },
              sourceMap: false,
              localsConvention: 'camelCaseOnly',
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    alias: {
      icons: path.join(__dirname, 'assets/icons'),
      GraphQl: path.join(__dirname, 'graphql'),
      Components: path.join(__dirname, 'components'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(`./app/index.html`),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    disableHostCheck: true,
    useLocalIp: true,
    hot: true,
    port: 8080,
    headers: {
      'Service-Worker-Allowed': '/',
    },
    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    stats: 'minimal',
  },
  stats: 'minimal',
};
