import path from 'node:path'
import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import CopyPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { VueLoaderPlugin } from 'vue-loader'
import { fileURLToPath } from 'node:url'

const isDevelopment = process.env.NODE_ENV !== 'production'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'source-map' : 'source-map', // inline-source-map'
  context: path.resolve(__dirname),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevelopment ? '[name].js' : '[name].[contenthash:10].js',
    chunkFilename: isDevelopment ? '[name].js' : '[name].[contenthash:10].js',
    clean: true,
  },

  entry: {
    index: path.resolve(__dirname, 'src/config/index.js'),
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
    modules: ['node_modules'],
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      watch: true,
    },
    historyApiFallback: true,
    compress: true,
    port: process.env.LOCAL_WEBPACK_PORT || 9000,
    hot: true,
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new Dotenv({ systemvars: true }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: isDevelopment,
    }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/config/index.html'),
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[chunkhash:7].css' }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist/'),
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
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     defaultVendors: {
    //       name: 'vendors',
    //       test: /node_modules/,
    //       chunks: 'all',
    //       priority: -10,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // },
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_props: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            typeofs: false,
          },
          mangle: { safari10: true },
        },
      }),
    ],
  },

  stats: {
    errors: true,
    warnings: true,
    timings: true,
    entrypoints: false, // ?
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
                config: path.resolve(__dirname, 'postcss.config.cjs'),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './img/[name]_[hash][ext]',
        },
      },
      // html
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader',
      //   options: { minimize: !isDev },
      // },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader',
      // },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     { loader: 'svg-sprite-loader', options: {} },
      //     'svg-transform-loader',
      //     'svgo-loader',
      //   ],
      // },
      // {
      // test: /\.svg$/,
      // use: [
      //   {
      //     loader: 'svg-sprite-loader',
      //   },
      // ],
      // use: [
      // { loader: 'svg-sprite-loader' },
      // 'svg-transform-loader',
      // 'svgo-loader',
      // ],
      // loader: 'svg-inline-loader',
      // },
      // svg
      // {
      //   test: /\.(?:svg)$/i,
      //   generator: {
      //     filename: './img/[name]_[hash][ext]',
      //   },
      //   use: [
      //     {
      //       loader: 'image-webpack-loader',
      //       options: { disable: isDev },
      //     },
      //   ],
      // },
      // {
      //   test: /\.svg$/,
      //   loader: 'vue-svg-loader',
      // },
      // {
      //   test: /\.(?:svg)$/i,
      //   generator: {
      //     filename: './img/[name]_[hash][ext]',
      //   },
      //   use: [
      //     {
      //       loader: 'image-webpack-loader',
      //       options: { disable: isDev },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(?:svg)$/i,
      //   generator: {
      //     filename: './img/[name]_[hash][ext]',
      //   },
      //   use: [
      //     {
      //       loader: 'image-webpack-loader',
      //       options: { disable: isDev },
      //     },
      //   ],
      // },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader',
      // },
      // img
      // {
      //   test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
      //   //   type: 'asset/resource',
      //   generator: {
      //     filename: './img/[name]_[hash][ext]',
      //   },
      //   use: [
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         disable: isDev,
      //         svgo: {},
      //         pngquant: {
      //           quality: [0.9, 1], // 0.8 85-90
      //           speed: 1, // 4
      //         },
      //         mozjpeg: {
      //           quality: 85,
      //           progressive: true,
      //         },
      //         gifsicle: {
      //           interlaced: true,
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
}

export default config
