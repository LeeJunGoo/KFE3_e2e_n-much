import { createClient } from '../client/client';
import { decode } from 'base64-arraybuffer';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient();

export async function uploadImage(ImageData: string) {
  const { data, error } = await supabase.storage
    .from('vidding')
    .upload(`auctions_images/${uuidv4()}.png`, decode(ImageData), {
      contentType: 'image/png'
    });

  if (error) {
    console.log(error);
    throw new Error('이미지 업로드 에러');
  }

  return data;
}
