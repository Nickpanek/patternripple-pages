/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "files.patternripple.com" }
    ],
  },
  async redirects() {
    return [
      // Keep only legacy folder paths redirected to the blog
      { source: "/checker", destination: "/blog/seamless-pattern-checker", permanent: true },
      { source: "/pattern-checker", destination: "/blog/seamless-pattern-checker", permanent: true },
      { source: "/checker/", destination: "/blog/seamless-pattern-checker", permanent: true },
      { source: "/pattern-checker/", destination: "/blog/seamless-pattern-checker", permanent: true },
    ];
  },
};
