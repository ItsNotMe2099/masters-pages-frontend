const path = require('path');
module.exports = {
  async rewrites() {
    return [
      {
        source: '/id(.*)',
        destination: '/profile', // Matched parameters can be used in the destination
      },
      {
        source: '/sk(.*)',
        destination: '/profile', // Matched parameters can be used in the destination
      },
    ]
  },
}
