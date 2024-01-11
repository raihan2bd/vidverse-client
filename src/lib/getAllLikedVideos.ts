import axios from "axios";

const getAllLikedVideos = async (token: string, page: number, limit: number = 24) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await axios.get(`${API_URL}/api/v1/liked_videos?page=${page}&limit=${limit}`, {headers: {Authorization: token}});

  return res;

};

export default getAllLikedVideos;