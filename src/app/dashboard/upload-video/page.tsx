"use client";

import React, { useState, useEffect, useMemo } from "react";
import useInput from "@/hooks/useInput";
import { validateImage, validateInput, validateVideo } from "@/utils/validator";
import { useSearchParams, useRouter } from "next/navigation";
import ErrorModal from "@/components/UI/ErrorModal";
import Spinner from "@/components/UI/Spinner";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";
import useFileInput from "@/hooks/useFileInput";
import defaultVideo from '../../../../public/images/video-thumbnail.png'
import defaultVideoThumb from '../../../../public/images/default-thumb.jpg'
import UploadOrEditVideoForm from "@/components/Videos/UploadOrEditVideoForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UploadOrEditVideoPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoId =
    searchParams.get("edit") !== "" ? searchParams.get("edit") : null;
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setError] = useState<string | null>(null);
  // const [formError, setFormError] = useState<string | null>(null);
  // const {
  //   value: title,
  //   errorMsg: titleError,
  //   isTouched: titleIsTouched,
  //   valueChangeHandler: titleChangeHandler,
  //   inputBlurHandler: titleBlurHandler,
  //   reset: resetTitle,
  //   setValue: setTitle,
  // } = useInput((value) =>
  //   validateInput(value, { inputType: "string", minLength: 6, maxLength: 255 })
  // );

  // const validateThumbnailInput = (value: File | null) => {
  //   const thumbnail = validateImage(value);
  //   return thumbnail.isValid ? null : thumbnail.msg || "Invalid Image!";
  // };


  // const validateVideoInput = (value: File | null) => {
  //   const isVideo = validateVideo(value);
  //   return isVideo.isValid ? null : isVideo.msg || "Invalid Video!";
  // };

  // const {
  //   value: video,
  //   errorMsg: videoError,
  //   isTouched: isVideoTouched,
  //   valueChangeHandler: videoChangeHandler,
  //   inputBlurHandler: videoBlurHandler,
  // } = useFileInput(validateVideoInput);

  // // state for thumbnail
  // const {
  //   value: thumbnail,
  //   errorMsg: thumbnailError,
  //   isTouched: isThumbnailTouched,
  //   valueChangeHandler: thumbnailChangeHandler,
  //   inputBlurHandler: thumbnailBlurHandler,
  // } = useFileInput(validateThumbnailInput);

  // // state for description
  // const {
  //   value: description,
  //   errorMsg: descriptionError,
  //   isTouched: descriptionIsTouched,
  //   valueChangeHandler: descriptionChangeHandler,
  //   inputBlurHandler: descriptionBlurHandler,
  //   reset: resetDescription,
  //   setValue: setDescription,
  // } = useInput((value) =>
  //   validateInput(value, { inputType: "string", minLength: 6, maxLength: 255 })
  // );

  // const [channels, setChannels] = useState<[]>([]);
  // const [selectedChannel, setSelectedChannel] = useState<string>("");
  // const changeChannelHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedChannel(e.target.value);
  // };
  // const [loadingChannels, setLoadingChannels] = useState<boolean>(false);
  // fetch video data if videoId is present
  // useEffect(() => {
  //   if (videoId) {
  //     const fetchVideo = async () => {
  //       try {
  //         setLoading(true);
  //         const response = await fetch(`${API_URL}/api/v1/videos/${videoId}`);
  //         const data = await response.json();
  //         if (data) {
  //           setTitle(data.title);
  //           setDescription(data.description);
  //           setSelectedChannel(data.channelId);
  //         }
  //         setLoading(false);
  //       } catch (error: any) {
  //         const status =
  //           error && error.response && error.response.status
  //             ? error.response.status
  //             : 500;
  //         switch (status) {
  //           case 401:
  //             router.push(
  //               `/login?callback=/dashboard/upload-video${
  //                 videoId && videoId !== "" ? `?edit=${videoId}` : ""
  //               }`
  //             );
  //             break;
  //           case 403:
  //             router.push(`/access-denied`);
  //           case 404:
  //             setError("Video not found");
  //             break;
  //           default:
  //             setError("Something went wrong");
  //             break;
  //         }
  //         setLoading(false);
  //       }
  //     };
  //     fetchVideo();
  //   }
  // }, [videoId]);

  // // fetch channels
  // useEffect(() => {
  //   const fetchChannels = async () => {
  //     try {
  //       setLoadingChannels(true);
  //       const response = await fetch(`${API_URL}/api/v1/channels`);
  //       const data = await response.json();
  //       if (data.channels.length <= 0) {
  //         setError("No channels found");
  //       } else {
  //         setChannels(data.channels);
  //       }
  //       setLoadingChannels(false);
  //     } catch (error: any) {
  //       const status =
  //         error && error.response && error.response.status
  //           ? error.response.status
  //           : 500;
  //       switch (status) {
  //         case 401:
  //           router.push(
  //             `/login?callback=/dashboard/upload-video${
  //               videoId && videoId !== "" ? `?edit=${videoId}` : ""
  //             }`
  //           );
  //           break;
  //         case 403:
  //           router.push(`/access-denied`);
  //         case 404:
  //           setError("Video not found");
  //           break;
  //         default:
  //           setError("Something went wrong");
  //           break;
  //       }
  //       setLoading(false);
  //     }
  //   };

  //   fetchChannels();
  // }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!titleError && !thumbnailError && !videoError) {
    //   const formData = new FormData();
    //   formData.append("title", title);
    //   formData.append("thumbnail", thumbnail as Blob);
    //   formData.append("video", video as Blob);
    //   formData.append("description", description);
    //   formData.append("channelId", selectedChannel);

    //   // if videoId is present, then update video
    // }
  };

  if (loading) {
    return (
      <div className="bg-black/25 w-[100vw] overflow-hidden max-w-[100%] h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (hasError) {
    return (
      <ErrorModal errMsg={hasError} tryAgainHandler={() => setError(null)} />
    );
  }

  // let videoPreviewContent = useMemo(() => {
  //   if (video && !videoError) {
  //     return (
  //       <video
  //         className="rounded max-h-[100%] max-w-[100%] border"
  //         src={URL.createObjectURL(video)}
  //         controls
  //       ></video>
  //     );
  //   } else {
  //     return (
  //       <img
  //         className="rounded max-h-[100%] max-w-[100%] border"
  //         src={defaultVideo.src}
  //         alt="video-placeholder"
  //       />
  //     );
  //   }
  // }, [video, videoError]);

  // const thumbnailPreviewContent = useMemo(() => {
  //   if (thumbnail && !thumbnailError) {
  //     return (
  //       <img
  //         className="rounded max-h-[100%] max-w-[100%] border mx-auto"
  //         src={URL.createObjectURL(thumbnail)}
  //         alt={title}
  //         width={150}
  //         height={150}
  //       />
  //     );
  //   } else {
  //     return (
  //       <img
  //         className="rounded max-h-[100%] max-w-[100%] border mx-auto"
  //         src={defaultVideoThumb.src}
  //         alt="video-placeholder"
  //         width={150}
  //         height={150}
  //       />
  //     );
  //   }
  // }, [thumbnail, thumbnailError]);

  return (
    <div className="w-full flex justify-center p-4 bg-black/30">
      <UploadOrEditVideoForm videoId={videoId? videoId : ''} />
    </div>
  );
};

export default UploadOrEditVideoPage;
