// UglifyJS plugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// SW Precache plugin
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  // Export to static HTML
  async exportPathMap() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
    };
  },
  // Minified using uglifyjs
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true,
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  // Service worker config
  webpack: config => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/,
          },
        ],
      }),
    );
    return config;
  },
};
