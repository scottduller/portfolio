/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'nesting-rules': true,
        },
      },
    ],
  ],
};

module.exports = config;
