import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'psszbhuartnhkzomgxmq.supabase.co' }]
  }
};

export default nextConfig;
