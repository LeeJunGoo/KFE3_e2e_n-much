import ChatListItem from 'src/features/chat/components/ChatMessageListItem';

const ChatMessageList = () => {
  return (
    <ul className="flex flex-col gap-3">
      <ChatListItem />
    </ul>
  );
};

export default ChatMessageList;
