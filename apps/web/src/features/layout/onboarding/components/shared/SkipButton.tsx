import { Button } from '@repo/ui/components/ui/button';

type SkipButtonProps = {
  onSkip: () => void;
};

const SkipButton = ({ onSkip }: SkipButtonProps) => {
  return (
    <div className="flex justify-end pr-6 pt-8">
      <Button variant="ghost" onClick={onSkip} className="text-(--color-warm-gray) hover:text-(--color-accent) text-sm">
        건너뛰기 &times;
      </Button>
    </div>
  );
};

export default SkipButton;
