"use client"

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import VideoItem from "../Videos/VideoItem";

import Spinner from '@/components/UI/Spinner'
import getAllLikedVideos from "@/lib/getAllLikedVideos";
import { useGlobalState } from "@/context/store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { errMsgWithStatus } from "@/utils/responseMsg";

type PropTypes = {
  token: string;
  has_next_page: boolean
}

const LoadMoreLikedVideos = ({token, has_next_page}: PropTypes) => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(has_next_page);
  const {setError } = useGlobalState();
  const router = useRouter()

  const { ref, inView } = useInView();

  const onLoadMore = useCallback(async () => {
    try {

      if (!token) {
        signOut();
        setError("You need to login first")
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const nextPage = page + 1;
      const res = await getAllLikedVideos(token, nextPage);
      const {videos, has_next_page} = res.data

      setVideos((prevVideos: VideoType[]) => [...prevVideos, ...videos]);
      setPage(page + 1);
      setHasNextPage(has_next_page);
    } catch(err: any) {
      const {status, errMsg} = errMsgWithStatus(err)
      switch (status) {
        case 401:
          signOut();
          setError(errMsg);
          router.push(`/login`);
          break;
        case 403:
          setError(errMsg);
          router.push("/access-denied");
          break;
        default:
          setError(errMsg);
          break;
      }

      setError(err.message || 'something went wrong');
    }
  }, [page, setError, token, router]);

  useEffect(() => {
    if (inView && hasNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, onLoadMore])

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

export default LoadMoreLikedVideos;