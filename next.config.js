/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      's3-us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com',
      'cdn.spencer.felinae98.cn',
      'avatars.githubusercontent.com',
      'avatars0.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com'
    ]
  },
  redirects: [
    {
      source: "/posts/index.xml",
      destination: "/feed",
      permanent: false
    },
    {
      source: "/feed.xml",
      destination: "/feed",
      permanent: false
    }
  ]
}
