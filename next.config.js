/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")()

/** @type {import('next-sitemap').IConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ua"],
    defaultLocale: "ua"
  },
  images: {
    domains: ['localhost', "89.116.236.29", "api.electroperedachi.com"]
  },
  distDir: 'build',
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain'
          }
        ]
      }
    ]
  }
}

module.exports = removeImports({
  ...nextConfig
});
