/* eslint-disable n/no-unpublished-import */
import path from 'node:path'
import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import CopyPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'

// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { VueLoaderPlugin } from 'vue-loader'
import { fileURLToPath } from 'node:url'

const isDevelopment = process.env.NODE_ENV !== 'production'
const dirname = path.dirname(fileURLToPath(import.meta.url))

const config = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
  context: path.resolve(dirname),

  output: {
    path: path.resolve(dirname, 'dist'),
    filename: isDevelopment ? '[name].js' : '[name].[contenthash:5].js',
    chunkFilename: isDevelopment ? '[name].js' : '[name].[contenthash:5].js',
    clean: true,
    publicPath: '/',
  },

  entry: {
    index: path.resolve(dirname, 'src/config/index.js'),
  },

  resolve: {
    alias: {
      '@': path.join(dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
    modules: ['node_modules'],
  },

  devServer: {
    static: {
      directory: path.resolve(dirname, 'dist'),
      watch: true,
    },
    historyApiFallback: true,
    compress: true,
    port: 9000,
    hot: true,
  },

  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 10 }),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new Dotenv({ systemvars: true }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(dirname, 'src/config/index.html'),
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[chunkhash:5].css' }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(dirname, 'public'),
          to: path.resolve(dirname, 'dist/'),
          info: { minimized: true },
          noErrorOnMissing: true,
          globOptions: { ignore: ['*.DS_Store'] },
        },
      ],
    }),
    // !isDevelopment && new BundleAnalyzerPlugin(),
  ].filter(Boolean),

  optimization: {
    usedExports: true,
    minimize: !isDevelopment,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        terserOptions: {
          format: { comments: false },
          compress: true,
        },
        extractComments: false,
      }),
    ],
  },

  stats: {
    errors: true,
    warnings: true,
    timings: true,
    entrypoints: false,
    children: false,
    chunks: false,
    outputPath: false,
    modules: false,
    publicPath: false,
    version: false,
    assets: false,
    hash: false,
    optimizationBailout: false,
  },

  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)$/,
        type: 'asset',
        generator: { filename: 'media/[name].[hash:8f][ext]' },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: './fonts/[name][ext]' },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(dirname, 'postcss.config.cjs'),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: './img/[name]_[hash][ext]',
        },
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
      },
    ],
  },
}

export default config
