'use client';
import { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const SCROLL_THRESHOLD = 200;

const GoTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY >= SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const onClickToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="bottom-15 fixed left-0 right-2 z-50">
      <div className="relative m-auto max-w-2xl">
        <button
          onClick={onClickToTop}
          aria-label="최상단으로 이동"
          className="absolute bottom-5 right-2 z-[999] overflow-hidden transition-opacity hover:opacity-80"
        >
          <IoIosArrowUp className="bg-(--color-accent) size-8 rounded-full p-1 text-white" />
        </button>
      </div>
    </div>
  );
};

export default GoTopButton;
