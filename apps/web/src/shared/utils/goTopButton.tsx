'use client';
import { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

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
    <div className="fixed bottom-3 left-0 right-3 z-50">
      <div className="relative m-auto max-w-[1320px]">
        <button
          onClick={onClickToTop}
          aria-label="최상단으로 이동"
          className="absolute bottom-3 right-3 z-[999] transition-opacity hover:opacity-80 lg:bottom-14 lg:right-5"
        >
          <FaArrowCircleUp size={40} className="text-(--color-accent) rounded-full bg-white" />
        </button>
      </div>
    </div>
  );
};

export default GoTopButton;
