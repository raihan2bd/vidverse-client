export default async (chanID: number) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/api/v1/channels/${chanID}`, { cache: 'no-store' });
  if(!response.ok) {
    if(response.status === 401) {
      // Logout the current user
    }
    if(response.status === 404) {
       throw new Error('No channels found');
    } else {
      throw new Error('Something went wrong. please try again later');
    }
  }
  const result = await response.json();
  console.log(result)
  return result.channel;
}