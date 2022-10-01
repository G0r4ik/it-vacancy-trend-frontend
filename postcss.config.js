module.exports = ({ env }) => ({
  plugins: env === 'production' && [
    require('doiuse')({
      browsers: ['> 0.1%', 'not ie 11', 'not OperaMini all'],
      ignore: [''],
      ignoreFiles: ['**/normalize.css', '**/node_modules/**/*.css'],
    }),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './client/**/*.*',
        './node_modules/flatpickr/dist/flatpickr.css',
      ],
    }),
    require('postcss-flexbugs-fixes'),
    require('postcss-bem-linter'),
    require('postcss-preset-env'),
    require('webp-in-css/plugin'),
    require('colorguard', {}),
    require('postcss-reporter')({ clearReportedMessages: true }),
  ],
})
