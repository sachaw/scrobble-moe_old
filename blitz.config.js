const { sessionMiddleware, unstable_simpleRolesIsAuthorized } = require("@blitzjs/server")
const withPWA = require('next-pwa')

// module.exports = withPWA({
  module.exports = {
  middleware: [
    sessionMiddleware({
      unstable_isAuthorized: unstable_simpleRolesIsAuthorized,
    }),
  ],
  env: {
    ANILIST_CLIENT_ID: process.env.ANILIST_CLIENT_ID,
    ANILIST_REDIRECT_URL: process.env.ANILIST_CLIENT_URL
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
  pwa: {
    dest: 'public'
  }
}
// )
