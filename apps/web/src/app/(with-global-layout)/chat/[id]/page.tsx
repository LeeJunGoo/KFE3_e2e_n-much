import ChatRoomPage from 'src/features/chat/ChatRoomPage';

const ChatRoom = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <ChatRoomPage params={params} />
    </>
  );
};

export default ChatRoom;
