/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['s3-us-west-2.amazonaws.com', 's3.us-west-2.amazonaws.com', 'cdn.spencer.felinae98.cn']
  },
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  }
}
