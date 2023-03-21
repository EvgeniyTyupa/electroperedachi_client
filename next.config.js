/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")()

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
}

module.exports = removeImports({
  ...nextConfig
});
