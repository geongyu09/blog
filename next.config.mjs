/** @type {import('next').NextConfig} */
const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEVELOPMENT';

const nextConfig = isDev
  ? {}
  : {
      output: 'export',
      images: {
        unoptimized: true,
      },
      basePath: '/blog',
      trailingSlash: true,
    };

export default nextConfig;
