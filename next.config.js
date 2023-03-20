/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")()

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ua"],
    defaultLocale: "ua"
  },
  images: {
    domains: ['localhost']
  }
}

module.exports = removeImports({
  ...nextConfig
});
