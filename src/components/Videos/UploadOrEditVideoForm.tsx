"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { validateImage, validateInput, validateVideo } from "@/utils/validator";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";
import useFileInput from "@/hooks/useFileInput";
import defaultVideo from "../../../public/images/video-thumbnail.png";
import defaultVideoThumb from "../../../public/images/default-thumb.jpg";
import useDynamicInput from "@/hooks/useDynamicInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/store";
import { errMsgWithStatus, successMsg } from "@/utils/responseMsg";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type PropsType = {
  videoDetails?: VideoFromDetails;
  edit?: boolean;
  channels: ChannelsForForm[] | null;
  session: CustomSession | null;
};

const UploadOrEditVideoForm = ({
  videoDetails,
  edit = false,
  channels,
  session,
}: PropsType) => {
  // state to submit form
  const {
    setSuccess,
    setError,
    setLoading,
    uiState: { error, loading },
  } = useGlobalState();
  const router = useRouter();

  const {
    value: title,
    errorMsg: titleError,
    isTouched: titleIsTouched,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
    setValue: setTitle,
  } = useDynamicInput(
    (value) =>
      validateInput(value, {
        inputType: "string",
        minLength: 6,
        maxLength: 255,
      }),
    videoDetails?.title || ""
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
  } = useDynamicInput(
    (value) =>
      validateInput(value, {
        inputType: "string",
        minLength: 6,
        maxLength: 500,
      }),
    videoDetails?.description || ""
  );

  const [selectedChannel, setSelectedChannel] = useState<string>(
    videoDetails?.channel_id.toString() || ""
  );
  const changeChannelHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedChannel(e.target.value);
    },
    []
  );

  let formIsValid = false;
  if (edit) {
    formIsValid = !titleError && !descriptionError;
    
  } else {
    formIsValid =
      !titleError &&
      !videoError &&
      !descriptionError &&
      selectedChannel !== "";
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = session?.token || null;

    // validate form
    if (!formIsValid) {
      console.log("form is not valid");
      if (edit) {
        if (video && videoError) {
          videoBlurHandler();
        } else if (thumbnail && thumbnailError) {
          thumbnailBlurHandler();
        }

        setError("Please fill all the required fields");
        titleBlurHandler();
        descriptionBlurHandler();
        return;
      }
      setError("Please fill all the required fields");
      titleBlurHandler();
      videoBlurHandler();
      descriptionBlurHandler();
      return;
    }

    if (thumbnail && thumbnailError) {
      thumbnailBlurHandler();
      return;
    }


    // set form data
    const formData = new FormData();
    let uri = `${API_URL}/api/v1/videos`;
    formData.append("title", title as string);
    formData.append("description", description as string);
    formData.append("channel_id", selectedChannel);
    formData.append("video", video as File);
    formData.append("thumb", thumbnail as File);
    if (edit) {
      formData.append("video_url", videoDetails?.vid_src as string);
      formData.append("thumbnail_url", videoDetails?.thumb as string);
      uri = `${API_URL}/api/v1/videos/${videoDetails?.id}`;
    }

    try {
      setLoading(true);
      const response = await axios.post(uri, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      
      setSuccess(successMsg(response, "Video uploaded successfully!"));
      const video_id = response.data.video_id || videoDetails?.id;
      // router.push(`/videos/${video_id}`); // redirect to video page
      console.log(response.data)

    } catch (error: any) {
      const {errMsg: msg, status} = errMsgWithStatus(error);
      switch (status) {
        case 401:
          setError("Failed to authenticate");
          router.push("/login");
          break;
        case 403:
          setError("You are not authorized to access this resource");
          router.push("/access-denied");
          break;
        case 404:
          setError(msg);
          break;
        default:
          setError("Something went wrong. please try again later.");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  // set channels
  useEffect(() => {
    if (!edit && channels && channels.length > 0) {
      setSelectedChannel(channels[0].id.toString());
    }
  }, [channels, edit]);

  let videoPreviewContent = useMemo(() => {
    if (video && !videoError) {
      return (
        <video
          className="rounded max-h-[100%] max-w-[100%] border"
          src={URL.createObjectURL(video)}
          controls
        ></video>
      );
    } else if (videoDetails?.vid_src) {
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
    } else if (videoDetails?.thumb) {
      console.log(videoDetails?.thumb);
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

  const channelsOptions = useMemo(() => {
    if (!edit) {
      return (
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
            {channels && channels.length > 0 ? (
              channels.map((channel: any) => {
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
      );
    } else {
      return "";
    }
  }, [channels, selectedChannel, edit]);

  return (
    <div className="w-full flex justify-center p-4 bg-black/30">
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
            Description: {descriptionError && descriptionIsTouched && <span className="text-red-500 ms-2">{descriptionError}</span>}
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

        {channelsOptions}

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

        <Button disabled={loading} type="submit" btnClass="w-full py-3 mt-4">
          {loading ? "submitting..." : edit ? "Edit Video" : "Upload Video"}
        </Button>
      </form>
    </div>
  );
};

export default UploadOrEditVideoForm;
