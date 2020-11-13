const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProd = (process.env.NODE_ENV === 'production')
console.log(`Production mode: ${isProd}`)

module.exports = {
  target: 'web',
  entry: "./src/index.ts",
  output: {
    filename: "erd-connect.js",
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "bn.js": require.resolve("bn.js")
    },
    fallback: { 
      "buffer": require.resolve('buffer/'),
      "crypto": require.resolve('crypto-browserify'),
      "stream": require.resolve('stream-browserify'),
      "fs": false,
      "path": false,
    }
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        loader: "ts-loader" 
      },
      {
        test: /\.svg$/,
        loader: 'react-svg-loader',
      },      
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.browser': JSON.stringify(true),
    }),
    // only want bip39 english wordlist
    new webpack.IgnorePlugin(/^\.\/(?!english)/, /bip39\/src\/wordlists$/),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   defaultSizes: 'gzip',
    //   openAnalyzer: false,
    // }),
  ],
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? undefined : 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}