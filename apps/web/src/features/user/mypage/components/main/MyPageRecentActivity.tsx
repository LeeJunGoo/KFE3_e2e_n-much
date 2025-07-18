import { twMerge } from 'tailwind-merge';

const MyPageRecentActivity = () => {
  // const recent = activities.slice(0, 5);
  return (
    <section className="mt-6">
      <h3 className="mb-3 font-medium">최근 활동</h3>
      <ul className="rounded-xl bg-white p-4 shadow-sm">
        {/* {recent.map((activity, index) => (
          <ActivityListItem key={index} activity={activity} />
        ))} */}

        <li className="border-(--color-warm-gray)/30 mb-3 flex items-center justify-between border-b pb-4 last:mb-0 last:border-b-0 last:pb-0">
          {/* <ActivityItem activity={activity} size="sm" /> */}
          <div className={twMerge('flex items-center')}>
            <div
              className={twMerge(
                'bg-(--color-secondary) flex items-center justify-center rounded-full'
                // styles.container
              )}
            >
              {/* <Icon className={twMerge('text-(--color-accent)')} /> */}아이콘
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium">타이틀</h4>
              <time className="text-(--color-warm-gray) text-xs">2025.05.05</time>
            </div>
          </div>
          <div className="text-right">
            <span className="text-(--color-accent) font-medium">1000P</span>
          </div>

          {/* <ActivityMeta activity={activity} /> */}
        </li>
      </ul>
    </section>
  );
};

export default MyPageRecentActivity;
