module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // для сервера;
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: true }], // todo убрать loose
  ],
};
