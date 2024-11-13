import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
});

export default nextConfig;
