export const metadata = {
  title: 'Vidding',
  description: '당신의 가치를 입찰하세요!',
  keywords: ['Vidding', 'vidding', 'VIDDING', 'Bidding', 'bidding', 'BIDDING'],
  creator: 'VID company',
  openGraph: {
    title: 'Vidding',
    description: '당신의 가치를 입찰하세요!',
    images: [
      {
        url: '/apps/web/src/assets/images/mascot_opengraph.png',
        width: 1200,
        height: 630,
        alt: 'Vidding'
      }
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false
      }
    },

    url: 'https://kfe-3-e2e-n-much-web.vercel.app/',
    siteName: 'Vidding',
    locale: 'ko_KR',
    type: 'website'
  },
  alternates: {
    canonical: 'https://kfe-3-e2e-n-much-web.vercel.app/',
    languages: {
      'en-US': 'https://kfe-3-e2e-n-much-web.vercel.app/en',
      'ko-KR': 'https://kfe-3-e2e-n-much-web.vercel.app/ko'
    }
  }
};
