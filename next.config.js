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
      // Legacy checker URLs from older links
      { source: "/checker.html", destination: "/blog/seamless-pattern-checker", permanent: true },
      { source: "/pattern-checker.html", destination: "/blog/seamless-pattern-checker", permanent: true },
      { source: "/checker", destination: "/blog/seamless-pattern-checker", permanent: true },
      { source: "/pattern-checker", destination: "/blog/seamless-pattern-checker", permanent: true },
      // If you ever had a trailing slash variant indexed
      { source: "/checker/", destination: "/blog/seamless-pattern-checker", permanent: true },
      { source: "/pattern-checker/", destination: "/blog/seamless-pattern-checker", permanent: true },
    ];
  },
};
