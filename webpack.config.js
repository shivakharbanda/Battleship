const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point for your JS files
  output: {
    filename: 'bundle.js',  // Webpack output
    path: path.resolve(__dirname, 'dist'),  // Output to 'dist' folder
  },
  mode: 'development',  // Development mode
  module: {
    rules: [
      {
        test: /\.m?js$/,  // Process JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),  // Serve content from 'dist'
    },
    compress: true,
    port: 9000,
  },
};
