const path = require('node:path');
const { DefinePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'assets/shop.[contenthash:8].js',
    publicPath: '/sample-vue-shop/',
    clean: false,
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: { vue: 'vue/dist/vue.runtime.esm-bundler.js' },
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.(webp|svg)$/,
        type: 'asset/resource',
        generator: { filename: 'assets/[name][ext]' },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.svg',
    }),
    new MiniCssExtractPlugin({ filename: 'assets/shop.[contenthash:8].css' }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: { format: { comments: false } },
      }),
    ],
  },
  devtool: false,
  devServer: {
    static: false,
    devMiddleware: { publicPath: '/sample-vue-shop/' },
    historyApiFallback: false,
  },
};
