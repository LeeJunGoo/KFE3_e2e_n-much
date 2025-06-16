'use client';

import { createClient } from '@repo/ui/utils/supabase/client/client';
import { useEffect } from 'react';

export default function Page() {
  // async function user(userId: string) {
  //   const baseUrl = "http://localhost:3000/users/api";

  //   const params = {
  //     user_id: userId,
  //   };
  //   const queryString = new URLSearchParams(params).toString();

  //   const fetchUrl = `${baseUrl}?${queryString}`;

  //   const data = await fetch(fetchUrl);
  //   const result = await data.json();
  //   console.log(result);
  // }
  // await user("8df892b0-9dec-4713-8a6f-88529c05a7e6");
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel('room');
    supabase
      .channel('room')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
        alert('user 테이블 작동');
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <p>supabase-test</p>;
}
