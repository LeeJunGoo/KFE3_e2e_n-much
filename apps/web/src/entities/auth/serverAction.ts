'use server';

import { createServer } from 'src/shared/supabase/client/server';

export const getServerUser = async () => {
  const supabase = await createServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
};
