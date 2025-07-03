import { useEffect, useState } from 'react';
import { createClient } from 'src/lib/supabase/client/client';

const supabase = createClient();

const useSellerId = () => {
  const [sellerId, setSellerId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (error) {
        console.error('유저 정보 가져오기 실패:', error);
        return;
      }

      setSellerId(user?.id ?? null);
    };

    getUser();
  }, []);

  return sellerId;
};

export default useSellerId;
