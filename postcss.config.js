module.exports = ({ env }) => ({
  plugins: [
    // require('doiuse')({
    //   onFeatureUsage: function (usageInfo) {
    //     console.log(usageInfo.message);
    //   },
    // }),
    require('postcss-flexbugs-fixes'),
    require('postcss-bem-linter'),
    env === 'production' ? require('postcss-preset-env') : false,
    env === 'production' ? require('webp-in-css/plugin') : false,
    // require('colorguard'),
    // require('postcss-reporter')({ clearReportedMessages: true }),
  ],
});
// 94 со всем
// 94 ток с презентом
// 61 с префиксом
// 49 без всего
// unused uncss purgecss
