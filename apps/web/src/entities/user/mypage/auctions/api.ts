export const getUserAuctions = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/auctions?userId=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};
