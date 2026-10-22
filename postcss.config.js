const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: {
    'postcss-preset-env': {},
    ...(isProduction ? { cssnano: {} } : {}),
  },
};
