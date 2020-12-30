// eslint-disable-next-line @typescript-eslint/no-var-requires
const getWebpackConfig = require('@nrwl/react/plugins/webpack');

function getCustomWebpackConfig(webpackConfig) {
  const config = getWebpackConfig(webpackConfig);
  return config;
}

module.exports = getCustomWebpackConfig;
