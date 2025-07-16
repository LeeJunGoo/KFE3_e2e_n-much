import FirstBanner from 'src/assets/images/banner_1.webp';
import SecondBanner from 'src/assets/images/banner_2.webp';
import ThirdBanner from 'src/assets/images/banner_3.webp';

// MainBanner.tsx
export const BANNER_DATA = [
  {
    src: FirstBanner,
    alt: '잠깐! 이건 놓치면 후회해요. 마감 임박!',
    title: '잠깐!',
    subTitle: '이건 놓치면 후회해요. 마감 임박!',
    backgroundColor: 'bg-(--color-primary) md:flex-row',
    imageStyle: 'size-80 md:size-60 md:translate-y-9 translate-y-4 md:mr-5',
    textStyle: 'md:ml-5'
  },
  {
    src: SecondBanner,
    alt: '이 사연, 마음이 울컥했어요...스토리로 사연을 나누세요',
    title: '이 사연, 마음이 울컥했어요...',
    subTitle: '스토리로 사연을 입찰하세요',
    backgroundColor: 'bg-(--color-green) md:flex-row-reverse',
    imageStyle: 'size-60 md:size-50 translate-y-6 md:translate-y-7 md:ml-5 md:order-1',
    textStyle: 'md:mr-5 md:pl-10 md:order-2'
  },
  {
    src: ThirdBanner,
    alt: '이 사연의 결말이 궁금해요... 함께 보실래요?',
    title: '이 사연의 결말이 궁금해요...',
    subTitle: '함께 보실래요?',
    backgroundColor: 'bg-(--color-secondary) md:flex-row',
    imageStyle: 'size-80 md:size-60 md:translate-y-8 translate-y-3 md:mr-5',
    textStyle: 'md:ml-5'
  }
];
