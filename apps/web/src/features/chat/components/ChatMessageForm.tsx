import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { RiSendPlaneFill } from 'react-icons/ri';

const ChatMessageForm = () => {
  return (
    <form className="absolute bottom-1 left-0 right-0 w-full p-5 sm:bottom-3">
      <label className="flex items-center">
        <Input type="text" placeholder="메시지를 입력해 주세요." className="mr-2 rounded-full px-5" />
        <Button variant="text" className="translate-y-0.5 p-0 !px-0">
          <RiSendPlaneFill className="size-6" />
        </Button>
      </label>
    </form>
  );
};

export default ChatMessageForm;
