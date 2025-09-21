/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },          // existing listings
      { protocol: "https", hostname: "files.patternripple.com" } // your R2 image host
    ],
  },
};
