"use client";

import React, { useState, useMemo } from "react";
import { validateImage, validateInput, validateVideo } from "@/utils/validator";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";
import useFileInput from "@/hooks/useFileInput";
import defaultVideo from "../../../public/images/video-thumbnail.png";
import defaultVideoThumb from "../../../public/images/default-thumb.jpg";
import useFetchData from "@/hooks/useFetchData";
import useDynamicInput from "@/hooks/useDynamicInput";
import axios, { Axios, AxiosError } from "axios";
import { useRouter } from "next/navigation";
import ErrorModal from "../UI/ErrorModal";
import Spinner from "../UI/Spinner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ChannelData {
  channels: Array<{
    id: string;
    title: string;
  }>;
}

type PropsType = {
  videoDetails?: {
    id: number;
    title: string;
    thumb: string;
    channel_id: number;
    vid_src: string;
    description: string;
  };
  edit?: boolean;
};

const UploadOrEditVideoForm = ({
  videoDetails,
  edit=false
}: PropsType) => {
  // state to submit form
  const [pending, setPending] = useState<boolean>(false);
  const [hasError, setHasError] = useState<string | null>(null);
  const router = useRouter();

  const {
    value: title,
    errorMsg: titleError,
    isTouched: titleIsTouched,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
    setValue: setTitle,
  } = useDynamicInput((value) =>
    validateInput(value, { inputType: "string", minLength: 6, maxLength: 255 })
  , videoDetails?.title || "");

  const validateThumbnailInput = (value: File | null) => {
    const thumbnail = validateImage(value);
    return thumbnail.isValid ? null : thumbnail.msg || "Invalid Image!";
  };

  const validateVideoInput = (value: File | null) => {
    const isVideo = validateVideo(value);
    return isVideo.isValid ? null : isVideo.msg || "Invalid Video!";
  };

  const {
    value: video,
    errorMsg: videoError,
    isTouched: isVideoTouched,
    valueChangeHandler: videoChangeHandler,
    inputBlurHandler: videoBlurHandler,
  } = useFileInput(validateVideoInput);

  // state for thumbnail
  const {
    value: thumbnail,
    errorMsg: thumbnailError,
    isTouched: isThumbnailTouched,
    valueChangeHandler: thumbnailChangeHandler,
    inputBlurHandler: thumbnailBlurHandler,
  } = useFileInput(validateThumbnailInput);

  // state for description
  const {
    value: description,
    errorMsg: descriptionError,
    isTouched: descriptionIsTouched,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
    setValue: setDescription,
  } = useDynamicInput((value) =>
    validateInput(value, { inputType: "string", minLength: 6, maxLength: 255 }), videoDetails?.description || ""
  );

  const [selectedChannel, setSelectedChannel] = useState<string>(videoDetails?.channel_id.toString() || "");
  const changeChannelHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannel(e.target.value);
  };

  let formIsValid = false;
  if(edit) {
    // if any field is touched it should be valid
    formIsValid = !titleError && !descriptionError && selectedChannel !== "" && (titleIsTouched || isVideoTouched || descriptionIsTouched || isThumbnailTouched)
  } else {
    formIsValid = !titleError && !videoError && !descriptionError && !thumbnailError && selectedChannel !== "" && titleIsTouched && isVideoTouched && descriptionIsTouched && isThumbnailTouched;
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    let videoData: any = {};
    let uri = `${API_URL}/api/v1/videos`;

    if (edit && videoDetails) {
    videoData = {
      title: title as string,
      description: description as string,
      channel_id: Number(selectedChannel),
      video: video as File || null,
      thumbnail: thumbnail as File || null,
    };
    uri = `${API_URL}/api/v1/videos/${videoDetails.id}`;

    } else {
      videoData = {
        title: title as string,
        description: description as string,
        channel_id: Number(selectedChannel),
        video: video as File,
        thumbnail: thumbnail as File,
      };
    }


    try {
      setPending(true);
      const response = await axios.post(uri, videoData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

    } catch (error: any) {
      console.log(error);
      const status = error && error.response ? error.response.status : 500;
      const msg = error && error.response ? error.response.data.error : "Something went wrong";

        switch (status) {
          case 401:
           setHasError("Failed to authenticate");
           router.push("/login");
            break;
          case 403:
            setHasError("You are not authorized to access this resource");
            router.push("/access-denied");
            break;
          case 404:
            setHasError(msg);
            break;
          default:
            setHasError("Something went wrong. please try again later.");
            break;
        }
    } finally {
      setPending(false);
    }


    


  };

  // load channels
  const { loading: chanLoading, data: chanData } = useFetchData<ChannelData>(
    `${API_URL}/api/v1/channels`
  ); 


  let videoPreviewContent = useMemo(() => {
    if (video && !videoError) {
      return (
        <video
          className="rounded max-h-[100%] max-w-[100%] border"
          src={URL.createObjectURL(video)}
          controls
        ></video>
      );
    } else if(videoDetails?.vid_src) {
      return (
        <video
          className="rounded max-h-[100%] max-w-[100%] border"
          src={videoDetails?.vid_src}
          controls
        ></video>
      );
    } else {
      return (
        <img
          className="rounded max-h-[100%] max-w-[100%] border"
          src={defaultVideo.src}
          alt="video-placeholder"
        />
      );
    }
  }, [video, videoError]);

  const thumbnailPreviewContent = useMemo(() => {
    if (thumbnail && !thumbnailError) {
      return (
        <img
          className="rounded max-h-[100%] max-w-[100%] border mx-auto"
          src={URL.createObjectURL(thumbnail)}
          alt={title as string}
          width={150}
          height={150}
        />
      );
    } else if(videoDetails?.thumb) {
      return (
        <img
          className="rounded max-h-[100%] max-w-[100%] border mx-auto"
          src={videoDetails?.thumb}
          alt={title as string}
          width={150}
          height={150}
        />
      );
    } else {
      return (
        <img
          className="rounded max-h-[100%] max-w-[100%] border mx-auto"
          src={defaultVideoThumb.src}
          alt="video-placeholder"
          width={150}
          height={150}
        />
      );
    }
  }, [thumbnail, thumbnailError]);

  if(pending) {
    return (
      <div className="bg-black/25 w-[100vw] overflow-hidden max-w-[100%] h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  }

  if(hasError) {
    return (
      <ErrorModal errMsg={hasError} tryAgainHandler={() => setHasError(null) } />
    );
  }

  return (
    <form
      onSubmit={submitHandler}
      className="w-[768px] max-w-[100%] p-4 md:p-6 min-h-screen bg-white rounded-2xl flex flex-col gap-2"
    >
      <h1 className="py-1 text-2xl font-bold text-violet-700 block w-fit border-0 border-b-[3px] mx-auto border-bg-black/30">
        {videoDetails?.id ? "EDIT VIDEO" : "UPLOAD VIDEO"}
      </h1>

      <Input
        name="title"
        label="Title"
        type="text"
        value={title as string}
        placeholder="Enter your video title"
        onChange={titleChangeHandler}
        onBlur={titleBlurHandler}
        inputError={titleIsTouched ? titleError : null}
      />

      {videoPreviewContent}

      <Input
        type="file"
        name="video"
        label="Video"
        onChange={videoChangeHandler}
        onBlur={videoBlurHandler}
        inputError={isVideoTouched ? videoError : null}
        accept="video/mp4, video/ogg, video/webm, video/avi, video/mov"
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm text-black/90" htmlFor="description">
          Description:
        </label>
        <textarea
          className="border border-black/30 rounded-sm p-2 w-full h-32"
          name="description"
          id="description"
          value={description as string}
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          placeholder="Enter your Video description"
        ></textarea>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-black/90" htmlFor="channel">
          Channel:
        </label>
        <select
          name="channel"
          id="channel"
          className="border border-black/30 rounded-sm p-2 w-full"
          onChange={changeChannelHandler}
          value={selectedChannel}
        >
          {chanLoading ? (
            <option>Loading...</option>
          ) : chanData && chanData?.channels.length > 0 ? (
            chanData?.channels.map((channel: any) => {
              return (
                <option key={channel.id} value={channel.id}>
                  {channel.title}
                </option>
              );
            })
          ) : (
            <option>No channels found</option>
          )}
        </select>
      </div>

      {thumbnailPreviewContent}

      <Input
        onChange={thumbnailChangeHandler}
        onBlur={thumbnailBlurHandler}
        inputError={isThumbnailTouched ? thumbnailError : null}
        type="file"
        name="thumbnail"
        label="Thumbnail"
        accept="image/png, image/jpeg, image/jpg"
      />

      <Button disabled={!formIsValid} type="submit" btnClass="w-full py-3 mt-4">
        {pending? 'submitting...' : edit? 'Upload Video': 'Edit Video'}
      </Button>
    </form>
  );
};

export default UploadOrEditVideoForm;
