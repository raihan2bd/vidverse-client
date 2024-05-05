

import axios from "axios";

const getAllSavedVideos = async (token: string, page: number, limit: number = 12) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await axios.get(`${API_URL}/api/v1/watch_later?page=${page}&limit=${limit}`, {headers: {Authorization: token}});

  return res;

};

export default getAllSavedVideos;