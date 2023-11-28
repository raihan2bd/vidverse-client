"use client";

import React, { useState, useMemo } from "react";
import useInput from "@/hooks/useInput";
import { validateImage, validateInput, validateVideo } from "@/utils/validator";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";
import useFileInput from "@/hooks/useFileInput";
import defaultVideo from "../../../public/images/video-thumbnail.png";
import defaultVideoThumb from "../../../public/images/default-thumb.jpg";
import useFetchData from "@/hooks/useFetchData";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ChannelData {
  channels: Array<{
    id: string;
    title: string;
  }>;
}

const UploadOrEditVideoForm = ({ videoId }: { videoId: string }) => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [hasError, setError] = useState<string | null>(null);
  // const [formError, setFormError] = useState<string | null>(null);

  const {
    value: title,
    errorMsg: titleError,
    isTouched: titleIsTouched,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
    setValue: setTitle,
  } = useInput((value) =>
    validateInput(value, { inputType: "string", minLength: 6, maxLength: 255 })
  );

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
  } = useInput((value) =>
    validateInput(value, { inputType: "string", minLength: 6, maxLength: 255 })
  );

  const [channels, setChannels] = useState<[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const changeChannelHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannel(e.target.value);
  };
  const [loadingChannels, setLoadingChannels] = useState<boolean>(false);

  // load channels
  const {
    loading: chanLoading,
    data: chanData,
  } = useFetchData<ChannelData>(`${API_URL}/api/v1/channels`);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("I'm working...");
  };

  let videoPreviewContent = useMemo(() => {
    if (video && !videoError) {
      return (
        <video
          className="rounded max-h-[100%] max-w-[100%] border"
          src={URL.createObjectURL(video)}
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
          alt={title}
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

  return (
    <form
      onSubmit={submitHandler}
      className="w-[768px] max-w-[100%] p-4 md:p-6 min-h-screen bg-white rounded-2xl flex flex-col gap-2"
    >
      <h1 className="py-1 text-2xl font-bold text-violet-700 block w-fit border-0 border-b-[3px] mx-auto border-bg-black/30">
        {videoId ? "EDIT VIDEO" : "UPLOAD VIDEO"}
      </h1>

      <Input
        name="title"
        label="Title"
        type="text"
        value={title}
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
          value={description}
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

      <Button type="submit" btnClass="w-full py-3 mt-4">
        Upload Video
      </Button>
    </form>
  );
};

export default UploadOrEditVideoForm;
