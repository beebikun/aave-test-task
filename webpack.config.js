const path = require('path');

module.exports = {
  mode: 'none',
  entry: {
    app: path.join(__dirname, 'front', 'index.tsx'),
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: ['/node_modules/', '/src/'],
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig-front.json',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
};
