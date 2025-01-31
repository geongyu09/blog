/** @type {import('next').NextConfig} */
const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION';

const nextConfig = {
  trailingSlash: true,

  ...(isProd
    ? {
        // 프로덕션 환경 설정
        output: 'export',
        images: {
          unoptimized: true,
          path: '/blog',
        },
        basePath: '/blog',
      }
    : {}),
};

export default nextConfig;
