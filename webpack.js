const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const config = require('./config.js');

let nodeModules = ['mongoose'];
if (process.env.NODE_ENV !== 'production') {
  nodeModules = fs
    .readdirSync(path.join(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1);
}
const webpackConfig = {
  context: `${__dirname}/src`,
  entry: [`${__dirname}/src/express/index.js`],
  target: 'node',
  output: { path: `${__dirname}/dist`, filename: 'server.js' },
  node: { __dirname: false, __filename: false },
  externals: [
    /**
     * parsing external node modules
     * deciding whether to include it in the bundle or not
     * @param  {[type]}   context  [description]
     * @param  {[type]}   request  [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    function parseExternals(context, request, callback) {
      const pathStart = request.split('/')[0];
      if (nodeModules.indexOf(pathStart) >= 0 && request !== 'webpack/hot/signal.js') {
        return callback(null, `commonjs ${request}`);
      }
      callback();
      return true;
    },
  ],
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'es2017'],
              plugins: [
                ['transform-runtime', { polyfill: true, regenerator: true }],
                /**
                 for three dots destructors
                 @example { ...obj }
                 */
                'transform-object-rest-spread',
                /**
                 for adding properties to classes:
                 @example class Testing {
                 property = value
               }
                 */
                'transform-class-properties',
              ],
            },
          },
        ],
      },
      // for the server schema file
      {
        test: /\.(graphql)$/,
        exclude: /node_modules/,
        use: [{ loader: 'raw-loader' }],
      },
    ],
  },
};
if (process.env.NODE_ENV !== 'production') {
  const bannerPlugin = new webpack.BannerPlugin({
    banner: "require('source-map-support').install();",
    raw: true,
    entryOnly: false,
  });
  webpackConfig.devtool = 'source-map';
  webpackConfig.plugins.push(bannerPlugin);
} else if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.DefinePlugin({ 'global.GENTLY': false }));
}
module.exports = webpack(webpackConfig);
