export const getUserAuctions = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/auctions?userId=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};

// 관심 경매와 해당 경매의 사연 갯수 가져오기 (getAuctionCardList 참고) - KSH
export const getFavoriteAuctionCardList = async ({
  order,
  pageParam,
  user
}: {
  order: string | undefined;
  pageParam: number | undefined;
  user: string | undefined;
}) => {
  if (!order && pageParam === undefined && !user) {
    throw new Error('getFaboriteAuctionCardList: order와 pageParamr과 user가 없습니다.');
  }

  if (!order) {
    throw new Error('getFaboriteAuctionCardList: order가 없습니다.');
  }

  if (pageParam === undefined) {
    throw new Error('getFaboriteAuctionCardList: pageParam이 없습니다.');
  }

  if (!user) {
    throw new Error('getFaboriteAuctionCardList: user가 없습니다.');
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/auctions/favorites?order=${order}&page=${pageParam}&user=${user}`
  );

  if (!res.ok) {
    throw new Error('관심 경매와 해당 경매의 사연 갯수 fetch 실패');
  }

  const data = await res.json();
  return data;
};

// 관심 경매 추가 - KSH
export const postFavorite = async ({
  auctionId,
  updatedFavorites
}: {
  auctionId: string;
  updatedFavorites: string[];
}) => {
  if (!auctionId) {
    throw new Error('postFavorite: auctionId가 없습니다.');
  }

  if (!updatedFavorites) {
    throw new Error('postFavorite: updatedFavorites가 없습니다.');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/favorites`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ auctionId, updatedFavorites })
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};
