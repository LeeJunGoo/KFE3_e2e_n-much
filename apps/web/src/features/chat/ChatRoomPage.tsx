import ChatContent from 'src/features/chat/components/ChatContent';
import ChatMessageForm from 'src/features/chat/components/ChatMessageForm';
import ChatObject from 'src/features/chat/components/ChatObject';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const ChatRoomPage = () => {
  return (
    <>
      <DetailPageHeader>안주원제과점</DetailPageHeader>
      <ChatObject />
      <PageContainer className="pb-22 relative flex max-h-[calc(100vh-146px)] min-h-[calc(100vh-146px)] flex-col">
        <ChatContent />
        <ChatMessageForm />
      </PageContainer>
    </>
  );
};

export default ChatRoomPage;
