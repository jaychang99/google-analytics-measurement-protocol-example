'use client';

import { logGaEvent } from '@/utils/logGaEvent';
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ onClick, children }: Props) => {
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> | undefined = (
    event,
  ) => {
    logGaEvent('custom_button_click', {
      button_text: typeof children === 'string' ? children : 'N/A',
    });
    onClick?.(event);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
};

export default Button;
