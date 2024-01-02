"use client"

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import VideoItem from "../Videos/VideoItem";

import Spinner from '@/components/UI/Spinner'
import getVideosByChannelID from "@/lib/getVideosByChannelID";
import { useGlobalState } from "@/context/store";

const LoadMoreChannelVideos = ({id, has_next_page}: {has_next_page: boolean, id: number}) => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(has_next_page);
  const {setError } = useGlobalState();

  const { ref, inView } = useInView();

  const onLoadMore = async () => {
    try {

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const nextPage = page + 1;
      const { videos, has_next_page } = await getVideosByChannelID(id, nextPage);
      setVideos((prevVideos: VideoType[]) => [...prevVideos, ...videos]);
      setPage(page + 1);
      setHasNextPage(has_next_page);
    } catch(err: any) {
      setError(err.message || 'something went wrong');
    }
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      onLoadMore();
    }
  }, [inView])

  const videoContent = videos.map((video: VideoType) => {
    return <VideoItem key={video.id} video={video} />;
  });
  
  return (
    <>
    {videoContent}
    {hasNextPage && <li ref={ref} className="w-[100%] border p-12 shadow-sm bg-white/60"><Spinner /></li>}
    </>
  );
};

export default LoadMoreChannelVideos;