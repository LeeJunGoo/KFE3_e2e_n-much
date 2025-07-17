import { FaChevronRight } from 'react-icons/fa6';
import BaseCard from 'src/widgets/BaseCard';

const MyPageNavigation = () => {
  return (
    <nav className="mt-6">
      <ul className="space-y-3">
        {/* {role === 'BUYER' && BUYER_MENU.map((el) => <BuyerMenuListItem key={el.label} el={el} />)}
        {role === 'SELLER' && SELLER_MENU.map((el) => <SellerMenuListItem key={el.label} el={el} />)} */}

        <li>
          <div className="flex items-center">
            <BaseCard
              as="div"
              // href=
              className="hover:bg-(--color-secondary) flex w-full items-center justify-between gap-3 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="bg-(--color-secondary) flex size-10 items-center justify-center rounded-full">
                  아이콘
                </span>
                <h3 className="font-medium">라벨</h3>
              </div>
              <FaChevronRight className="text-(--color-warm-gray)" />
            </BaseCard>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <BaseCard
              as="div"
              // href=
              className="hover:bg-(--color-secondary) flex w-full items-center justify-between gap-3 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="bg-(--color-secondary) flex size-10 items-center justify-center rounded-full">
                  아이콘
                </span>
                <h3 className="font-medium">라벨</h3>
              </div>
              <FaChevronRight className="text-(--color-warm-gray)" />
            </BaseCard>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <BaseCard
              as="div"
              // href=
              className="hover:bg-(--color-secondary) flex w-full items-center justify-between gap-3 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="bg-(--color-secondary) flex size-10 items-center justify-center rounded-full">
                  아이콘
                </span>
                <h3 className="font-medium">라벨</h3>
              </div>
              <FaChevronRight className="text-(--color-warm-gray)" />
            </BaseCard>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default MyPageNavigation;
