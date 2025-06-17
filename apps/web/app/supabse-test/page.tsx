export default async function Page() {
  async function getAuction() {
    const fetchUrl = 'http://localhost:3001/auctions/api';
    const postBody = {
      user_id: '918b9a1d-9fa2-42d5-b587-b934d987fdd7',
      title: 'testTitle4',
      description: 'testDescription4',
      address: 'testAddress4',
      starting_point: 0,
      current_point: 1,
      max_point: 2,
      status: 'OPEN',
      image_urls: ['a', 'b', 'c'],
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString()
    };
    const data = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    });
    const result = await data.json();
    console.log(result);
  }
  await getAuction();

  return <p>supabase-test</p>;
}
