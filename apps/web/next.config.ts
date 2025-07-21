import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pukmjrqqelymnkzflppa.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'http', hostname: 'img1.kakaocdn.net' }
    ]
  }
  // logging: {
  //   fetches: {
  //     fullUrl: true
  //   }
  // }
};

export default nextConfig;
