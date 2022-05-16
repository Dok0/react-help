const { ProvidePlugin } = require('webpack');

module.exports = function override(config, env) {
  console.log('----------');
  console.log(config);
  console.log(env);
  console.log('++++++++++');

  config.resolve.fallback = {
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer'),
  };

  config.plugins.push(
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new ProvidePlugin({
      process: 'process/browser',
  }),
  );

  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};