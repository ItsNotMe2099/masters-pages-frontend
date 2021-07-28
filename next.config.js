const path = require('path');
module.exports = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
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
}
