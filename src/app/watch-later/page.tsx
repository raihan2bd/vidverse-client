"use client"

import CustomError from "@/components/UI/CustomError";
import VideoItem from "@/components/Videos/VideoItem";
import { errMsgWithStatus } from "@/utils/responseMsg";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinner from "@/components/UI/Spinner";
import axios from "axios";
import { useGlobalState } from "@/context/store";
import { useInView } from "react-intersection-observer";



const SavedVideos = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const {data: session, status} = useSession();
  const {setError} = useGlobalState();
  // const [error, setError] = useState<string | null>(null);
  const [has_next_page, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const token = session?.token;

  const router = useRouter()
  const { ref, inView } = useInView();

  const fetchSavedVideos = async (page: number = 1, limit: number = 12) => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/watch_later?page=${page}&limit=${limit}`, {headers: {Authorization: token}});
      if(page === 1) {
        setVideos(res.data.videos);
      } else {
        setVideos((prevVideos: VideoType[]) => [...prevVideos, ...res.data.videos]);
      }
      setPage(page + 1);
      setHasNextPage(res.data.has_next_page);
    } catch(err: any) {
      const {status, errMsg} = errMsgWithStatus(err);
      setHasNextPage(false);
      if (status === 401) {
        signOut();
        router.push(`/login`);
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=> {
    if(status==="loading" || !token || videos.length>0) return;
    console.log("fetching saved videos");
    if(videos.length > 0) return;
    fetchSavedVideos(1, 1);
  }, [token, status, videos, fetchSavedVideos])

  useEffect(() => {
    if (inView && has_next_page) {
      console.log("fetching more videos");
      fetchSavedVideos(page);
    }
  }, [inView, has_next_page, fetchSavedVideos, page])

  console.log(videos);
  console.log(has_next_page, page);

  if (loading) return <Spinner />
  if (videos.length === 0) {
    return <CustomError message="You have not liked any videos yet" title="No Liked Videos"/>
  }

  const videosContent = videos.map((video: VideoType) => {
    return <VideoItem key={video.id} video={video} />
  });

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-center my-3 text-slate-500">Saved Videos</h2>
      <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {videosContent}
        {has_next_page && <li ref={ref} className="w-[100%] border p-12 shadow-sm bg-white/60"><Spinner /></li>}

      </ul>
    </div>
  )
  
  
}

export default SavedVideos;