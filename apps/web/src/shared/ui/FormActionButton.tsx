import { Button } from '@repo/ui/components/ui/button';
import { twMerge } from 'tailwind-merge';

type FormActionsButtonType = {
  buttonLabel: string;
  isPending: boolean;

  className?: string;
};

const FormActionButton = ({ buttonLabel, isPending, className }: FormActionsButtonType) => {
  return (
    <>
      <div className={twMerge(`absolute bottom-2 left-0 right-0 flex justify-end space-x-2 px-5 ${className}`)}>
        <Button variant="inActive" type="submit" className="h-12 flex-1" disabled={isPending}>
          {buttonLabel}
        </Button>
      </div>
    </>
  );
};

export default FormActionButton;
