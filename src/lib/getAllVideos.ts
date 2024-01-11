const getAllVideos = async (page: number, searchQuery: string = "", limit: number = 24) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/api/v1/videos?search=${searchQuery}&page=${page}&limit=${limit}`, { cache: 'no-store' });
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

export default getAllVideos;