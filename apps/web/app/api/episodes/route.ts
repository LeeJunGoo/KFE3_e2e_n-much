import { addStory, deleteStory, getAllStories, getStory, updateStory } from '@repo/ui/utils/supabase/query/stories';
import { NextRequest } from 'next/server';

const commonHeader = {
  headers: { 'Content-Type': 'application/json' }
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const param = searchParams.get('story_id');

  try {
    if (param === null) {
      const res = await getAllStories();

      return Response.json({ status: 'success', data: res }, commonHeader);
    } else {
      const res = await getStory(param);
      return Response.json({ status: 'success', data: res }, commonHeader);
    }
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function POST(request: NextRequest) {
  const { auction_id, user_id, bid_point } = await request.json();

  try {
    const res = await addStory(auction_id, user_id, bid_point);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function PATCH(request: NextRequest) {
  const { story_id, winning_bid } = await request.json();

  try {
    const res = await updateStory(story_id, winning_bid);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function DELETE(request: NextRequest) {
  const { story_id } = await request.json();

  try {
    const res = await deleteStory(story_id);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}
