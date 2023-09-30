/* this file is used by the Next.js server and build phases, and it's not included in the browser build. */
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true, //necessary to make it work
      }
      return config
    }
  }
  
  module.exports = nextConfig