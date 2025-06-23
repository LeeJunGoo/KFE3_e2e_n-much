import { patchEpisode } from '../../../../lib/supabase/query/episodes';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const { episode_id, title, description } = await request.json();

  if (!episode_id || !title || !description) {
    return Response.json({ status: 'error', error: 'id, title, description 값이 존재하지 않습니다.' });
  }

  try {
    const res = await patchEpisode(episode_id, title, description);

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message });
    }
  }
}
