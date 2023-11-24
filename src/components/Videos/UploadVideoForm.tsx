"use client";

import React, { useState } from "react";
import useInput from "@/hooks/useInput";
import { validateInput } from "@/utils/validator";

const UploadVideoFrom = () => {
  const {
    value: title,
    errorMsg: titleError,
    isTouched: titleIsTouched,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
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
  } = useInput((value) =>
    validateInput(value, { inputType: "string", minLength: 6, maxLength: 255 })
  );

  // state for channel 
  const {
    value: channel,
    errorMsg: channelError,
    isTouched: channelIsTouched,
    valueChangeHandler: channelChangeHandler,
    inputBlurHandler: channelBlurHandler,
    reset: resetChannel,
  } = useInput((value) =>
    validateInput(value, { inputType: "string", minLength: 6, maxLength: 255 })
  );

  return (
    <div>
      <h1>Upload Video</h1>
    </div>
  );
};
