// @ts-check
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('sass');

const isProduction = process.env.NODE_ENV === 'production';
// const isDevelopment = !isProduction;
console.log('isProduction', isProduction);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    `${__dirname}/src/index.js`,
  ],
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'],
              },
            },
          },
        ],
      },
    ],
  },
};
