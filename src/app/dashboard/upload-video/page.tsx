"use client";

import React, { useState, useEffect } from "react";
import useInput from "@/hooks/useInput";
import { validateInput } from "@/utils/validator";
import { useSearchParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_API_URL;

const UploadOrEditVideoPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const videoId = searchParams.get('edit') !== '' ? searchParams.get('edit') : null
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
  const [errorChannels, setErrorChannels] = useState<string | null>(null);

  // fetch video data if videoId is present
  useEffect(() => {
    if (videoId) {
      const fetchVideo = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_URL}/v1/api/videos/${videoId}`);
          const data = await response.json();
          if (data) {
            setTitle(data.title);
            setDescription(data.description);
            setSelectedChannel(data.channelId);
          }
          setLoading(false);
        } catch (error: any) {
          const status = error.response.status || 500;
          switch (status) {
            case 401:
              router.push(`/login?callback=/dashboard/upload-video${videoId  && videoId !== '' ? `?edit=${videoId}` : ''}`)
              break;
            case 403:
             router.push(`/access-denied`)
            case 404:
              setError("Video not found");
              break;
            default:
              setError("Something went wrong");
              break;
          }
          setLoading(false);
        }
      }
      fetchVideo();
    }
  }, [videoId])

  // fetch channels
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoadingChannels(true);
        const response = await fetch(`${API_URL}/v1/api/channels`);
        const data = await response.json();
        if (data.channels.length > 0) {
          setErrorChannels("No channels found");
        } else {
          setSelectedChannel(data.channel.id);
        }
        setLoadingChannels(false);
      } catch (error: any) {
        const status = error.response.status || 500;
          switch (status) {
            case 401:
              router.push(`/login?callback=/dashboard/upload-video${videoId  && videoId !== '' ? `?edit=${videoId}` : ''}`)
              break;
            case 403:
             router.push(`/access-denied`)
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
  }, [])

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

  return (
    <div>
      <h1>Upload Video</h1>
    </div>
  );
}

export default UploadOrEditVideoPage;
