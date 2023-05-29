const Dotenv = require('dotenv-webpack')
const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

const isDevelopment = process.env.NODE_ENV !== 'production'

const config = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-cheap-source-map' : false, // inline-source-map'
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
    new Dotenv({ systemvars: true }),
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash:7].css',
    }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/config/index.html'),
      title: 'App',
    }),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist/'),
          info: { minimized: true },
          noErrorOnMissing: true,
          globOptions: { ignore: ['*.DS_Store'] },
        },
        // {
        //   from: path.resolve(__dirname, 'server/index.js'),
        //   to: path.resolve(__dirname, 'dist/server/index.js'),
        // },
      ],
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    // !isDevelopment   && new BundleAnalyzerPlugin(),
  ].filter(Boolean),

  optimization: {
    usedExports: true,
    minimize: !isDevelopment,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
        },
      },
    },

    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/config/terserOptions.js
          // https://gist.github.com/rowanoulton/44ec3424ac1e86b63316d522e1b99a16#file-webpack-config-js
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
    // noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      // video
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[hash:8f][ext]',
        },
      },

      // html
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader',
      //   options: { minimize: !isDev },
      // },

      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name][ext]',
        },
      },

      // js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },

      // css
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
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },

      // scss
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          'sass-loader',
        ],
      },

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
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './img/[name]_[hash][ext]',
        },
      },
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

module.exports = config
