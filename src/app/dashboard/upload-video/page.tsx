"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ErrorModal from "@/components/UI/ErrorModal";
import Spinner from "@/components/UI/Spinner";
import UploadOrEditVideoForm from "@/components/Videos/UploadOrEditVideoForm";
import useFetchData from "@/hooks/useFetchData";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UploadOrEditVideoPage = () => {
  // todo: redirect if not logged in
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoId =
    searchParams.get("edit") !== "" ? searchParams.get("edit") : null;

  // if (loading) {
  //   return (
  //     <div className="bg-black/25 w-[100vw] overflow-hidden max-w-[100%] h-screen flex justify-center items-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  // if (hasError) {
  //   return (
  //     <ErrorModal errMsg={hasError} tryAgainHandler={() => setError(null)} />
  //   );
  // }

  let UploadVideoPageContent;

  if (videoId && videoId !== "") {
    const {
      loading: videoLoading,
      data: videoDetails,
      error: videoError,
    } = useFetchData<any>(`${API_URL}/api/v1/videos/${videoId}`);

    if (videoLoading) {
      UploadVideoPageContent = (
        <div className="bg-black/25 w-[100vw] overflow-hidden max-w-[100%] h-screen flex justify-center items-center">
          <Spinner />
        </div>
      );
    } else if (videoError) {
      UploadVideoPageContent = (
        <ErrorModal errMsg={videoError} tryAgainHandler={() => router.back()} />
      );
    } else {
      const details: VideoFromDetails = {
        id: videoDetails.id,
        title: videoDetails.title,
        description: videoDetails.description,
        thumb: videoDetails.thumbnail,
        vid_src: videoDetails.vid_src,
        channel_id: videoDetails.channel.id,
      };
      UploadVideoPageContent = <UploadOrEditVideoForm videoDetails={details} edit={true} />;
    }
  } else {
    UploadVideoPageContent = <UploadOrEditVideoForm />;
  }

  return (
    <div className="w-full flex justify-center p-4 bg-black/30">
      {UploadVideoPageContent}
    </div>
  );
};

export default UploadOrEditVideoPage;
