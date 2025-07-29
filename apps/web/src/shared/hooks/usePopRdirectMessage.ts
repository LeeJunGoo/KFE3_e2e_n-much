import { useEffect, useState } from 'react';
import { popToast } from 'src/shared/utils/popToast';

export const usePopMessage = (redirectMessage: string | undefined) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (redirectMessage && mounted) {
      popToast('error', '에러', redirectMessage ?? '', 'medium');
    }
  }, [redirectMessage, mounted]);
};
