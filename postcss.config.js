module.exports = ({ env }) => ({
  plugins: env === 'production' && [
    require('doiuse')({
      ignoreFiles: ['**/normalize.css', '**/node_modules/**/*.css'],
    }),
    // require('@fullhuman/postcss-purgecss')({
    //   content: ['./src/**/*.*', './node_modules/flatpickr/dist/flatpickr.css'],
    // }),
    require('postcss-flexbugs-fixes'),
    // require('postcss-bem-linter', { preset: 'bem' }),
    require('postcss-preset-env'),
    //   require('webp-in-css/plugin'),
    require('colorguard', {}),
    require('postcss-reporter')({ clearReportedMessages: true }),
  ],
})

// 1646
