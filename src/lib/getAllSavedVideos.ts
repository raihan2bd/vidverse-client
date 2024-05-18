

import axios from "axios";

const getAllSavedVideos = async (token: string, page: number, limit: number = 10) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // const res = await axios.get(`${API_URL}/api/v1/watch_later?page=${page}&limit=${limit}`, {headers: {Authorization: token}});
  try {
  const res = await fetch(`${API_URL}/api/v1/watch_later?page=${page}&limit=${limit}`, {
    cache: "no-cache",
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch saved videos");
  }

  const data = await res.json();
  return data;
  } catch (err: any) {
    throw new Error(err.message);
  }

};

export default getAllSavedVideos;