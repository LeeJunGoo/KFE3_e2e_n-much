import { NextRequest } from 'next/server';
// import { addUser } from 'src/lib/supabase/query/users';
// import { CreateUserPayload } from 'src/types/mypage';

const commonHeader = {
  headers: { 'Content-Type': 'application/json' }
};

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const userId = searchParams.get('user_id');

//   try {
//     if (userId === null) {
//       const res = await getAllUsers();
//       return Response.json({ status: 'success', data: res }, commonHeader);
//     } else {
//       const res = await getUser(userId);
//       return Response.json({ status: 'success', data: res }, commonHeader);
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       return Response.json({ status: 'error', error: error.message }, commonHeader);
//     }
//   }
// }

// export async function POST(request: NextRequest) {
//   const userData: CreateUserPayload = await request.json();

//   try {
//     const res = await addUser(userData);
//     return Response.json({ status: 'success', data: res }, commonHeader);
//   } catch (error) {
//     if (error instanceof Error) {
//       return Response.json({ status: 'error', error: error.message }, commonHeader);
//     }
//   }
// }
