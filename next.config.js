/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 이미지 외부 도메인 화이트리스트
    domains: ['images.unsplash.com', 'cdn.pixabay.com', 'images.pexels.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
