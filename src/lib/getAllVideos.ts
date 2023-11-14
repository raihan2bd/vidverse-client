export default async (page: number) => {
  const limit = 1;
  const response = await fetch(`http://localhost:4000/api/v1/videos?page=${page}&limit=${limit}`, { cache: 'no-store' });
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