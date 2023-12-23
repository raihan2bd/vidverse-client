export default async (id: number, token: string) => {
  console.log(token);
  const apiUrl = process.env.NEXT_API_URL;
  const response = await fetch(`${apiUrl}/api/v1/videos/${id}`, { cache: 'no-store', headers: { Authorization: token } });
  if(!response.ok) {
    if(response.status === 401) {
      // Logout the current user
    }
    if(response.status === 404) {
       throw new Error('No videos found');
    } else {
      throw new Error('Something went wrong. please try again later');
    }
  }
  const result = await response.json();
  return result;
};