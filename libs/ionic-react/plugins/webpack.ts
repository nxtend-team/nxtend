// eslint-disable-next-line @typescript-eslint/no-var-requires
const getWebpackConfig = require('@nrwl/react/plugins/webpack');

function getCustomWebpackConfig(webpackConfig) {
  const config = getWebpackConfig(webpackConfig);

  // Polyfill Node
  config.node = {
    global: true,
    process: true
  };

  return config;
}

module.exports = getCustomWebpackConfig;
