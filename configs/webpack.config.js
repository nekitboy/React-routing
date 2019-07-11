const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const outputDirectory = 'dist'

module.exports = {
  mode: 'development',
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
    port: 9000
  },
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
