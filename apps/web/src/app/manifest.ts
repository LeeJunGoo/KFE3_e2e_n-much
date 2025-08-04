import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vidding',
    short_name: 'VID',
    description: '당신의 가치를 Vidding 하세요!',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',

    theme_color: '#000000',

    icons: [
      {
        src: '/web_app_manifest_192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/web_app_manifest_512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
