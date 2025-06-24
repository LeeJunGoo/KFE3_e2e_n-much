import SelectOrder from 'src/components/auctions/SelectOrder';
import AuctionCard from 'src/components/common/AuctionCard';

const data = [
  {
    auction_id: 'e8583b1b-988e-4713-b849-44f49fb3b610',
    seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2',
    title: '첫 경매 타이틀',
    description: '첫 경매 설명',
    starting_point: 0,
    current_point: 0,
    max_point: 500,
    status: 'OPEN',
    image_urls: [
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/0936617f-36f4-48f4-b6c4-e837d1c6cd62.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/156cbf81-0e50-4a5d-bcd2-666af1410b3c.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/2d23eca8-118b-42b2-a0e8-094f94e74dc8.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/5abdd146-a98c-48d1-9046-013a0836b90d.png'
    ],
    start_time: '2025-06-24T11:14:49+00:00',
    end_time: '2025-06-25T11:14:53+00:00',
    favorites: null,
    created_at: '2025-06-23T11:16:09.582441+00:00',
    updated_at: null,
    address: [],
    seller: {
      avatar: null,
      nickname: 'seller_nick',
      seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2'
    }
  },
  {
    auction_id: '5d7c686c-1d3d-41c4-8a7f-21977163a51c',
    seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2',
    title: 'aaaaaaaaaaaaaaaaaaaaaaaaaa',
    description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    starting_point: 1,
    current_point: 1,
    max_point: 12,
    status: 'OPEN',
    image_urls: [
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/ff033d82-10cd-4a31-81de-45734944b0f4.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/86939520-f7ae-4248-8103-56b0cce45357.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/cc8e7368-9b8b-42fa-8420-28834741c364.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/9a3994a1-c750-422b-86ec-9221293d5d83.png'
    ],
    start_time: '2025-06-23T20:55:59+00:00',
    end_time: '2025-06-24T21:55:59+00:00',
    favorites: null,
    created_at: '2025-06-23T12:03:40.597836+00:00',
    updated_at: null,
    address: ['서울 강남구 가로수길 5 (신사동)', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
    seller: {
      avatar: null,
      nickname: 'seller_nick',
      seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2'
    }
  },
  {
    auction_id: 'f5595f94-21af-4b50-af07-26585a210459',
    seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2',
    title: 'aaaaaaaaaaaaaaaaaaaaaaaaaa',
    description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    starting_point: 1,
    current_point: 1,
    max_point: 12,
    status: 'OPEN',
    image_urls: [
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/043ad3df-2cbc-4e99-8e16-e1961dc91524.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/e0c08d0d-ca2c-4f4e-ad18-6d62bca8b9e7.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/3714fea9-4011-46a7-b936-0f6e31d22fe0.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/47047da1-ac16-4cec-8041-8d851ba55701.png'
    ],
    start_time: '2025-06-23T20:55:59+00:00',
    end_time: '2025-06-24T21:55:59+00:00',
    favorites: null,
    created_at: '2025-06-23T12:04:26.34497+00:00',
    updated_at: null,
    address: ['서울 강남구 가로수길 5 (신사동)', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
    seller: {
      avatar: null,
      nickname: 'seller_nick',
      seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2'
    }
  },
  {
    auction_id: 'd1736396-036f-4573-ab0d-abfcdc0ea4aa',
    seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2',
    title: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    description: 'wwwwwwwwwwwwwwww',
    starting_point: 1,
    current_point: 1,
    max_point: 12,
    status: 'OPEN',
    image_urls: [
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/2101c65d-6433-4904-b17c-22729df9c466.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/3815731f-7b04-4810-872f-0a4e408df0a0.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/90d55615-4e6a-4ab4-af01-a173ca178993.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/31fb0d97-4808-413d-9f2b-073ae933cdb4.png'
    ],
    start_time: '2025-06-23T21:05:35+00:00',
    end_time: '2025-06-24T22:05:35+00:00',
    favorites: null,
    created_at: '2025-06-23T12:06:02.103949+00:00',
    updated_at: null,
    address: ['경북 안동시 강남1길 9 (정하동, 한국전력공사경북본부)', 'wwwwwwwwwwwwwwwwwwwwwwwwwwww'],
    seller: {
      avatar: null,
      nickname: 'seller_nick',
      seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2'
    }
  },
  {
    auction_id: 'f273ea6c-794d-416e-99fa-dc31a7c96dc4',
    seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2',
    title: 'dddddddddddddddddd',
    description: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    starting_point: 1,
    current_point: 1,
    max_point: 12,
    status: 'OPEN',
    image_urls: [
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/031ebe18-5a5c-4eed-82c0-23a70bce51e1.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/138c0575-51a5-4270-aa69-532831b52073.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/ef12d832-74c9-450d-bd9c-8af6a2ef79ea.png',
      'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/vidding/auctions_images/064f7f1d-1c74-490f-9045-05d6748bf294.png'
    ],
    start_time: '2025-06-23T21:06:30+00:00',
    end_time: '2025-06-24T22:06:30+00:00',
    favorites: null,
    created_at: '2025-06-23T12:06:52.797079+00:00',
    updated_at: null,
    address: ['서울 강남구 가로수길 5 (신사동)', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ'],
    seller: {
      avatar: null,
      nickname: 'seller_nick',
      seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2'
    }
  }
];

export default function Home() {
  const resultCount = 5;
  return (
    <main className="relative z-0 min-h-screen">
      <div className="mb-4 flex flex-row justify-between">
        <p>총 {resultCount}개의 경매가 있습니다.</p>
        <SelectOrder />
      </div>

      <ul className="flex flex-row flex-wrap justify-between gap-4 align-middle">
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
      </ul>
    </main>
  );
}
