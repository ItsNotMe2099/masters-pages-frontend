const { i18n } = require('./next-i18next.config')
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  reactStrictMode: false,
 swcMinify: true,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/id:profile',
          destination: '/profile/profile/:profile', // Matched parameters can be used in the destination
        },
        {
          source: '/id:profile/news',
          destination: '/profile/profile/:profile/news', // Matched parameters can be used in the destination
        },
        {
          source: '/id:profile/reviews',
          destination: '/profile/profile/:profile/reviews', // Matched parameters can be used in the destination
        },
        {
          source: '/id:profile*/recommendations',
          destination: '/profile/profile/:profile*/recommendations', // Matched parameters can be used in the destination
        },
        {
          source: '/sk:profile',
          destination: '/profile/skill/:profile', // Matched parameters can be used in the destination
        },
        {
          source: '/sk:profile/news',
          destination: '/profile/skill/:profile/news', // Matched parameters can be used in the destination
        },
        {
          source: '/sk:profile/reviews',
          destination: '/profile/skill/:profile/reviews', // Matched parameters can be used in the destination
        },
        {
          source: '/sk:profile/recommendations',
          destination: '/profile/skill/:profile/recommendations', // Matched parameters can be used in the destination
        },
      ],
    }
  }
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports


