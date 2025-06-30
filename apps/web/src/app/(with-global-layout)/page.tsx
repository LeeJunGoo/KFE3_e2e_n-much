import Link from 'next/link';

const IntroPage = () => {
  return (
    <>
      <h1>IntroPage 입니다.</h1>
      <Link href={'/main'} className="border text-3xl">
        메인으로 이동
      </Link>
    </>
  );
};
export default IntroPage;
