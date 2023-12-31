// "use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getSingleVideo from "@/lib/getSingleVideo";
import getAllChannels from "@/lib/getAllChannels";
import UploadOrEditVideoForm from "@/components/Videos/UploadOrEditVideoForm";

// import { useSearchParams, useRouter } from "next/navigation";
// import ErrorModal from "@/components/UI/ErrorModal";
// import Spinner from "@/components/UI/Spinner";
// import UploadOrEditVideoForm from "@/components/Videos/UploadOrEditVideoForm";
// import useFetchData from "@/hooks/useFetchData";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const UploadOrEditVideoPage = () => {
//   // todo: redirect if not logged in
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const videoId =
//     searchParams.get("edit") !== "" ? searchParams.get("edit") : null;

//   // if (loading) {
//   //   return (
//   //     <div className="bg-black/25 w-[100vw] overflow-hidden max-w-[100%] h-screen flex justify-center items-center">
//   //       <Spinner />
//   //     </div>
//   //   );
//   // }

//   // if (hasError) {
//   //   return (
//   //     <ErrorModal errMsg={hasError} tryAgainHandler={() => setError(null)} />
//   //   );
//   // }

//   let UploadVideoPageContent;

//   if (videoId && videoId !== "") {
//     const {
//       loading: videoLoading,
//       data: videoDetails,
//       error: videoError,
//     } = useFetchData<any>(`${API_URL}/api/v1/videos/${videoId}`);

//     if (videoLoading) {
//       UploadVideoPageContent = (
//         <div className="bg-black/25 w-[100vw] overflow-hidden max-w-[100%] h-screen flex justify-center items-center">
//           <Spinner />
//         </div>
//       );
//     } else if (videoError) {
//       UploadVideoPageContent = (
//         <ErrorModal errMsg={videoError} tryAgainHandler={() => router.back()} />
//       );
//     } else {
//       const details: VideoFromDetails = {
//         id: videoDetails.id,
//         title: videoDetails.title,
//         description: videoDetails.description,
//         thumb: videoDetails.thumbnail,
//         vid_src: videoDetails.vid_src,
//         channel_id: videoDetails.channel.id,
//       };
//       UploadVideoPageContent = <UploadOrEditVideoForm videoDetails={details} edit={true} />;
//     }
//   } else {
//     UploadVideoPageContent = <UploadOrEditVideoForm />;
//   }

//   return (
//     <div className="w-full flex justify-center p-4 bg-black/30">
//       {UploadVideoPageContent}
//     </div>
//   );
// };

// export default UploadOrEditVideoPage;

const UploadOrEditVideoPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const videoId =
    searchParams.edit !== "" && searchParams.edit
      ? searchParams.edit?.toString()
      : "";
  if (videoId && isNaN(Number(videoId))) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-200/70 w-fit mx-auto my-5">
        The video you are trying to edit is not found!{" "}
        <Link
          className="bg-violet-500 text-white hover:bg-violet-400 active:bg-violet-700 p-2"
          href="/dashboard/upload-video"
        >
          Upload a new video
        </Link>
      </div>
    );
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.token) {
    return redirect(
      `/login?callback=/dashboard/upload-video${
        videoId ? `?edit=${videoId}` : ""
      }}`
    );
  } else if (session.user.user_role !== "author") {
    if (session.user.user_role !== "admin") {
      return redirect(
        `/contact-us?req_for=author&callback=/dashboard/upload-video${
          videoId ? `?edit=${videoId}` : ""
        }`
      );
    }
  }

  let videoDetails: VideoFromDetails | null = null;
  if (Number(videoId)) {
    try {
      const data = await getSingleVideo(Number(videoId), session.token);
      console.log(data);
      videoDetails = {
        id: data.id,
        title: data.title,
        description: data.description,
        thumb: data.thumb,
        vid_src: data.vid_src,
        channel_id: data.channel.id,
      };
    } catch (err: any) {
      return (
        <div className="text-red-500 text-center p-4 bg-red-200/70 w-fit mx-auto my-5">
          {err.message} please try again later! or visit{" "}
          <Link
            className="bg-violet-500 text-white hover:bg-violet-400 active:bg-violet-700 p-2"
            href="/"
          >
            Home
          </Link>
        </div>
      );
    }
  } else {
    videoDetails = null;
  }

const customSession: CustomSession = {
  user: session.user,
  token: session.token,
  expires_at: session.expires_at,
};

  if (videoDetails) {
    return <UploadOrEditVideoForm session={customSession} videoDetails={videoDetails} edit={true} channels={null} />;
  }

  let channels: ChannelsForForm[] | null = null;
  try {
    const res = await getAllChannels(session.token);
    channels = res.channels;
  } catch (err: any) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-200/70 w-fit mx-auto my-5">
        {err.message || "Something went wrong!"} please try again later! or
        visit{" "}
        <Link
          className="bg-violet-500 text-white hover:bg-violet-400 active:bg-violet-700 p-2"
          href="/"
        >
          Home
        </Link>
      </div>
    );
  }

  if (channels) {
    return <UploadOrEditVideoForm channels={channels} session={customSession} />;
  }
};

export default UploadOrEditVideoPage;
