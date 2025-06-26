import { NextResponse } from 'next/server';
import { getAllAuctionsWithEpisodeCount } from 'src/lib/supabase/query/auctions';

export async function GET() {
  try {
    const res = await getAllAuctionsWithEpisodeCount();
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: 'Server Error' + error }, { status: 500 });
  }
}
