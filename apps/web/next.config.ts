import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'i.namu.wiki' },
      { protocol: 'https', hostname: 'psszbhuartnhkzomgxmq.supabase.co' }
    ]
  }
};

export default nextConfig;
//FIXME - i.namu.wiki 삭제하기 (테스트용)
