import React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { twMerge } from 'tailwind-merge';

type FormActionsButtonType = {
  buttonLabel: string;
  isSubmitting: boolean;
  isValid: boolean;
  className?: string;
};

const FormActionsButton = ({ buttonLabel, isValid, isSubmitting, className }: FormActionsButtonType) => {
  return (
    <>
      <div className={twMerge(`absolute bottom-2 left-0 right-0 flex justify-end space-x-2 px-5 ${className}`)}>
        <Button variant="inActive" type="submit" className="h-12 flex-1" disabled={!isValid || isSubmitting}>
          {buttonLabel}
        </Button>
      </div>
    </>
  );
};

export default FormActionsButton;
