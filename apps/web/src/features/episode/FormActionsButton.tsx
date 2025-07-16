import React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { twMerge } from 'tailwind-merge';

type FormActionsButtonType = {
  resetLabel: string;
  submitLabel: string;
  resetOnClick: () => void;
  className?: string;
};

const FormActionsButton = ({ resetLabel, submitLabel, resetOnClick, className }: FormActionsButtonType) => {
  return (
    <>
      <div className={twMerge(`absolute bottom-2 left-0 right-0 flex justify-end space-x-2 ${className}`)}>
        <Button variant="outline" type="button" onClick={resetOnClick} className="h-12 flex-1">
          {resetLabel}
        </Button>
        <Button variant="inActive" type="submit" className="h-12 flex-1">
          {submitLabel}
        </Button>
      </div>
    </>
  );
};

export default FormActionsButton;
