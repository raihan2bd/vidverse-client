"use client";

import React, { useState, useEffect } from "react";

type Props = {
  text: string;
  maxLen: number;
};

const ResizeText: React.FC<Props> = ({ text, maxLen }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const [fullText, setFullText] = useState(text);
  const [textToShow, setTextToShow] = useState(text.slice(0, maxLen));

  const handleToggleText = () => {
    setShowMore(!showMore);
    if (!showMore) {
      setShowMore(true);
    } else {
      setTextToShow(text.slice(0, maxLen));
    }
  };

  return (
   <>
   {text.length > maxLen ? (
    <span>
      {showMore ? fullText : textToShow + " ..."}
      <span
        className="text-gray-500 cursor-pointer ps-2"
        onClick={handleToggleText}
      >
        {showMore ? " show less" : " show more"}
      </span>
    </span>
  ) : (
    <span>{fullText}</span>
  )}
   </>
  );
};

export default ResizeText;
