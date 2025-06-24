import { FaGavel } from 'react-icons/fa6';
import { FaCoins } from 'react-icons/fa6';
import { HiDocumentText } from 'react-icons/hi';
import { MdInfoOutline } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa6';

const MyPage = () => {
  return (
    <div>
      <section className="w-full rounded-2xl border bg-(--color-secondary) p-5 shadow-xs">
        <div className="flex items-start justify-between">
          <div className="mb-4">
            <div className="mb-1 flex items-center gap-2">
              <h2 className="text-xl font-bold">안주원</h2>
              <span className="rounded-full border border-transparent bg-(--color-primary) px-2 py-0.5 text-xs font-semibold text-white">
                입찰 참여자
              </span>
            </div>
            <p className="text-sm text-(--color-warm-gray)">anjuwon@email.com</p>

            {/* 경매자 */}
            {/* <p className="mt-0.5 text-sm text-(--color-warm-gray)">서울특별시 서대문구</p> */}
          </div>
          <div className="relative flex size-14 shrink-0 overflow-hidden rounded-full bg-(--color-primary) text-white">
            <span className="text-lg font-medium">아바타</span>
          </div>
        </div>
        <div className="mt-4 border-t border-(--color-warm-gray)/30 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">보유 포인트</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-(--color-accent)">2,230</span>
              <span className="font-medium text-(--color-accent)">P</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-[#B8B8B8]">마지막 업데이트: 2025년 6월 25일</p>
        </div>
      </section>

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

      <section className="mt-6 w-full rounded-xl border bg-white p-4 shadow-xs">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-(--color-secondary)">
            <MdInfoOutline className="size-5 text-(--color-accent)" />
          </div>
          <h3 className="font-medium">알림</h3>
        </div>
        <p className="text-sm leading-relaxed text-(--color-warm-gray)">
          현재 참여 중인 스토리가 2건 있습니다. 종료 시간을 확인해 주세요.
        </p>
        <button className="mt-3 w-full rounded-lg bg-(--color-primary) py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-(--color-accent)">
          스토리 확인하기
        </button>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 font-medium">최근 활동</h3>
        <ul className="rounded-xl bg-white p-4 shadow-sm">
          <li className="mb-3 flex items-center justify-between border-b pb-4 last:mb-0 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-(--color-secondary)">
                <FaGavel className="size-3 text-(--color-accent)" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-medium">빈티지 카메라 경매</h4>
                <time className="text-xs text-(--color-warm-gray)">2025년 6월 23일</time>
              </div>
            </div>
            <span className="rounded-md border border-transparent bg-(--color-accent) px-2.5 py-0.5 text-xs font-semibold text-white">
              진행중
            </span>
          </li>
          <li className="mb-3 flex items-center justify-between border-b pb-4 last:mb-0 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-(--color-secondary)">
                <FaGavel className="size-3 text-(--color-accent)" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-medium">빈티지 카메라 경매</h4>
                <time className="text-xs text-(--color-warm-gray)">2025년 6월 23일</time>
              </div>
            </div>
            <span className="rounded-md border border-transparent bg-(--color-green) px-2.5 py-0.5 text-xs font-semibold text-white">
              낙찰 예정
            </span>
          </li>
          <li className="mb-3 flex items-center justify-between border-b pb-4 last:mb-0 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-(--color-secondary)">
                <FaCoins className="size-3 text-(--color-accent)" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-medium">포인트 충전</h4>
                <time className="text-xs text-(--color-warm-gray)">2025년 6월 23일</time>
              </div>
            </div>
            <span className="font-medium text-(--color-accent)">+1,000P</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default MyPage;
