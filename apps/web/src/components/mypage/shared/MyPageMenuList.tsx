import { FaGavel } from 'react-icons/fa6';
import { FaCoins } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa6';
import { HiDocumentText } from 'react-icons/hi';

const MyPageMenuList = () => {
  return (
    <section className="mt-6">
      <ul className="space-y-3">
        <li className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow-xs transition-all duration-200 hover:bg-(--color-secondary)">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-(--color-secondary)">
              <FaGavel className="text-(--color-accent)" />
            </div>
            <h3 className="font-medium">내 경매 현황</h3>
          </div>
          <FaChevronRight className="text-(--color-warm-gray)" />
        </li>
        <li className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow-xs transition-all duration-200 hover:bg-(--color-secondary)">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-(--color-secondary)">
              <FaCoins className="text-(--color-accent)" />
            </div>
            <h3 className="font-medium">포인트 사용 내역</h3>
          </div>
          <FaChevronRight className="text-(--color-warm-gray)" />
        </li>
        <li className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow-xs transition-all duration-200 hover:bg-(--color-secondary)">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-(--color-secondary)">
              <HiDocumentText className="size-5 text-(--color-accent)" />
            </div>
            <h3 className="font-medium">내가 쓴 스토리</h3>
          </div>
          <FaChevronRight className="text-(--color-warm-gray)" />
        </li>
      </ul>
    </section>
  );
};

export default MyPageMenuList;
