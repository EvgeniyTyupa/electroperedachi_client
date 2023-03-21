/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")()

/** @type {import('next-sitemap').IConfig} */
const nextConfig = {
  siteUrl: process.env.HOST || "https://www.electroperedachi.com",
  generateRobotsTxt: true, 
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ua"],
    defaultLocale: "ua"
  },
  images: {
    domains: ['localhost', "89.116.236.29", "api.electroperedachi.com"]
  },
  distDir: 'build', 
}

module.exports = removeImports({
  ...nextConfig
});
