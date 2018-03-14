module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  context: __dirname+"/lib",
  entry: {
    app: ['./app.js']
  },
  output: {
    path: __dirname+'/dist',
    filename: 'app.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /(\.js|.jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      }
    ]
  }
}