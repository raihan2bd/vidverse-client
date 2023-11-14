"use client"

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import getAllVideos from "@/lib/getAllVideos";
import VideoItem from "./VideoItem";

import Spinner from '@/components/UI/Spinner'

const LoadMoreVideos = ({has_next_page}: {has_next_page: boolean}) => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(has_next_page);

  const { ref, inView } = useInView();

  const onLoadMore = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const nextPage = page + 1;
    const { videos, has_next_page } = await getAllVideos(nextPage);
    setVideos((prevVideos: VideoType[]) => [...prevVideos, ...videos]);
    setPage(page + 1);
    setHasNextPage(has_next_page);
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

export default LoadMoreVideos;