import { cookies } from 'next/headers';

//NOTE - 쿠키에서
export const getRedirectMessage = async () => {
  const cookieStore = await cookies();
  const reason = cookieStore.get('redirectReason');
  const message = reason?.value;
  (await cookies()).delete('reason');

  return message;
};
