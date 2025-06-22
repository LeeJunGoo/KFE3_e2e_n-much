import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['api.dicebear.com', 'i.namu.wiki', 'psszbhuartnhkzomgxmq.supabase.co']
  }
};

export default nextConfig;
//FIXME - i.namu.wiki 삭제하기 (테스트용)
