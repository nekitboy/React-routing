require('dotenv').config({ path: __dirname })
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const outputDirectory = 'public'

const createStyleLoader = (useModules = false, isDev = true) => {
  const loaders = []
  const styleLoader = { loader: 'style-loader' }
  const cssLoader = { loader: 'css-loader' }
  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      config: {
        path: __dirname
      }
    }
  }
  const resolveUrlLoader = { loader: 'resolve-url-loader' }
  const sassLoader = { loader: 'sass-loader' }

  if (useModules) {
    cssLoader.options = cssLoader.options || {}
    cssLoader.options.modules = {
      localIdentName: '[name]--[local]__[hash:base64:5]'
    }
  }

  loaders.push(styleLoader)
  loaders.push(cssLoader)
  !isDev && loaders.push(postCssLoader)
  loaders.push(resolveUrlLoader)
  loaders.push(sassLoader)

  return loaders
}

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development'

  return {
    entry: {
      index: './src/index.jsx'
    },
    output: {
      path: path.resolve(process.cwd(), outputDirectory),
      filename: '[name]-bundle.js'
    },
    devServer: {
      contentBase: path.resolve(process.cwd(), outputDirectory),
      overlay: true,
      open: 'Chrome',
      port: 9000,
      public: 'localhost:9000',
      host: '0.0.0.0'
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modeules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                configFile: path.resolve(__dirname, '.babelrc')
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                cache: true,
                configFile: path.resolve(__dirname, '.eslintrc.js')
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|gif|svg|pdf|ico|ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: ''
              }
            }
          ]
        },
        {
          test: /.(sc|sa|c)ss$/,
          use: createStyleLoader(true, isDev),
          exclude: /.module.(sc|sa|c)ss&/
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CleanWebpackPlugin()
    ]
  }
}
