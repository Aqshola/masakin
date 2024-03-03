/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";

const nextConfig = {
  images: {
    domains: ["img-global.cpcdn.com", "s3-us-west-2.amazonaws.com"],
  },
};

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnFrontEndNav: true,
  disable: true,
});

export default withSerwist(nextConfig);
