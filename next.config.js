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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next',
          name: 'static/videos/[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
}

module.exports = removeImports({
  ...nextConfig
});
