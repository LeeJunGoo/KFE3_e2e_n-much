import { createServer } from 'src/shared/supabase/client/server';

// 채팅방 생성 또는 기존 채팅방 조회
export const upsertChatRoom = async ({
  auction_id,
  seller_id,
  buyer_id
}: {
  auction_id: string;
  seller_id: string;
  buyer_id: string;
}) => {
  const supabase = await createServer();

  // 1. 현재 사용자 확인
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('인증이 필요합니다.');
  }

  // 2. 기존 채팅방 확인
  const { data: existingRoom } = await supabase
    .from('chat_rooms')
    .select('*')
    .eq('auction_id', auction_id)
    .eq('seller_id', seller_id)
    .eq('buyer_id', buyer_id)
    .single();

  if (existingRoom) {
    return existingRoom;
  }

  // 3. 새 채팅방 생성
  const { data: newRoom, error } = await supabase
    .from('chat_rooms')
    .insert({
      auction_id,
      seller_id,
      buyer_id
    })
    .select()
    .single();

  if (error) {
    console.error('🚀 ~ upsertChatRoom ~ error:', error);
    throw new Error('채팅방 생성 중 오류가 발생했습니다.');
  }

  return newRoom;
};

// 사용자의 채팅방 목록 조회
export const selectUserChatRooms = async () => {
  const supabase = await createServer();

  // 1. 현재 사용자 확인
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('인증이 필요합니다.');
  }

  // 2. 채팅방 목록 조회
  const { data: chatRooms, error } = await supabase
    .from('chat_rooms')
    .select(
      `
      *,
      auctions (
        auction_id,
        title,
        image_urls
      ),
      seller:users!seller_id (
        id,
        nick_name,
        user_avatar
      ),
      buyer:users!buyer_id (
        id,
        nick_name,
        user_avatar
      )
    `
    )
    .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('🚀 ~ selectUserChatRooms ~ error:', error);
    throw new Error('채팅방 목록 조회 중 오류가 발생했습니다.');
  }

  return chatRooms || [];
};

export const insertMessage = async ({ chat_room_id, content }: { chat_room_id: string; content: string }) => {
  const supabase = await createServer();

  // 현재 사용자 확인
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('인증이 필요합니다.');
  }

  // 메시지 전송
  const { data: message, error } = await supabase
    .from('messages')
    .insert({
      chat_room_id,
      sender_id: user.id,
      content
    })
    .select(
      `
      *,
      sender:users!sender_id (
        id,
        nick_name,
        user_avatar
      )
    `
    )
    .single();

  if (error) {
    console.error('🚀 ~ insertMessage ~ error:', error);
    throw new Error('메시지 전송 중 오류가 발생했습니다.');
  }

  return message;
};

// 채팅방의 메시지들 조회
export const selectMessagesByChatRoomId = async (chat_room_id: string) => {
  const supabase = await createServer();

  // 현재 사용자 확인
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('인증이 필요합니다.');
  }

  // 메시지 조회
  const { data: messages, error } = await supabase
    .from('messages')
    .select(
      `
      *,
      sender:users!sender_id (
        id,
        nick_name,
        user_avatar
      )
    `
    )
    .eq('chat_room_id', chat_room_id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('🚀 ~ selectMessagesByChatRoomId ~ error:', error);
    throw new Error('메시지 조회 중 오류가 발생했습니다.');
  }

  return messages || [];
};
