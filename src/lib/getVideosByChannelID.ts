export default async (channelID: number, page: number, limit: number = 16) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/api/v1/get_channel_videos/${channelID}?page=${page}&limit=${limit}`, { cache: 'no-store' });
  
  const result = await response.json();
  return result;
};