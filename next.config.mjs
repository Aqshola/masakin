/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";
import createNextIntlPlugin from "next-intl/plugin";

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
  additionalPrecacheEntries: ["/detail"],
  disable: true,
});
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withSerwist(nextConfig));
