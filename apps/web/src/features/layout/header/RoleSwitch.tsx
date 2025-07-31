'use client';

import { useState } from 'react';

interface RoleSwitchProps {
  leftText?: string;
  rightText?: string;
  className?: string;
}

interface ButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const RoleSwitch = ({ leftText = '입찰참여자', rightText = '경매진행자', className = '' }: RoleSwitchProps) => {
  const [value, setValue] = useState(false);

  const Button = ({ text, isSelected, onClick }: ButtonProps) => (
    <button
      type="button"
      className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
        isSelected ? 'text-white' : 'text-(--color-warm-gray)'
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );

  return (
    <div className={className}>
      <div className="bg-(--color-secondary) relative inline-flex items-center rounded-full p-1 transition-all duration-200">
        <div
          className={`${
            value ? 'bg-(--color-red)' : 'bg-(--color-accent)'
          } absolute top-1 h-[calc(100%-8px)] w-[calc(50%-2px)] rounded-full transition-all duration-300 ease-in-out ${
            value ? 'translate-x-[calc(100%-4px)]' : 'translate-x-0'
          }`}
        />

        <Button text={leftText} isSelected={!value} onClick={() => setValue(false)} />
        <Button text={rightText} isSelected={value} onClick={() => setValue(true)} />
      </div>
    </div>
  );
};

export default RoleSwitch;
