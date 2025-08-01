import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vidding',
    short_name: 'Vidding',
    description: '모두 다같이 가치를 증명해 볼까요',
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
