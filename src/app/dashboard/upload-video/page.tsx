"use client";

import React, { useState, useEffect } from "react";
import useInput from "@/hooks/useInput";
import { validateInput } from "@/utils/validator";
import { useSearchParams, useRouter } from "next/navigation";
import ErrorModal from "@/components/UI/ErrorModal";
import Spinner from "@/components/UI/Spinner";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UploadOrEditVideoPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoId =
    searchParams.get("edit") !== "" ? searchParams.get("edit") : null;
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
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

  // state for thumbnail
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  // state for video
  const [video, setVideo] = useState<File | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

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
  // fetch video data if videoId is present
  useEffect(() => {
    if (videoId) {
      const fetchVideo = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_URL}/api/v1/videos/${videoId}`);
          const data = await response.json();
          if (data) {
            setTitle(data.title);
            setDescription(data.description);
            setSelectedChannel(data.channelId);
          }
          setLoading(false);
        } catch (error: any) {
          const status = error && error.response && error.response.status? error.response.status : 500;
          switch (status) {
            case 401:
              router.push(
                `/login?callback=/dashboard/upload-video${
                  videoId && videoId !== "" ? `?edit=${videoId}` : ""
                }`
              );
              break;
            case 403:
              router.push(`/access-denied`);
            case 404:
              setError("Video not found");
              break;
            default:
              setError("Something went wrong");
              break;
          }
          setLoading(false);
        }
      };
      fetchVideo();
    }
  }, [videoId]);

  // fetch channels
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoadingChannels(true);
        const response = await fetch(`${API_URL}/api/v1/channels`);
        const data = await response.json();
        console.log(data)
        if (data.channels.length <= 0) {
          setError("No channels found");
        } else {
          setChannels(data.channels)
        }
        setLoadingChannels(false);
      } catch (error: any) {
        const status =
          error && error.response && error.response.status
            ? error.response.status
            : 500;
        switch (status) {
          case 401:
            router.push(
              `/login?callback=/dashboard/upload-video${
                videoId && videoId !== "" ? `?edit=${videoId}` : ""
              }`
            );
            break;
          case 403:
            router.push(`/access-denied`);
          case 404:
            setError("Video not found");
            break;
          default:
            setError("Something went wrong");
            break;
        }
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titleError && !thumbnailError && !videoError) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("thumbnail", thumbnail as Blob);
      formData.append("video", video as Blob);
      formData.append("description", description);
      formData.append("channelId", selectedChannel);

      // if videoId is present, then update video
    }
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

  return (
    <div className="w-full flex justify-center p-4 bg-black/30">
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

        <Input type="file" name="video" label="Video" />

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
            {loadingChannels ? (
              <option>Loading...</option>
            ) : (
              channels.length <= 0 ? (
                <option>No channels found</option>
              ) :
              channels.map((channel: any) => (
                <option key={channel.id} value={channel.id}>
                  {channel.title}
                </option>
              ))
            )}
          </select>
        </div>

        <Input type="file" name="thumbnail" label="Thumbnail" />

        <Button type="submit" btnClass="w-full py-3 mt-4">Upload Video</Button>
      </form>
    </div>
  );
};

export default UploadOrEditVideoPage;
