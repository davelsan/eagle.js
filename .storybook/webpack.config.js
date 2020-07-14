const path = require('path');

module.exports = async ({ config }) => {
  // Overwrite the default storybook webpack config for same tests loaders are applied serially
  config.module.rules = [

    // *.css | *.scss
    {
      test: /\.(scss|css)$/,
      include: path.resolve(__dirname, '../'),
      use: [
        {
          loader: 'vue-style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            additionalData: '$sass-env: ' + process.env.NODE_ENV + ';',
          }
        }
      ],
    },

    // *.js
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },

    // *.png | *.jpg | *.gif
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader'
    },

    // *.vue
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },

  ];

  return config;
}