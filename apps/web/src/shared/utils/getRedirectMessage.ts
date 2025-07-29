import { cookies } from 'next/headers';
import { deleteCookie } from './deleteCookie';

//NOTE - 쿠키에서
export const getRedirectMessage = async () => {
  const cookieStore = await cookies();
  const reason = cookieStore.get('redirectReason');
  const message = reason?.value;
  deleteCookie('reason');
  return message;
};
