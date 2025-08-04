import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vidding',
    short_name: 'Vidding',
    description: '모두 다같이 가치를 증명해 볼까요',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f4f7',
    theme_color: '#5B80C2',
    id: '/',
    scope: '/',
    lang: 'ko',
    orientation: 'portrait',
    categories: ['social', 'productivity'],
    dir: 'ltr',
    icons: [
      {
        src: '/icons/vid_icon_48x48.webp',
        sizes: '48x48',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_72x72.webp',
        sizes: '72x72',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_96x96.webp',
        sizes: '96x96',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_128x128.webp',
        sizes: '128x128',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_144x144.webp',
        sizes: '144x144',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_152x152.webp',
        sizes: '152x152',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_192x192.webp',
        sizes: '192x192',
        type: 'image/webp',
        purpose: 'any'
      },
      {
        src: '/icons/vid_icon_256x256.webp',
        sizes: '256x256',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_384x384.webp',
        sizes: '384x384',
        type: 'image/webp'
      },
      {
        src: '/icons/vid_icon_512x512.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/main.png',
        sizes: '540x720',
        type: 'image/png'
      }
    ],
    shortcuts: [
      {
        name: '경매 바로가기',
        short_name: '경매',
        description: '경매 메인으로 바로 이동',
        url: '/auction',
        icons: [{ src: '/icons/auction.png', sizes: '96x96', type: 'image/png' }]
      }
    ]
    // related_applications, prefer_related_applications 등도 추가 가능
  };
}
