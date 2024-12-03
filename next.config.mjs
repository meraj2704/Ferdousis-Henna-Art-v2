// import withBundleAnalyzer from '@next/bundle-analyzer';

// const nextConfig = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// })({
//   experimental: {
//     optimizeCss: true,
//     scrollRestoration: true,
//   },
// });

// export default nextConfig;



// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
