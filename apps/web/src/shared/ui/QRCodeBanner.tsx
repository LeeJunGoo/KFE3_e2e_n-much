/* eslint-disable unicorn/filename-case */
import Image from 'next/image';
import QRImage from 'src/assets/images/web_qr.svg';

const QRCodeBanner = () => {
  return (
    <div className="fixed bottom-1/4 left-[calc(50%+380px)]">
      <div className="flex w-[380px] gap-3">
        <Image src={QRImage} alt="QR image" className="size-25" />
        <div className="flex flex-col justify-between">
          <div className="text-[18px] font-semibold">
            <p>설치 없이</p>
            <p>알림으로 빠르게 받아보세요!</p>
          </div>
          <p className="text-(--color-warm-gray) text-sm">QR코드를 스캔해보세요</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeBanner;
