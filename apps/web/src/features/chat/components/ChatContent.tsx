import ChatMessageList from 'src/features/chat/components/ChatMessageList';

const ChatContent = () => {
  return (
    <div className="hide-scrollbar flex flex-1 flex-col-reverse overflow-y-auto pr-4">
      <ChatMessageList />
    </div>
  );
};

export default ChatContent;
