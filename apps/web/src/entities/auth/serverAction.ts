'use server';

import { createServer } from 'src/shared/supabase/client/server';

//ANCHOR - 빌드 시점에 user 정보가 필요할 경우 사용
export const getServerUser = async () => {
  const supabase = await createServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
};
