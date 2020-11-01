const path = require('path');

const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if(!isDev) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
};

const filename = (hash, ext) => isDev  ? `[name].${ext}` : `[name].[${hash}].${ext}`;

const cssLoader = extra => {
  const loaders = [
      {
        loader: MiniExtractPlugin.loader,
        options: {
          hmr: isDev,
          reloadAll: true
        }
      },
      'css-loader'
    ];

  if(extra) {
    loaders.push(extra);
  }

  return loaders;
}

const babelOptions = presets => {
  let opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: ["@babel/plugin-proposal-class-properties"]
  };

  if(presets) opts.presets.push(presets);

  return opts;
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }];

  if(isDev) {
    loaders.push('eslint-loader')
  }
  return loaders;
}

const plugins = () => {
  const base = [
      new HTMLWebpackPlugin({
        template: './index.html',
        minify: {
          collapseWhitespace: !isDev
        }
      }),
      new CleanWebpackPlugin(),
      new MiniExtractPlugin({
        filename: filename('contenthash','css')
      }),
      new webpack.ProvidePlugin({
        'window.Quill': 'quill'
      })
    ];

  return base;
}
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill','./index.jsx']
  },
  output: {
    filename: filename('chunkhash','js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.png', '.css'],
    alias: {
      '@libs': path.resolve(__dirname, 'libraries'),
      'src': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
    historyApiFallback: true
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      },
      {
        test: /\.css$/,
        use: cssLoader()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoader('sass-loader')
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  }
};
