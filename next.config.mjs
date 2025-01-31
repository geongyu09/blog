/** @type {import('next').NextConfig} */
const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEVELOPMENT';

const nextConfig = {
  trailingSlash: true,

  ...(isDev
    ? {}
    : {
        // 프로덕션 환경 설정
        output: 'export',
        images: {
          unoptimized: true,
        },
        basePath: '/blog',
      }),
};

export default nextConfig;
