import EpisodePage from 'src/features/episode/EpisodePage';

const page = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  //NOTE - 로그인된 유저 정보
  // const userInfo: UserInfoType = await fetchDetailPageUserInfo(user.id);

  return (
    <>
      <EpisodePage params={params} />
    </>
  );
};

export default page;
