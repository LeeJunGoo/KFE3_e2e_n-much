const ChatMessageListItem = () => {
  return (
    <>
      <li>
        <div className="flex gap-4">
          <div className="rounded-full">
            {/* <Image src="/" alt="/" width={30} height={30} className="object-cover" /> */}
            <div className="bg-(--color-warm-gray) flex size-12 items-center justify-center rounded-full">아바타</div>
          </div>
          <div className="relative">
            <p className="bg-(--color-primary) flex rounded-md p-4 text-sm text-white">
              내용이 왔어요. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet eos inventore voluptatem
              cumque sed quos fugit. Facilis nesciunt quae ea laboriosam ut, eligendi aut, adipisci quia sit eos
              explicabo iusto.
            </p>
            <div className="border-r-(--color-primary) absolute -left-2 top-3 h-0 w-0 border-b-[15px] border-r-[15px] border-t-[15px] border-b-transparent border-t-transparent"></div>
          </div>
        </div>
        <time className="text-(--color-text-base)/60 inline-block w-full pr-1 text-right text-xs">11:19 PM</time>
      </li>
      <li>
        <div className="flex gap-4">
          <div className="relative">
            <p className="bg-(--color-accent) flex rounded-md p-4 text-sm text-white">
              내용을 보내요. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet eos inventore voluptatem
              cumque sed quos fugit. Facilis nesciunt quae ea laboriosam ut, eligendi aut, adipisci quia sit eos
              explicabo iusto.
            </p>
            <div className="border-l-(--color-accent) absolute -right-2 top-3 h-0 w-0 border-b-[15px] border-l-[15px] border-t-[15px] border-b-transparent border-t-transparent"></div>
          </div>
        </div>
        <time className="text-(--color-text-base)/60 inline-block w-full pl-1 text-left text-xs">11:19 PM</time>
      </li>
    </>
  );
};

export default ChatMessageListItem;
